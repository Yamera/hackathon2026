import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { conversations, stories } from '@/constants/messages-data';
import { ChatStory } from '@/components/ui/ChatStory';
import { ConversationCard } from '@/components/ui/ConversationCard';
import { SearchBar } from '@/components/ui/SearchBar';

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Clavardage</Text>
              <Text style={styles.subtitle}>Connecte-toi, collabore, crée</Text>
            </View>
            <TouchableOpacity activeOpacity={0.85} style={styles.composeButton}>
              <Feather name="edit-3" size={28} color={COLORS.purple} />
            </TouchableOpacity>
          </View>

          <SearchBar />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesRow}
          >
            {stories.map((story) => (
              <ChatStory
                key={story.id}
                name={story.name}
                type={story.type}
                image={story.image}
                online={story.online}
              />
            ))}
          </ScrollView>

          <View style={styles.conversationsList}>
            {conversations.map((conv) => (
              <ConversationCard
                key={conv.id}
                name={conv.name}
                message={conv.message}
                time={conv.time}
                image={conv.image}
                initials={conv.initials}
                unread={conv.unread}
                active={conv.active}
                online={conv.online}
                verified={conv.verified}
                onPress={() => router.push({ pathname: '/chat/[id]', params: { id: conv.id, name: conv.name } })}
              />
            ))}
          </View>
        </ScrollView>

        <LinearGradient
          colors={[
            'rgba(255,248,239,0)',
            'rgba(124,92,255,0.35)',
            'rgba(124,92,255,0.75)',
          ]}
          style={styles.bottomGlow}
          pointerEvents="none"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 41,
    fontWeight: '900',
    color: COLORS.dark,
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 19,
    fontWeight: '500',
    color: COLORS.gray,
  },
  composeButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 5,
  },
  storiesRow: {
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 28,
    gap: 18,
  },
  conversationsList: {
    gap: 0,
  },
  bottomGlow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 220,
  },
});
