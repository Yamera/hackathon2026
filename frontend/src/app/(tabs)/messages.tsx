import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '@/constants/colors';
import { contacts, conversations } from '@/constants/messages-data';
import { SearchBar } from '@/components/ui/SearchBar';
import { NAME_KEY } from '@/lib/chat';
import { createConversation, getChatErrorMessage } from '@/services/chatService';

export default function MessagesScreen() {
  const [search, setSearch] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);

  const [showNewConvModal, setShowNewConvModal] = useState(false);
  const [pendingName, setPendingName] = useState('');
  const [contactSearch, setContactSearch] = useState('');
  const [creating, setCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pendingContact, setPendingContact] = useState<{ name: string; image: string | null } | null>(null);

  const filtered = search.trim()
    ? conversations.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.message.toLowerCase().includes(search.toLowerCase()),
      )
    : conversations;

  const filteredContacts = contactSearch.trim()
    ? contacts.filter((c) => c.name.toLowerCase().includes(contactSearch.toLowerCase()))
    : contacts;

  const handleCompose = () => {
    setErrorMessage('');
    setContactSearch('');
    setShowNewConvModal(true);
  };

  const handleNameConfirm = async () => {
    const n = pendingName.trim();
    if (!n) return;
    await AsyncStorage.setItem(NAME_KEY, n);
    setShowNameModal(false);
    if (pendingContact) {
      const pc = pendingContact;
      setPendingContact(null);
      setCreating(true);
      try {
        const convId = await createConversation(n, pc.name);
        router.push({ pathname: '/chat/[id]', params: { id: convId, name: pc.name, image: pc.image ?? '' } });
      } catch (error) {
        setErrorMessage(getChatErrorMessage(error));
      } finally {
        setCreating(false);
      }
    }
  };

  const handleSelectContact = async (contact: { id: string | null; name: string; image: string | null }) => {
    setErrorMessage('');
    if (contact.id) {
      setShowNewConvModal(false);
      router.push({ pathname: '/chat/[id]', params: { id: contact.id, name: contact.name, image: contact.image ?? '' } });
      return;
    }
    if (creating) return;
    const myName = await AsyncStorage.getItem(NAME_KEY);
    if (!myName) {
      setPendingContact({ name: contact.name, image: contact.image });
      setShowNewConvModal(false);
      setShowNameModal(true);
      return;
    }
    setCreating(true);
    try {
      const convId = await createConversation(myName, contact.name);
      setShowNewConvModal(false);
      router.push({ pathname: '/chat/[id]', params: { id: convId, name: contact.name, image: contact.image ?? '' } });
    } catch (error) {
      setErrorMessage(getChatErrorMessage(error));
    } finally {
      setCreating(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.screen}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Clavardage</Text>
              <Text style={styles.subtitle}>Connecte-toi, collabore, crée</Text>
            </View>
            <TouchableOpacity activeOpacity={0.85} style={styles.composeButton} onPress={handleCompose}>
              <Feather name="edit-3" size={28} color={COLORS.purple} />
            </TouchableOpacity>
          </View>

          <SearchBar value={search} onChangeText={setSearch} />

          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <View style={styles.convList}>
            {filtered.map((conv) => (
              <TouchableOpacity
                key={conv.id}
                activeOpacity={0.88}
                onPress={() => router.push({ pathname: '/chat/[id]', params: { id: conv.id, name: conv.name, image: conv.image ?? '' } })}
              >
                <View style={[styles.convCard, conv.active && styles.convCardActive]}>
                  {conv.image ? (
                    <Image source={{ uri: conv.image }} style={styles.convAvatarImg} />
                  ) : (
                    <LinearGradient colors={[COLORS.dark, COLORS.purple]} style={styles.convAvatar}>
                      <Text style={styles.convAvatarText}>{conv.initials ?? conv.name?.[0]?.toUpperCase()}</Text>
                    </LinearGradient>
                  )}
                  {conv.online && <View style={styles.onlineDot} />}
                  <View style={styles.convContent}>
                    <View style={styles.convTopRow}>
                      <Text style={styles.convName}>{conv.name}</Text>
                      <Text style={[styles.convTime, conv.active && styles.convTimeActive]}>{conv.time}</Text>
                    </View>
                    <Text numberOfLines={1} style={styles.convLastMsg}>{conv.message}</Text>
                  </View>
                  {conv.unread ? (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{conv.unread}</Text>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

      </View>

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

      <Modal visible={showNewConvModal} transparent animationType="slide">
        <View style={styles.contactModalOverlay}>
          <View style={styles.contactModalBox}>
            <View style={styles.contactModalHeader}>
              <Text style={styles.modalTitle}>Nouveau message</Text>
              <TouchableOpacity onPress={() => setShowNewConvModal(false)}>
                <Feather name="x" size={22} color={COLORS.dark} />
              </TouchableOpacity>
            </View>
            <View style={styles.contactSearchBox}>
              <Feather name="search" size={18} color={COLORS.gray} />
              <TextInput
                style={styles.contactSearchInput}
                placeholder="Rechercher un contact..."
                placeholderTextColor={COLORS.gray}
                value={contactSearch}
                onChangeText={setContactSearch}
                autoFocus
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.contactList}>
              {filteredContacts.map((c) => (
                <TouchableOpacity
                  key={c.id ?? c.name}
                  style={styles.contactRow}
                  onPress={() => handleSelectContact(c)}
                  disabled={creating}
                >
                  {c.image ? (
                    <Image source={{ uri: c.image }} style={styles.contactAvatar} />
                  ) : (
                    <View style={[styles.contactAvatar, styles.contactAvatarFallback]}>
                      <Text style={styles.contactAvatarText}>{c.name[0]}</Text>
                    </View>
                  )}
                  <Text style={styles.contactName}>{c.name}</Text>
                  {!c.id && <Feather name="plus-circle" size={20} color={COLORS.purple} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  screen: { flex: 1, backgroundColor: 'transparent' },
  scrollContent: { paddingBottom: 120 },
  header: {
    marginTop: 20,
    paddingHorizontal: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: { fontSize: 41, fontWeight: '900', color: COLORS.dark, letterSpacing: -1 },
  subtitle: { marginTop: 10, fontSize: 19, fontWeight: '500', color: COLORS.gray },
  composeButton: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center',
    shadowColor: COLORS.dark, shadowOpacity: 0.07, shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18, elevation: 5,
  },
  storiesRow: { paddingHorizontal: 22, paddingTop: 30, paddingBottom: 28, gap: 18 },
  sectionHeader: { paddingHorizontal: 22, marginBottom: 14 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: COLORS.dark },
  errorBanner: {
    marginHorizontal: 22,
    marginTop: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(255,122,89,0.14)',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  errorText: { color: COLORS.coral, fontSize: 13, fontWeight: '700' },
  convList: { paddingHorizontal: 22, gap: 12, marginTop: 28 },
  convCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.white, borderRadius: 24,
    padding: 16, gap: 14,
    shadowColor: COLORS.dark, shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 }, shadowRadius: 16, elevation: 3,
  },
  convCardActive: { backgroundColor: 'rgba(124,92,255,0.1)' },
  convAvatarImg: { width: 58, height: 58, borderRadius: 29 },
  convAvatar: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center' },
  convAvatarText: { color: COLORS.white, fontSize: 13, fontWeight: '900', textAlign: 'center' },
  onlineDot: {
    position: 'absolute', left: 54, top: 40,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#20C76A', borderWidth: 2.5, borderColor: COLORS.white,
  },
  convContent: { flex: 1, gap: 5 },
  convTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  convName: { fontSize: 17, fontWeight: '800', color: COLORS.dark },
  convTime: { fontSize: 13, fontWeight: '600', color: COLORS.gray },
  convTimeActive: { color: COLORS.purple },
  convLastMsg: { fontSize: 14, fontWeight: '500', color: COLORS.gray },
  unreadBadge: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: COLORS.purple, alignItems: 'center', justifyContent: 'center',
  },
  unreadText: { color: COLORS.white, fontSize: 13, fontWeight: '900' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
  modalBox: { width: 310, backgroundColor: COLORS.white, borderRadius: 28, padding: 28, alignItems: 'center', gap: 12 },
  modalTitle: { fontSize: 22, fontWeight: '900', color: COLORS.dark },
  modalSub: { fontSize: 14, fontWeight: '500', color: COLORS.gray, textAlign: 'center' },
  modalInput: { width: '100%', height: 48, borderRadius: 24, backgroundColor: '#F0EBEB', paddingHorizontal: 18, fontSize: 16, color: COLORS.dark },
  modalBtn: { width: '100%', height: 52, borderRadius: 26, backgroundColor: COLORS.purple, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  modalBtnDisabled: { opacity: 0.4 },
  modalBtnText: { color: COLORS.white, fontSize: 16, fontWeight: '900' },
  cancelBtn: { paddingVertical: 4 },
  cancelText: { fontSize: 15, fontWeight: '600', color: COLORS.gray },
  contactModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  contactModalBox: {
    backgroundColor: COLORS.cream, borderTopLeftRadius: 32, borderTopRightRadius: 32,
    paddingTop: 24, paddingHorizontal: 22, paddingBottom: 40, maxHeight: '80%',
  },
  contactModalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  contactSearchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: COLORS.white, borderRadius: 22, paddingHorizontal: 16, height: 48,
    shadowColor: COLORS.dark, shadowOpacity: 0.05, shadowOffset: { width: 0, height: 4 }, shadowRadius: 10, elevation: 2,
    marginBottom: 18,
  },
  contactSearchInput: { flex: 1, fontSize: 15, color: COLORS.dark },
  contactList: { flexGrow: 0 },
  contactRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  contactAvatar: { width: 46, height: 46, borderRadius: 23 },
  contactAvatarFallback: { backgroundColor: COLORS.purple, alignItems: 'center', justifyContent: 'center' },
  contactAvatarText: { color: COLORS.white, fontWeight: '900', fontSize: 16 },
  contactName: { flex: 1, fontSize: 16, fontWeight: '700', color: COLORS.dark },
});
