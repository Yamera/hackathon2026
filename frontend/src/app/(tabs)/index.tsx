import React from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import { posts, stories, tabs, trending } from '@/constants/feed-data';
import { FeedPostCard } from '@/components/ui/FeedPostCard';
import { FeedTab } from '@/components/ui/FeedTab';
import { StoryAvatar } from '@/components/ui/StoryAvatar';
import { TrendingCard } from '@/components/ui/TrendingCard';

function FeedHeader() {
  return (
    <>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.brand}>ARTFLOW</Text>
          <Text style={styles.greeting}>Bonjour !</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.82}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          style={styles.notificationButton}
        >
          <Feather name="bell" size={23} color={COLORS.dark} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <View style={styles.heroCard}>
        <LinearGradient
          colors={[
            'rgba(255,255,255,0.92)',
            'rgba(255,255,255,0.68)',
          ]}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.heroTitle}>
          Découvre l'art qui{'\n'}
          <Text style={styles.purpleText}>vit près de toi</Text>
        </Text>
        <Text style={styles.heroSubtitle}>
          Artistes, scènes locales et événements sélectionnés pour ton ambiance du jour.
        </Text>
        <View style={styles.heroActions}>
          <TouchableOpacity
            activeOpacity={0.86}
            accessibilityRole="button"
            accessibilityLabel="Explorer autour de moi"
          >
            <LinearGradient
              colors={[COLORS.purple, COLORS.coral]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.exploreButton}
            >
              <Feather name="map-pin" size={17} color={COLORS.white} />
              <Text style={styles.exploreText}>Explorer autour de moi</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.82}
            accessibilityRole="button"
            accessibilityLabel="Filtrer le contenu"
            style={styles.filterButton}
          >
            <Feather name="sliders" size={19} color={COLORS.purple} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.84}
        accessibilityRole="search"
        accessibilityLabel="Rechercher des artistes ou événements"
        style={styles.searchBox}
      >
        <Feather name="search" size={20} color={COLORS.gray} />
        <Text style={styles.searchPlaceholder}>Artistes, événements, lieux...</Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}
      >
        {tabs.map((tab, index) => (
          <FeedTab key={tab} label={tab} active={index === 0} />
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>En direct maintenant</Text>
        <TouchableOpacity accessibilityRole="button" activeOpacity={0.7}>
          <Text style={styles.seeAll}>Voir tout</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesRow}
      >
        {stories.map((story) => (
          <StoryAvatar key={story.id} name={story.name} image={story.image} live={story.live} />
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <View style={styles.titleWithIcon}>
          <Ionicons name="flame" size={19} color={COLORS.coral} />
          <Text style={styles.sectionTitle}>Tendance près de toi</Text>
        </View>
        <TouchableOpacity accessibilityRole="button" activeOpacity={0.7}>
          <Text style={styles.seeAll}>Voir tout</Text>
        </TouchableOpacity>
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

      <View style={[styles.sectionHeader, styles.postsTitle]}>
        <Text style={styles.sectionTitle}>Pour toi</Text>
        <Text style={styles.freshLabel}>NOUVEAU</Text>
      </View>
    </>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream} />
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<FeedHeader />}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item }) => (
          <FeedPostCard
            artist={item.artist}
            location={item.location}
            time={item.time}
            avatar={item.avatar}
            image={item.image}
            likes={item.likes}
            comments={item.comments}
            shares={item.shares}
            caption={item.caption}
            tags={item.tags}
            accent={item.accent}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    paddingBottom: 118,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    color: COLORS.purple,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  greeting: {
    marginTop: 5,
    color: COLORS.dark,
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  notificationButton: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 3,
  },
  notificationDot: {
    position: 'absolute',
    right: 14,
    top: 13,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.coral,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  heroCard: {
    marginHorizontal: 20,
    padding: 22,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.78)',
    shadowColor: COLORS.purple,
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 28,
    elevation: 4,
  },
  heroTitle: {
    color: COLORS.dark,
    fontSize: 32,
    lineHeight: 37,
    fontWeight: '900',
    letterSpacing: -1,
  },
  purpleText: {
    color: COLORS.purple,
  },
  heroSubtitle: {
    marginTop: 10,
    color: COLORS.gray,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
    maxWidth: 355,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  exploreButton: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  exploreText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    height: 54,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 18,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(31,41,55,0.04)',
  },
  searchPlaceholder: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '600',
  },
  tabsRow: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 8,
  },
  sectionHeader: {
    marginTop: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: COLORS.dark,
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  seeAll: {
    color: COLORS.purple,
    fontSize: 13,
    fontWeight: '800',
  },
  storiesRow: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  trendingRow: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  postsTitle: {
    marginBottom: 15,
  },
  freshLabel: {
    color: COLORS.coral,
    backgroundColor: 'rgba(255,122,89,0.12)',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
});
