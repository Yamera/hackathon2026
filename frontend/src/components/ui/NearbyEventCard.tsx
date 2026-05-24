import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';

type Props = {
  title: string;
  subtitle: string;
  time: string;
  distance: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  image: string;
};

export function NearbyEventCard({ title, subtitle, time, distance, icon, color, image }: Props) {
  return (
    <View style={styles.card}>
      <ImageBackground source={{ uri: image }} style={styles.image} imageStyle={styles.imageRadius}>
        <LinearGradient
          colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.45)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.distanceBadge}>
          <Text style={styles.distanceText}>{distance}</Text>
        </View>
      </ImageBackground>

      <View style={styles.bottom}>
        <View style={[styles.iconCircle, { backgroundColor: color }]}>
          <MaterialCommunityIcons name={icon} size={15} color={COLORS.white} />
        </View>
        <View style={styles.textBox}>
          <Text numberOfLines={2} style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 158,
    height: 210,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 4,
  },
  image: {
    height: 118,
  },
  imageRadius: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  distanceBadge: {
    position: 'absolute',
    top: 12,
    right: 10,
    backgroundColor: 'rgba(31, 41, 55, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
  },
  distanceText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 14,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.dark,
    lineHeight: 17,
  },
  subtitle: {
    marginTop: 5,
    color: COLORS.gray,
    fontSize: 13,
  },
  time: {
    marginTop: 7,
    color: COLORS.dark,
    fontSize: 13,
    fontWeight: '700',
  },
});
