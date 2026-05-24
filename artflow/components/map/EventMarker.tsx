import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { FontFamily } from '@/constants/typography';
import { MapEvent } from '@/types';

const CATEGORY_ICONS: Record<string, string> = {
  music: '♪',
  comedy: '☺',
  dance: '◈',
  visual: '◉',
  theater: '◎',
  photography: '⊙',
  dj: '⊕',
  poetry: '✦',
};

interface EventMarkerProps {
  event: MapEvent;
  isSelected: boolean;
  onPress: () => void;
}

export function EventMarker({ event, isSelected, onPress }: EventMarkerProps) {
  const color = Colors.categoryColors[event.category] ?? Colors.purple;
  const pulse = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (event.isLive || event.isHappeningSoon) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000 }),
          withTiming(0, { duration: 1000 })
        ),
        -1,
        false
      );
    }
  }, [event.isLive, event.isHappeningSoon]);

  useEffect(() => {
    scale.value = withSpring(isSelected ? 1.3 : 1, { damping: 12, stiffness: 200 });
  }, [isSelected]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.6, 0]),
    transform: [{ scale: interpolate(pulse.value, [0, 1], [1, 2.2]) }],
  }));

  const markerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isActive = event.isLive || event.isHappeningSoon;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <Animated.View style={[styles.wrapper, markerStyle]}>
        {isActive && (
          <Animated.View
            style={[
              styles.pulse,
              {
                backgroundColor: event.isLive ? Colors.live : color,
                width: isSelected ? 56 : 48,
                height: isSelected ? 56 : 48,
                borderRadius: isSelected ? 28 : 24,
                top: -(isSelected ? 28 : 24) / 2 + 14,
                left: -(isSelected ? 28 : 24) / 2 + 14,
              },
              pulseStyle,
            ]}
          />
        )}
        <View
          style={[
            styles.marker,
            {
              backgroundColor: event.isLive ? Colors.live : color,
              shadowColor: event.isLive ? Colors.live : color,
              width: isSelected ? 48 : 36,
              height: isSelected ? 48 : 36,
              borderRadius: isSelected ? 24 : 18,
            },
          ]}
        >
          <Text
            style={[
              styles.icon,
              { fontSize: isSelected ? 18 : 14 },
            ]}
          >
            {CATEGORY_ICONS[event.category] ?? '✦'}
          </Text>
        </View>
        {isSelected && (
          <View style={[styles.tail, { borderTopColor: event.isLive ? Colors.live : color }]} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    color: '#fff',
    fontFamily: FontFamily.bold,
  },
  tail: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: -1,
  },
});
