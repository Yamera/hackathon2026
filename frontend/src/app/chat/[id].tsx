import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { COLORS } from '@/constants/colors';
import { ChatMessage, NAME_KEY, formatMsgTime } from '@/lib/chat';
import {
  ensureChatSession,
  getChatErrorMessage,
  prepareConversation,
  sendMessage,
  subscribeToMessages,
} from '@/services/chatService';

const OPENING_PREVIEW_DURATION = 650;
const LOADING_BUBBLES: { id: string; mine: boolean; width: `${number}%` }[] = [
  { id: 'bubble-1', mine: false, width: '54%' },
  { id: 'bubble-2', mine: true, width: '47%' },
  { id: 'bubble-3', mine: false, width: '66%' },
];

function ChatOpeningPreview() {
  return (
    <View style={styles.loadingThread}>
      {LOADING_BUBBLES.map((bubble, index) => (
        <Animated.View
          key={bubble.id}
          entering={(bubble.mine ? SlideInRight : SlideInLeft).duration(320).delay(index * 90)}
          style={[styles.loadingBubbleRow, bubble.mine && styles.loadingBubbleRowMe]}
        >
          <View
            style={[
              styles.loadingBubble,
              bubble.mine && styles.loadingBubbleMe,
              { width: bubble.width },
            ]}
          />
        </Animated.View>
      ))}
      <Text style={styles.loadingLabel}>Ouverture de la conversation...</Text>
    </View>
  );
}

