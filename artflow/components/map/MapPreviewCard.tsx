import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

export function MapPreviewCard() {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=400' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Pianiste en live</Text>
          <View style={styles.liveDot} />
        </View>
        <Text style={styles.category}>Performance live</Text>
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={14} color={COLORS.gray} />
          <Text style={styles.distance}>200 m de toi</Text>
        </View>
        <Text style={styles.time}>Dans 15 min</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    left: 95,
    bottom: 38,
    width: 250,
    height: 106,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: 12,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 8,
  },
  image: {
    width: 78,
    height: 82,
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
  },
  time: {
    marginTop: 4,
    color: COLORS.coral,
    fontSize: 15,
    fontWeight: '700',
  },
});
