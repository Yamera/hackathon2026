import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  title: string;
  category: string;
  distance: string;
  time: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
};

export function EventCard({ title, category, distance, time, icon, color }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={[styles.iconCircle, { backgroundColor: color }]}>
          <MaterialCommunityIcons name={icon} size={24} color={COLORS.white} />
        </View>
        <View style={styles.distanceBadge}>
          <Text style={styles.distanceText}>{distance}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 292,
    height: 172,
    borderRadius: 26,
    backgroundColor: '#D8D2D2',
    overflow: 'hidden',
    padding: 18,
    justifyContent: 'space-between',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  distanceBadge: {
    backgroundColor: 'rgba(31, 41, 55, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  distanceText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '700',
  },
  info: {
    gap: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.dark,
  },
  category: {
    fontSize: 15,
    color: COLORS.grayText,
  },
  time: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.dark,
  },
});
