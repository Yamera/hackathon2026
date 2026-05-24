import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { Collaboration } from '@/types';
import { Colors } from '@/constants/colors';
import { FontFamily, FontSize } from '@/constants/typography';
import { BorderRadius } from '@/constants/theme';
import { ArtistAvatar } from '@/components/ui/ArtistAvatar';
import { formatTimeAgo } from '@/data/feed';

const COLLAB_TYPE_LABELS: Record<string, { label: string; icon: string }> = {
  collaboration: { label: 'Collab', icon: '⊕' },
  mentorship: { label: 'Mentorship', icon: '◎' },
  recruitment: { label: 'Urgent', icon: '⚡' },
  session: { label: 'Session', icon: '♪' },
  project: { label: 'Project', icon: '◈' },
  event: { label: 'Event', icon: '✦' },
};

const URGENCY_COLORS = {
  urgent: Colors.live,
  soon: Colors.amber,
  flexible: Colors.green,
};

interface CollabCardProps {
  collab: Collaboration;
  index: number;
}

export function CollabCard({ collab, index }: CollabCardProps) {
  const scale = useSharedValue(1);
  const [applied, setApplied] = React.useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15 });
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const handleApply = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setApplied(true);
  };

  const typeInfo = COLLAB_TYPE_LABELS[collab.type] ?? { label: collab.type, icon: '✦' };
  const urgencyColor = URGENCY_COLORS[collab.urgency];
  const categoryColor = Colors.categoryColors[collab.artistCategory] ?? Colors.purple;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70).springify()}
      style={animatedStyle}
    >
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => router.push(`/artist/${collab.artistId}` as any)}
        activeOpacity={1}
      >
        <View style={styles.card}>
          {/* Left accent bar */}
          <LinearGradient
            colors={[urgencyColor, `${urgencyColor}44`]}
            style={styles.accentBar}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />

          <View style={styles.content}>
            {/* Top row */}
            <View style={styles.topRow}>
              <View style={styles.badges}>
                <View style={[styles.typeBadge, { backgroundColor: `${urgencyColor}22`, borderColor: `${urgencyColor}55` }]}>
                  <Text style={styles.typeBadgeIcon}>{typeInfo.icon}</Text>
                  <Text style={[styles.typeBadgeLabel, { color: urgencyColor }]}>
                    {typeInfo.label.toUpperCase()}
                  </Text>
                </View>
                {collab.urgency === 'urgent' && (
                  <View style={styles.urgentBadge}>
                    <Text style={styles.urgentText}>⚡ {collab.deadline}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.timeAgo}>{formatTimeAgo(collab.postedAt)}</Text>
            </View>

            {/* Title */}
            <Text style={styles.title}>{collab.title}</Text>

            {/* Description */}
            <Text style={styles.description} numberOfLines={2}>
              {collab.description}
            </Text>

            {/* Seeking chips */}
            <View style={styles.seekingRow}>
              {collab.seeking.map((s) => (
                <View key={s} style={[styles.seekingChip, { backgroundColor: `${categoryColor}15` }]}>
                  <Text style={[styles.seekingText, { color: categoryColor }]}>+ {s}</Text>
                </View>
              ))}
            </View>

            {/* Bottom row */}
            <View style={styles.bottomRow}>
              <TouchableOpacity
                onPress={() => router.push(`/artist/${collab.artistId}` as any)}
                style={styles.artistRow}
                activeOpacity={0.8}
              >
                <ArtistAvatar uri={collab.artistAvatar} size={28} />
                <View>
                  <View style={styles.nameRow}>
                    <Text style={styles.artistName}>{collab.artistName}</Text>
                    {collab.isVerified && (
                      <Text style={[styles.verified, { color: categoryColor }]}>✦</Text>
                    )}
                  </View>
                  <Text style={styles.artistMeta}>
                    {collab.location} · {collab.distance < 1000
                      ? `${collab.distance}m`
                      : `${(collab.distance / 1000).toFixed(1)}km`} away
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={styles.rightActions}>
                <Text style={styles.applicants}>{collab.applicants} applied</Text>
                <TouchableOpacity
                  onPress={handleApply}
                  style={[
                    styles.applyBtn,
                    applied && styles.applyBtnApplied,
                  ]}
                  activeOpacity={0.8}
                >
                  {applied ? (
                    <Text style={[styles.applyText, { color: Colors.green }]}>✓ Sent</Text>
                  ) : (
                    <LinearGradient
                      colors={Colors.gradients.purple}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.applyGradient}
                    >
                      <Text style={styles.applyText}>Apply</Text>
                    </LinearGradient>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Compensation */}
            <View style={styles.compensationRow}>
              <Text style={styles.compensationLabel}>Compensation</Text>
              <Text style={styles.compensationValue}>{collab.compensation}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: 16,
    marginVertical: 5,
  },
  accentBar: {
    width: 3,
  },
  content: {
    flex: 1,
    padding: 14,
    gap: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badges: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  typeBadgeIcon: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  typeBadgeLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 9,
    letterSpacing: 0.8,
  },
  urgentBadge: {
    backgroundColor: `${Colors.live}22`,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  urgentText: {
    color: Colors.live,
    fontFamily: FontFamily.semibold,
    fontSize: 10,
  },
  timeAgo: {
    color: Colors.textTertiary,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
  },
  title: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  description: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  seekingRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  seekingChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  seekingText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  artistName: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
  },
  verified: {
    fontSize: 10,
  },
  artistMeta: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    marginTop: 1,
  },
  rightActions: {
    alignItems: 'flex-end',
    gap: 4,
  },
  applicants: {
    color: Colors.textTertiary,
    fontFamily: FontFamily.regular,
    fontSize: 10,
  },
  applyBtn: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  applyBtnApplied: {
    backgroundColor: `${Colors.green}20`,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  applyGradient: {
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  applyText: {
    color: '#fff',
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.sm,
  },
  compensationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  compensationLabel: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
  compensationValue: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.sm,
    color: Colors.greenLight,
  },
});
