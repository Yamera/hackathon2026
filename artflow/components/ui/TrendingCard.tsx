import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';

type Props = {
  name: string;
  subtitle: string;
  image: string;
  avatar: string;
  color: string;
  live?: boolean;
};

export function TrendingCard({ name, subtitle, image, avatar, color, live }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`Découvrir ${name}`}
      style={styles.card}
    >
      <ImageBackground source={{ uri: image }} style={styles.image} imageStyle={styles.imageRadius}>
        <LinearGradient
          colors={['rgba(0,0,0,0.05)', 'rgba(31,41,55,0.75)']}
          style={StyleSheet.absoluteFill}
        />

        {live ? (
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        ) : null}

        <View style={styles.bottomContent}>
          <View style={[styles.avatarRing, { borderColor: color }]}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </View>
          <Text numberOfLines={1} style={styles.name}>{name}</Text>
          <Text numberOfLines={1} style={styles.subtitle}>{subtitle}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 166,
    height: 194,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: COLORS.softGray,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
    elevation: 3,
  },
  image: {
    flex: 1,
  },
  imageRadius: {
    borderRadius: 24,
  },
  liveBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.coral,
    height: 27,
    paddingHorizontal: 10,
    borderRadius: 14,
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
  liveText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '900',
  },
  bottomContent: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 14,
  },
  avatarRing: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  name: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.white,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },
});