export default function ChatScreen() {
  const { id, name, image } = useLocalSearchParams<{ id: string; name: string; image?: string }>();
  const conversationId = typeof id === 'string' ? id : '';
  const participantName = typeof name === 'string' ? name : 'Chat';
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentUserId, setCurrentUserId] = useState('');
  const [text, setText] = useState('');
  const [myName, setMyName] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  const [pendingName, setPendingName] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    AsyncStorage.getItem(NAME_KEY).then((n) => { if (n) setMyName(n); });
  }, []);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;
    let previewTimeout: ReturnType<typeof setTimeout> | undefined;
    const openingStartedAt = Date.now();

    setMessages([]);
    setErrorMessage('');
    setLoading(true);

    const startChat = async () => {
      if (!conversationId) {
        setErrorMessage('Conversation introuvable.');
        setLoading(false);
        return;
      }

      try {
        const userId = await ensureChatSession();
        if (!active) return;
        setCurrentUserId(userId);

        await prepareConversation(conversationId, participantName);
        if (!active) return;

        unsubscribe = subscribeToMessages(
          conversationId,
          (nextMessages) => {
            if (!active) return;
            const remainingPreviewTime = OPENING_PREVIEW_DURATION - (Date.now() - openingStartedAt);

            if (remainingPreviewTime > 0) {
              clearTimeout(previewTimeout);
              previewTimeout = setTimeout(() => {
                if (!active) return;
                setMessages(nextMessages);
                setLoading(false);
              }, remainingPreviewTime);
              return;
            }

            setMessages(nextMessages);
            setLoading(false);
          },
          (error) => {
            if (!active) return;
            setErrorMessage(getChatErrorMessage(error));
            setLoading(false);
          },
        );
      } catch (error) {
        if (!active) return;
        setErrorMessage(getChatErrorMessage(error));
        setLoading(false);
      }
    };

    startChat();

    return () => {
      active = false;
      clearTimeout(previewTimeout);
      unsubscribe?.();
    };
  }, [conversationId, participantName]);

  const doSend = useCallback(async (nameToUse: string) => {
    if (!text.trim() || !conversationId) return;
    setSending(true);
    setErrorMessage('');
    try {
      await sendMessage(conversationId, nameToUse, text);
      setText('');
    } catch (error) {
      setErrorMessage(getChatErrorMessage(error));
    } finally {
      setSending(false);
    }
  }, [conversationId, text]);

  const handleSend = useCallback(() => {
    if (!myName) { setShowNameModal(true); return; }
    doSend(myName);
  }, [myName, doSend]);

  const handleNameConfirm = useCallback(async () => {
    const n = pendingName.trim();
    if (!n) return;
    await AsyncStorage.setItem(NAME_KEY, n);
    setMyName(n);
    setShowNameModal(false);
    doSend(n);
  }, [pendingName, doSend]);

  const renderMessage = ({ item, index }: { item: ChatMessage; index: number }) => {
    const isMe = item.senderId === currentUserId || item.senderId === '__me__';
    return (
      <Animated.View
        entering={(isMe ? SlideInRight : SlideInLeft)
          .duration(280)
          .delay(Math.min(index * 35, 175))}
        style={[styles.msgRow, isMe && styles.msgRowMe]}
      >
        {!isMe && (
          <View style={styles.senderAvatar}>
            <Text style={styles.senderAvatarText}>{item.senderName?.[0]?.toUpperCase()}</Text>
          </View>
        )}
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
          {!isMe && <Text style={styles.senderName}>{item.senderName}</Text>}
          <Text style={[styles.msgText, isMe && styles.msgTextMe]}>{item.text}</Text>
          <Text style={[styles.msgTime, isMe && styles.msgTimeMe]}>{formatMsgTime(item.createdAt)}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="chevron-left" size={28} color={COLORS.dark} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          {image ? (
            <Image source={{ uri: image }} style={styles.headerAvatarImg} />
          ) : (
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>{(name as string)?.[0]?.toUpperCase() ?? '?'}</Text>
            </View>
          )}
          <View>
            <Text style={styles.headerName}>{participantName}</Text>
            <Text style={styles.headerOnline}>● En ligne</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerAction}>
          <Feather name="more-horizontal" size={24} color={COLORS.dark} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        {errorMessage ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            loading ? (
              <ChatOpeningPreview />
            ) : (
              <Text style={styles.emptyText}>Aucun message — dis bonjour 👋</Text>
            )
          }
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Message..."
            placeholderTextColor={COLORS.gray}
            value={text}
            onChangeText={setText}
            multiline
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={loading || sending || !text.trim()}
            style={[styles.sendBtn, (!text.trim() || loading || sending) && styles.sendBtnDisabled]}
          >
            <Feather name="send" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal visible={showNameModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Ton prénom</Text>
            <Text style={styles.modalSub}>Comment veux-tu apparaître dans le chat ?</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Ex: Maya, Alex..."
              placeholderTextColor={COLORS.gray}
              value={pendingName}
              onChangeText={setPendingName}
              autoFocus
            />
            <TouchableOpacity style={styles.modalBtn} onPress={handleNameConfirm}>
              <Text style={styles.modalBtnText}>Continuer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(31,41,55,0.07)',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 4,
  },
  headerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarImg: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  headerAvatarText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 18,
  },
  headerName: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.dark,
  },
  headerOnline: {
    fontSize: 12,
    fontWeight: '600',
    color: '#20C76A',
    marginTop: 1,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesList: {
    padding: 16,
    gap: 10,
    flexGrow: 1,
  },
  msgRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 6,
  },
  msgRowMe: {
    flexDirection: 'row-reverse',
  },
  senderAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.turquoise,
    alignItems: 'center',
    justifyContent: 'center',
  },
  senderAvatarText: {
    color: COLORS.white,
    fontWeight: '900',
    fontSize: 13,
  },
  bubble: {
    maxWidth: '72%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bubbleThem: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 4,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  bubbleMe: {
    backgroundColor: COLORS.purple,
    borderBottomRightRadius: 4,
  },
  senderName: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.purple,
    marginBottom: 3,
  },
  msgText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.dark,
    lineHeight: 21,
  },
  msgTextMe: {
    color: COLORS.white,
  },
  msgTime: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.gray,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  msgTimeMe: {
    color: 'rgba(255,255,255,0.6)',
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: 15,
    marginTop: 60,
  },
  loadingThread: {
    paddingTop: 34,
    gap: 12,
  },
  loadingBubbleRow: {
    flexDirection: 'row',
  },
  loadingBubbleRowMe: {
    justifyContent: 'flex-end',
  },
  loadingBubble: {
    height: 52,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  loadingBubbleMe: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 4,
    backgroundColor: 'rgba(124,92,255,0.16)',
  },
  loadingLabel: {
    textAlign: 'center',
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },
  errorBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255,122,89,0.14)',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  errorText: {
    color: COLORS.coral,
    fontSize: 13,
    fontWeight: '700',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    padding: 12,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: 'rgba(31,41,55,0.07)',
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    borderRadius: 22,
    backgroundColor: '#F0EBEB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: COLORS.dark,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.gray,
    opacity: 0.4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    width: 300,
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.dark,
  },
  modalSub: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray,
    textAlign: 'center',
  },
  modalInput: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0EBEB',
    paddingHorizontal: 18,
    fontSize: 16,
    color: COLORS.dark,
  },
  modalBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  modalBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
  },
});
