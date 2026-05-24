import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  title: string;
  date: string;
  location: string;
  status: string;
  image: string;
};

export function UpcomingEventCard({ title, date, location, status, image }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
        <View style={styles.infoRow}>
          <Feather name="calendar" size={14} color={COLORS.purple} />
          <Text style={styles.info}>{date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Feather name="map-pin" size={14} color={COLORS.gray} />
          <Text style={styles.info}>{location}</Text>
        </View>
        <Text style={styles.status}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 258,
    height: 122,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: 10,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 4,
  },
  image: {
    width: 96,
    height: 102,
    borderRadius: 18,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '900',
    color: COLORS.dark,
    lineHeight: 18,
    marginBottom: 7,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 3,
  },
  info: {
    fontSize: 12,
    color: COLORS.gray,
    fontWeight: '600',
  },
  status: {
    marginTop: 8,
    color: COLORS.coral,
    fontSize: 13,
    fontWeight: '700',
  },
});
