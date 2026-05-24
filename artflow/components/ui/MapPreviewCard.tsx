import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  title: string;
  category: string;
  distance: string;
  time: string;
  image: string;
  liveColor?: string;
  containerStyle?: object;
};

export function MapPreviewCard({
  title,
  category,
  distance,
  time,
  image,
  liveColor = COLORS.turquoise,
  containerStyle,
}: Props) {
  return (
    <View style={[styles.card, containerStyle]}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.liveDot, { backgroundColor: liveColor }]} />
        </View>
        <Text style={styles.category}>{category}</Text>
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={14} color={COLORS.gray} />
          <Text style={styles.distance}>{distance}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    left: 95,
    bottom: 78,
    width: 290,
    minHeight: 118,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: 14,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 8,
  },
  image: {
    width: 84,
    height: 90,
    borderRadius: 16,
  },
  content: {
    marginLeft: 14,
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.dark,
    flex: 1,
    flexShrink: 1,
  },
  liveDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.turquoise,
  },
  category: {
    marginTop: 4,
    color: COLORS.purple,
    fontSize: 15,
    fontWeight: '700',
    flexShrink: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 5,
  },
  distance: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
  },
  time: {
    marginTop: 4,
    color: COLORS.coral,
    fontSize: 15,
    fontWeight: '700',
  },
});
