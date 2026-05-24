import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
};

export function MoodCard({ title, icon, color }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
      <MaterialCommunityIcons name={icon} size={34} color={color} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 88,
    height: 70,
    borderRadius: 16,
    backgroundColor: COLORS.grayCard,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  text: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.dark,
  },
});
