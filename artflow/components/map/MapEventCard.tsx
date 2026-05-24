import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
} from 'react-native-reanimated';
import { MapEvent } from '@/types';
import { Colors } from '@/constants/colors';
import { FontFamily, FontSize } from '@/constants/typography';
import { BorderRadius, Shadow } from '@/constants/theme';
import { LiveBadge } from '@/components/ui/LiveBadge';
import { formatEventTime, formatDistance } from '@/data/events';

const { width } = Dimensions.get('window');

interface MapEventCardProps {
  event: MapEvent;
  onClose?: () => void;
}

export function MapEventCard({ event, onClose }: MapEventCardProps) {
  const color = Colors.categoryColors[event.category] ?? Colors.purple;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    router.push(`/event/${event.id}` as any);
  };

  const capacityPct = (event.attendees / event.maxAttendees) * 100;

  return (
    <Animated.View entering={FadeIn.duration(250).springify()} style={[styles.container, animatedStyle]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.95}>
        <View style={styles.card}>
          <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={[styles.overlay, StyleSheet.absoluteFill]} />

          {/* Image header */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: event.imageUri }} style={styles.image} />
            <LinearGradient
              colors={['transparent', 'rgba(8,8,16,0.95)']}
              style={[StyleSheet.absoluteFill, { borderRadius: BorderRadius.xl }]}
            />
            <View style={styles.imageMeta}>
              {event.isLive ? (
                <LiveBadge size="sm" />
              ) : event.isHappeningSoon ? (
                <View style={[styles.soonBadge, { backgroundColor: `${color}33`, borderColor: color }]}>
                  <Text style={[styles.soonText, { color }]}>
                    {formatEventTime(event.startTime)}
                  </Text>
                </View>
              ) : null}
              <Text style={styles.distanceText}>{formatDistance(event.distance)}</Text>
            </View>
          </View>

          {/* Info */}
          <View style={styles.info}>
            <View style={[styles.categoryDot, { backgroundColor: color }]} />
            <View style={styles.textBlock}>
              <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
              <Text style={styles.venue} numberOfLines={1}>
                {event.venue} · {event.ticketPrice}
              </Text>
            </View>
            <View style={[styles.attendBadge, { backgroundColor: `${color}22` }]}>
              <Text style={[styles.attendText, { color }]}>{event.attendees}</Text>
              <Text style={styles.goingText}>going</Text>
            </View>
          </View>

          {/* Capacity bar */}
          <View style={styles.capacityBar}>
            <View style={[styles.capacityFill, { width: `${capacityPct}%`, backgroundColor: color }]} />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    marginHorizontal: 16,
  },
  card: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    ...Shadow.md,
  },
  overlay: {
    backgroundColor: 'rgba(8,8,16,0.65)',
  },
  imageContainer: {
    height: 130,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageMeta: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  soonBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
  },
  soonText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.semibold,
  },
  distanceText: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    color: Colors.textPrimary,
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.base,
  },
  venue: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  attendBadge: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  attendText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.base,
  },
  goingText: {
    color: Colors.textTertiary,
    fontFamily: FontFamily.regular,
    fontSize: 10,
  },
  capacityBar: {
    height: 2,
    backgroundColor: Colors.elevated,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 1,
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
    borderRadius: 1,
    opacity: 0.7,
  },
});
