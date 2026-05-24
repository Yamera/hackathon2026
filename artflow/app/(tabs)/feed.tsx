import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import { posts, stories, tabs, trending } from '@/constants/feed-data';
import { FeedTab } from '@/components/ui/FeedTab';
import { StoryAvatar } from '@/components/ui/StoryAvatar';
import { TrendingCard } from '@/components/ui/TrendingCard';
import { FeedPostCard } from '@/components/ui/FeedPostCard';

export default function FeedScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Feed</Text>
            <Text style={styles.subtitle}>Découvre les artistes et événements autour de toi</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.circleButton}>
              <MaterialCommunityIcons name="bullseye" size={27} color={COLORS.coral} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleButton}>
              <Feather name="grid" size={25} color={COLORS.purple} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {tabs.map((tab, index) => (
            <FeedTab key={tab} label={tab} active={index === 0} />
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesRow}
        >
          {stories.map((story) => (
            <StoryAvatar key={story.id} name={story.name} image={story.image} live={story.live} />
          ))}
        </ScrollView>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🔥 Tendance près de chez toi</Text>
          <Text style={styles.seeAll}>Voir tout</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.trendingRow}
        >
          {trending.map((item) => (
            <TrendingCard
              key={item.id}
              name={item.name}
              subtitle={item.subtitle}
              image={item.image}
              avatar={item.avatar}
              color={item.color}
              live={item.live}
            />
          ))}
        </ScrollView>

        <View style={styles.postsWrapper}>
          {posts.map((post) => (
            <FeedPostCard
              key={post.id}
              artist={post.artist}
              location={post.location}
              time={post.time}
              avatar={post.avatar}
              image={post.image}
              likes={post.likes}
              comments={post.comments}
              shares={post.shares}
              caption={post.caption}
              tags={post.tags}
              accent={post.accent}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 43,
    fontWeight: '900',
    color: COLORS.dark,
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
    maxWidth: 260,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  circleButton: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  tabsRow: {
    paddingHorizontal: 24,
    paddingTop: 28,
    gap: 34,
  },
  storiesRow: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    gap: 18,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(31,41,55,0.08)',
  },
  sectionHeader: {
    marginTop: 22,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.dark,
  },
  seeAll: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.purple,
  },
  trendingRow: {
    paddingHorizontal: 24,
    paddingTop: 18,
    gap: 12,
  },
  postsWrapper: {
    marginTop: 22,
  },
});
