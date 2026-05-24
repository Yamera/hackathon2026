import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';

type Props = {
  name: string;
  image: string;
  live?: boolean;
};

export function StoryAvatar({ name, image, live }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.container}>
      <LinearGradient
        colors={[COLORS.purple, COLORS.coral, COLORS.turquoise]}
        style={styles.ring}
      >
        <Image source={{ uri: image }} style={styles.avatar} />
      </LinearGradient>

      {live ? (
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      ) : null}

      <Text numberOfLines={1} style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 76,
    alignItems: 'center',
  },
  ring: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 3,
    borderColor: COLORS.cream,
  },
  liveBadge: {
    position: 'absolute',
    top: 51,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.coral,
    paddingHorizontal: 9,
    height: 24,
    borderRadius: 14,
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
  liveText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '900',
  },
  name: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.dark,
  },
});
