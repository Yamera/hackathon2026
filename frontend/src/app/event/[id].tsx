import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { COLORS, Colors } from '@/constants/colors';
import { FontFamily, FontSize } from '@/constants/typography';
import { BorderRadius } from '@/constants/theme';
import { getEventById, formatEventTime, formatDistance } from '@/data/events';
import { getArtistById } from '@/data/artists';
import { GradientButton } from '@/components/ui/GradientButton';
import { LiveBadge } from '@/components/ui/LiveBadge';
import { ArtistAvatar } from '@/components/ui/ArtistAvatar';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const event = getEventById(id as string);
  const [isGoing, setIsGoing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  if (!event) {
    return (
      <View style={[styles.notFound, { paddingTop: insets.top }]}>
        <Text style={styles.notFoundText}>Event not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>← Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const artist = getArtistById(event.artistId);
  const color = Colors.categoryColors[event.category] ?? Colors.purple;
  const capacityPct = (event.attendees / event.maxAttendees) * 100;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Hero image */}
        <View style={styles.hero}>
          <Image source={{ uri: event.imageUri }} style={styles.heroImage} />
          <LinearGradient
            colors={['rgba(8,8,16,0.2)', 'rgba(8,8,16,0.85)', 'rgba(8,8,16,1)']}
            style={StyleSheet.absoluteFill}
          />
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backBtn, { top: insets.top + 12 }]}
          >
            <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>

          {event.isLive && (
            <View style={styles.liveBadge}>
              <LiveBadge />
            </View>
          )}

          <View style={styles.heroContent}>
            <View style={[styles.categoryTag, { backgroundColor: `${color}30`, borderColor: `${color}60` }]}>
              <Text style={[styles.categoryTagText, { color }]}>
                {event.category.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.heroTitle}>{event.title}</Text>
            <Text style={styles.heroVenue}>{event.venue} · {event.address}</Text>
          </View>
        </View>

        {/* Info cards row */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.infoRow}>
          {[
            { icon: '⏱', label: 'Time', value: formatEventTime(event.startTime) },
            { icon: '◎', label: 'Distance', value: formatDistance(event.distance) },
            { icon: '◈', label: 'Ticket', value: event.ticketPrice },
          ].map((info) => (
            <View key={info.label} style={styles.infoCard}>
              <Text style={styles.infoIcon}>{info.icon}</Text>
              <Text style={styles.infoValue}>{info.value}</Text>
              <Text style={styles.infoLabel}>{info.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Description */}
        <Animated.View entering={FadeInDown.delay(150).springify()} style={styles.section}>
          <Text style={styles.sectionTitle}>About this event</Text>
          <Text style={styles.description}>{event.description}</Text>
        </Animated.View>

        {/* Artist */}
        {artist && (
          <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.section}>
            <Text style={styles.sectionTitle}>Performing Artist</Text>
            <TouchableOpacity
              onPress={() => router.push(`/artist/${artist.id}` as any)}
              style={styles.artistCard}
              activeOpacity={0.85}
            >
              <ArtistAvatar
                uri={artist.avatar}
                size={52}
                isLive={artist.isLive}
                isAvailable={artist.isAvailable}
                glowColor={Colors.categoryColors[artist.category]}
              />
              <View style={styles.artistInfo}>
                <View style={styles.artistNameRow}>
                  <Text style={styles.artistName}>{artist.name}</Text>
                  {artist.isVerified && (
                    <Text style={[styles.artistVerified, { color: Colors.categoryColors[artist.category] }]}>✦</Text>
                  )}
                </View>
                <Text style={styles.artistSub}>{artist.subcategory}</Text>
                <Text style={styles.artistStats}>
                  {(artist.followers / 1000).toFixed(1)}K followers · {artist.rating} ★
                </Text>
              </View>
              <Text style={styles.artistArrow}>→</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Attendees / capacity */}
        <Animated.View entering={FadeInDown.delay(250).springify()} style={styles.section}>
          <View style={styles.capacityHeader}>
            <Text style={styles.sectionTitle}>Capacity</Text>
            <Text style={styles.capacityCount}>
              {event.attendees} / {event.maxAttendees}
            </Text>
          </View>
          <View style={styles.capacityBar}>
            <LinearGradient
              colors={[color, `${color}88`]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.capacityFill, { width: `${capacityPct}%` }]}
            />
          </View>
          <Text style={styles.capacityText}>
            {capacityPct > 80
              ? '🔥 Almost sold out'
              : capacityPct > 50
              ? 'Filling up fast'
              : 'Plenty of spots available'}
          </Text>
        </Animated.View>

        {/* Tags */}
        <View style={styles.tagsSection}>
          {event.tags.map((tag) => (
            <View key={tag} style={[styles.tag, { backgroundColor: `${color}15` }]}>
              <Text style={[styles.tagText, { color }]}>#{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
        <View style={styles.bottomBarOverlay} />
        <View style={styles.bottomBarContent}>
          <TouchableOpacity
            onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setIsSaved(p => !p); }}
            style={styles.saveBtn}
          >
            <Text style={[styles.saveBtnText, isSaved && { color: COLORS.purple }]}>
              {isSaved ? '⊟' : '⊞'}
            </Text>
          </TouchableOpacity>
          <GradientButton
            label={isGoing ? '✓ Going' : "I'm Going"}
            onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); setIsGoing(p => !p); }}
            gradient={isGoing ? [Colors.greenLight, Colors.green] as any : Colors.gradients.purple}
            size="lg"
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  notFound: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  notFoundText: { color: COLORS.gray, fontFamily: FontFamily.medium, fontSize: FontSize.lg },
  backLink: { color: COLORS.purple, fontFamily: FontFamily.medium, fontSize: FontSize.base },
  hero: { height: 340, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  backBtn: {
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
  backIcon: { fontSize: 18, color: Colors.textPrimary },
  liveBadge: { position: 'absolute', top: 16, right: 16 },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    gap: 8,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  categoryTagText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xs,
    letterSpacing: 1,
  },
  heroTitle: {
    fontFamily: FontFamily.extrabold,
    fontSize: FontSize['3xl'],
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  heroVenue: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  infoRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
  },
  infoCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: BorderRadius.xl,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(31,41,55,0.06)',
    alignItems: 'center',
    gap: 4,
  },
  infoIcon: { fontSize: 18, color: COLORS.gray },
  infoValue: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.sm,
    color: COLORS.dark,
    textAlign: 'center',
  },
  infoLabel: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: COLORS.gray,
  },
  section: { paddingHorizontal: 20, marginBottom: 20, gap: 10 },
  sectionTitle: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.lg,
    color: COLORS.dark,
  },
  description: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    color: COLORS.gray,
    lineHeight: 24,
  },
  artistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.white,
    borderRadius: BorderRadius.xl,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(31,41,55,0.06)',
  },
  artistInfo: { flex: 1, gap: 3 },
  artistNameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  artistName: { fontFamily: FontFamily.semibold, fontSize: FontSize.base, color: COLORS.dark },
  artistVerified: { fontSize: 11 },
  artistSub: { fontFamily: FontFamily.regular, fontSize: FontSize.sm, color: COLORS.gray },
  artistStats: { fontFamily: FontFamily.regular, fontSize: FontSize.xs, color: COLORS.gray },
  artistArrow: { color: COLORS.gray, fontSize: 18 },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  capacityCount: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.sm,
    color: COLORS.gray,
  },
  capacityBar: {
    height: 6,
    backgroundColor: COLORS.softGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
    borderRadius: 3,
  },
  capacityText: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    color: COLORS.gray,
  },
  tagsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
  },
  tagText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(31,41,55,0.08)',
    overflow: 'hidden',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  bottomBarOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,248,239,0.88)',
  },
  bottomBarContent: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  saveBtn: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.xl,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: 'rgba(31,41,55,0.08)',
  },
  saveBtnText: {
    fontSize: 22,
    color: COLORS.gray,
  },
});
