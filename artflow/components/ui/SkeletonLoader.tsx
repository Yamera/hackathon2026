import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ width = '100%', height = 16, borderRadius = 8, style }: SkeletonProps) {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0, { duration: 800 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.4 + shimmer.value * 0.4,
  }));

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: Colors.elevated,
        },
        animatedStyle,
        style,
      ]}
    />
  );
}

export function FeedCardSkeleton() {
  return (
    <View style={skelStyles.card}>
      <View style={skelStyles.header}>
        <Skeleton width={44} height={44} borderRadius={22} />
        <View style={{ flex: 1, gap: 6 }}>
          <Skeleton width="50%" height={14} />
          <Skeleton width="30%" height={11} />
        </View>
      </View>
      <Skeleton width="100%" height={280} borderRadius={16} style={{ marginVertical: 12 }} />
      <Skeleton width="80%" height={13} />
      <Skeleton width="60%" height={13} style={{ marginTop: 6 }} />
    </View>
  );
}

export function ArtistCardSkeleton() {
  return (
    <View style={skelStyles.artistCard}>
      <Skeleton width="100%" height={120} borderRadius={16} />
      <View style={skelStyles.artistInfo}>
        <Skeleton width={52} height={52} borderRadius={26} style={skelStyles.artistAvatar} />
        <Skeleton width="60%" height={15} style={{ marginTop: 32 }} />
        <Skeleton width="40%" height={12} style={{ marginTop: 6 }} />
      </View>
    </View>
  );
}

const skelStyles = StyleSheet.create({
  card: {
    padding: 16,
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  artistCard: {
    width: 180,
    borderRadius: 16,
    backgroundColor: Colors.card,
    overflow: 'hidden',
  },
  artistInfo: {
    padding: 12,
  },
  artistAvatar: {
    marginTop: -26,
    borderWidth: 2,
    borderColor: Colors.bg,
  },
});
