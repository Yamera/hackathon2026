import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';

interface ArtistAvatarProps {
  uri: string;
  size?: number;
  isLive?: boolean;
  isAvailable?: boolean;
  glowColor?: string;
  style?: object;
}

export function ArtistAvatar({
  uri,
  size = 44,
  isLive = false,
  isAvailable = false,
  glowColor = Colors.purple,
  style,
}: ArtistAvatarProps) {
  const glowOpacity = useSharedValue(0.5);

  React.useEffect(() => {
    if (isLive) {
      glowOpacity.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
    }
  }, [isLive]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    shadowOpacity: glowOpacity.value * 0.8,
  }));

  const borderColor = isLive ? Colors.live : isAvailable ? Colors.green : Colors.border;
  const statusColor = isLive ? Colors.live : Colors.green;
  const statusSize = Math.max(10, size * 0.24);

  return (
    <View style={[{ width: size + 4, height: size + 4 }, style]}>
      {isLive && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: (size + 4) / 2,
              shadowColor: Colors.live,
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 12,
              elevation: 8,
            },
            glowStyle,
          ]}
        />
      )}
      <Image
        source={{ uri }}
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor,
            margin: 2,
          },
        ]}
      />
      {(isLive || isAvailable) && (
        <View
          style={[
            styles.statusDot,
            {
              width: statusSize,
              height: statusSize,
              borderRadius: statusSize / 2,
              backgroundColor: statusColor,
              bottom: 0,
              right: 0,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
  },
  statusDot: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: Colors.bg,
  },
});
