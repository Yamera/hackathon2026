import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
};

export function ProfileTag({ label, icon, color }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.tag}>
      <MaterialCommunityIcons name={icon} size={21} color={color} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 3,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.dark,
  },
});
