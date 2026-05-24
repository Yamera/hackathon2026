import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeIn,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { FontFamily, FontSize } from '@/constants/typography';
import { BorderRadius, Spacing } from '@/constants/theme';
import { getArtistById } from '@/data/artists';
import { MOCK_EVENTS, formatEventTime, formatDistance } from '@/data/events';
import { GradientButton } from '@/components/ui/GradientButton';
import { LiveBadge } from '@/components/ui/LiveBadge';

const { width, height } = Dimensions.get('window');
const BANNER_HEIGHT = 280;
const AVATAR_SIZE = 80;
const SCROLL_THRESHOLD = BANNER_HEIGHT - 100;

export default function ArtistProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const artist = getArtistById(id as string);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'events' | 'services'>('portfolio');
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [SCROLL_THRESHOLD - 40, SCROLL_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  }));

  const bannerScale = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scrollY.value, [-80, 0], [1.15, 1], Extrapolation.CLAMP),
      },
    ],
  }));

  if (!artist) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Artist not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>← Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const categoryColor = Colors.categoryColors[artist.category] ?? Colors.purple;
  const artistEvents = MOCK_EVENTS.filter((e) => e.artistId === artist.id);

  const handleFollow = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsFollowing((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Sticky header (appears on scroll) */}
      <Animated.View
        style={[styles.stickyHeader, { paddingTop: insets.top }, headerStyle]}
        pointerEvents="box-none"
      >
        <BlurView intensity={35} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.stickyHeaderContent} pointerEvents="auto">
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.stickyName}>{artist.name}</Text>
          <View style={{ width: 40 }} />
        </View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 90 }}
      >
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Animated.Image
            source={{ uri: artist.banner }}
            style={[styles.banner, bannerScale]}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(8,8,16,0.15)', 'rgba(8,8,16,0.6)', 'rgba(8,8,16,1)']}
            style={StyleSheet.absoluteFill}
          />

          {/* Back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.floatBackBtn, { top: insets.top + 12 }]}
          >
            <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
            <Text style={styles.floatBackIcon}>←</Text>
          </TouchableOpacity>

          {/* Live / distance badge */}
          <View style={[styles.bannerBadges, { bottom: 24 }]}>
            {artist.isLive && <LiveBadge />}
            {artist.distance != null && (
              <View style={styles.distanceBadge}>
                <Text style={styles.distanceBadgeText}>
                  {formatDistance(artist.distance * 1000)}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Profile info */}
        <View style={styles.profileSection}>
          {/* Avatar + actions */}
          <View style={styles.avatarRow}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: artist.avatar }} style={[styles.avatar, { borderColor: artist.isLive ? Colors.live : categoryColor }]} />
              {artist.isAvailable && (
                <View style={[styles.availDot, { backgroundColor: Colors.green }]} />
              )}
            </View>
            <View style={styles.actionButtons}>
              <GradientButton
                label={isFollowing ? '✓ Following' : '+ Follow'}
                onPress={handleFollow}
                size="sm"
                gradient={isFollowing ? [Colors.elevated, Colors.elevated] : Colors.gradients.purple}
                textStyle={isFollowing ? { color: Colors.textSecondary } : undefined}
              />
              <TouchableOpacity style={styles.messageBtn}>
                <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
                <Text style={styles.messageBtnText}>◇</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageBtn}>
                <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
                <Text style={styles.messageBtnText}>⋯</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Name */}
          <View style={styles.nameBlock}>
            <View style={styles.nameRow}>
              <Text style={styles.artistName}>{artist.name}</Text>
              {artist.isVerified && (
                <Text style={[styles.verified, { color: categoryColor }]}>✦</Text>
              )}
            </View>
            <Text style={styles.username}>@{artist.username}</Text>
          </View>

          {/* Category + availability */}
          <View style={styles.metaRow}>
            <View style={[styles.catBadge, { backgroundColor: `${categoryColor}20` }]}>
              <Text style={[styles.catText, { color: categoryColor }]}>{artist.subcategory}</Text>
            </View>
            {artist.isAvailable && (
              <View style={styles.availBadge}>
                <View style={[styles.availDotInline, { backgroundColor: Colors.green }]} />
                <Text style={styles.availText}>Available</Text>
              </View>
            )}
            {artist.mentorshipAvailable && (
              <View style={[styles.mentorBadge]}>
                <Text style={styles.mentorText}>◎ Mentoring</Text>
              </View>
            )}
          </View>

          {/* Bio */}
          <Text style={styles.bio}>{artist.bio}</Text>

          {/* Location */}
          <Text style={styles.location}>◎ {artist.location}</Text>

          {/* Tags */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsScroll}>
            <View style={styles.tags}>
              {artist.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={[styles.tagText, { color: categoryColor }]}>#{tag}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Stats */}
          <View style={styles.statsRow}>
            {[
              { label: 'Followers', value: artist.followers >= 1000 ? `${(artist.followers / 1000).toFixed(1)}K` : String(artist.followers) },
              { label: 'Collabs', value: String(artist.collaborations) },
              { label: 'Rating', value: `${artist.rating} ★` },
            ].map((stat) => (
              <View key={stat.label} style={styles.stat}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Book / Message CTA */}
          <View style={styles.ctaRow}>
            <GradientButton
              label="Book / Hire"
              onPress={() => {}}
              gradient={Colors.gradients.purpleBlue}
              fullWidth
              size="lg"
            />
          </View>
        </View>

        {/* Tab navigation */}
        <View style={styles.tabNav}>
          {(['portfolio', 'events', 'services'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabNavItem, activeTab === tab && styles.tabNavItemActive]}
            >
              {activeTab === tab && (
                <LinearGradient
                  colors={Colors.gradients.purple}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tabNavIndicator}
                />
              )}
              <Text style={[styles.tabNavText, activeTab === tab && styles.tabNavTextActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Portfolio */}
        {activeTab === 'portfolio' && (
          <Animated.View entering={FadeIn.duration(300)}>
            <View style={styles.portfolioSection}>
              <View style={styles.portfolioGrid}>
                {artist.portfolio.map((item, i) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.portfolioItem, i === 0 && styles.portfolioFeatured]}
                    activeOpacity={0.85}
                  >
                    <Image source={{ uri: item.thumbnail }} style={styles.portfolioImg} />
                    <LinearGradient
                      colors={['transparent', 'rgba(8,8,16,0.85)']}
                      style={[StyleSheet.absoluteFill, { borderRadius: BorderRadius.lg }]}
                    />
                    <View style={styles.portfolioOverlay}>
                      <Text style={styles.portfolioTitle} numberOfLines={1}>{item.title}</Text>
                      <View style={styles.portfolioStats}>
                        <Text style={styles.portfolioStat}>♥ {item.likes >= 1000 ? `${(item.likes / 1000).toFixed(1)}K` : item.likes}</Text>
                        <Text style={styles.portfolioStat}>◎ {item.views >= 1000 ? `${(item.views / 1000).toFixed(0)}K` : item.views}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Animated.View>
        )}

        {/* Events */}
        {activeTab === 'events' && (
          <Animated.View entering={FadeIn.duration(300)}>
            <View style={styles.eventsSection}>
              {artistEvents.length === 0 ? (
                <Text style={styles.emptyText}>No upcoming events</Text>
              ) : (
                artistEvents.map((event) => {
                  const eventColor = Colors.categoryColors[event.category] ?? Colors.purple;
                  return (
                    <TouchableOpacity key={event.id} style={styles.eventCard} activeOpacity={0.85}>
                      <View style={[styles.eventDate, { backgroundColor: `${eventColor}20` }]}>
                        <Text style={[styles.eventDateText, { color: eventColor }]}>
                          {formatEventTime(event.startTime)}
                        </Text>
                      </View>
                      <View style={styles.eventInfo}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <Text style={styles.eventVenue}>{event.venue}</Text>
                        <Text style={styles.eventMeta}>
                          {formatDistance(event.distance)} · {event.ticketPrice}
                        </Text>
                      </View>
                      <Text style={styles.eventArrow}>→</Text>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          </Animated.View>
        )}

        {/* Services */}
        {activeTab === 'services' && (
          <Animated.View entering={FadeIn.duration(300)}>
            <View style={styles.servicesSection}>
              {artist.services.map((service) => (
                <View key={service.id} style={styles.serviceCard}>
                  <LinearGradient
                    colors={[`${categoryColor}15`, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[StyleSheet.absoluteFill, { borderRadius: BorderRadius.xl }]}
                  />
                  <View style={styles.serviceHeader}>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <Text style={[styles.servicePrice, { color: categoryColor }]}>{service.priceRange}</Text>
                  </View>
                  <Text style={styles.serviceDesc}>{service.description}</Text>
                  <GradientButton
                    label="Inquire"
                    onPress={() => {}}
                    size="sm"
                    gradient={Colors.gradients.purple}
                    style={{ alignSelf: 'flex-start', marginTop: 4 }}
                  />
                </View>
              ))}

              <View style={styles.collabSection}>
                <Text style={styles.collabSectionTitle}>Open to collaborate with</Text>
                <View style={styles.collabInterests}>
                  {artist.collaborationInterests.map((c) => (
                    <View key={c} style={styles.collabChip}>
                      <Text style={styles.collabChipText}>{c}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </Animated.View>
        )}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  notFound: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  notFoundText: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.lg,
  },
  backLink: {
    color: Colors.purpleLight,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
    overflow: 'hidden',
  },
  stickyHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: Colors.textPrimary,
  },
  stickyName: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
  },
  bannerContainer: {
    height: BANNER_HEIGHT,
    overflow: 'hidden',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  floatBackBtn: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  floatBackIcon: {
    fontSize: 18,
    color: Colors.textPrimary,
  },
  bannerBadges: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  distanceBadge: {
    backgroundColor: 'rgba(8,8,16,0.7)',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
  },
  distanceBadgeText: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
  },
  profileSection: {
    paddingHorizontal: 20,
    marginTop: -48,
    gap: 12,
  },
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
  },
  availDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: Colors.bg,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingBottom: 8,
  },
  messageBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  messageBtnText: {
    color: Colors.textSecondary,
    fontSize: 18,
  },
  nameBlock: {
    gap: 3,
    marginTop: 8,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  artistName: {
    fontFamily: FontFamily.extrabold,
    fontSize: FontSize['2xl'],
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  verified: {
    fontSize: 16,
  },
  username: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    color: Colors.textTertiary,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  catBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
  },
  catText: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.sm,
  },
  availBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: `${Colors.green}15`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
  },
  availDotInline: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  availText: {
    color: Colors.greenLight,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
  },
  mentorBadge: {
    backgroundColor: `${Colors.purple}20`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.md,
  },
  mentorText: {
    color: Colors.purpleLight,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
  },
  bio: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  location: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    color: Colors.textTertiary,
  },
  tagsScroll: {
    marginHorizontal: -20,
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 20,
  },
  tag: {
    backgroundColor: Colors.elevated,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  tagText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
  },
  statsRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  statValue: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xl,
    color: Colors.textPrimary,
  },
  statLabel: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: 2,
  },
  ctaRow: {
    gap: 10,
    marginBottom: 8,
  },
  tabNav: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginTop: 8,
  },
  tabNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  tabNavItemActive: {},
  tabNavIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: 2,
    borderRadius: 1,
  },
  tabNavText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    color: Colors.textTertiary,
  },
  tabNavTextActive: {
    color: Colors.textPrimary,
    fontFamily: FontFamily.semibold,
  },
  portfolioSection: {
    padding: 16,
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  portfolioItem: {
    width: (width - 44) / 3,
    height: (width - 44) / 3,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.card,
  },
  portfolioFeatured: {
    width: (width - 44) / 3 * 2 + 6,
    height: (width - 44) / 3 * 2 + 6,
  },
  portfolioImg: {
    width: '100%',
    height: '100%',
  },
  portfolioOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  portfolioTitle: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  portfolioStats: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  portfolioStat: {
    color: Colors.textTertiary,
    fontFamily: FontFamily.regular,
    fontSize: 10,
  },
  eventsSection: {
    padding: 16,
    gap: 10,
  },
  emptyText: {
    color: Colors.textTertiary,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    textAlign: 'center',
    paddingVertical: 24,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  eventDate: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.md,
    minWidth: 70,
    alignItems: 'center',
  },
  eventDateText: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.sm,
    textAlign: 'center',
  },
  eventInfo: {
    flex: 1,
    gap: 3,
  },
  eventTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  eventVenue: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  eventMeta: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
  eventArrow: {
    color: Colors.textTertiary,
    fontSize: 18,
  },
  servicesSection: {
    padding: 16,
    gap: 12,
  },
  serviceCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    gap: 6,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },
  servicePrice: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.sm,
  },
  serviceDesc: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  collabSection: {
    gap: 10,
    paddingTop: 8,
  },
  collabSectionTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  collabInterests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  collabChip: {
    backgroundColor: Colors.elevated,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
  },
  collabChipText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
});
