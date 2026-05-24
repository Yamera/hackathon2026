import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { FontFamily, FontSize } from '@/constants/typography';

interface LiveBadgeProps {
  size?: 'sm' | 'md';
  label?: string;
}

export function LiveBadge({ size = 'md', label = 'LIVE' }: LiveBadgeProps) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 600 }),
        withTiming(1, { duration: 600 })
      ),
      -1,
      false
    );
  }, []);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const isSmall = size === 'sm';

  return (
    <View style={[styles.badge, isSmall && styles.badgeSm]}>
      <Animated.View style={[styles.dot, isSmall && styles.dotSm, dotStyle]} />
      <Text style={[styles.text, isSmall && styles.textSm]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.live,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
    gap: 5,
  },
  badgeSm: {
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  dotSm: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  text: {
    color: '#fff',
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xs,
    letterSpacing: 1,
  },
  textSm: {
    fontSize: 10,
  },
});
