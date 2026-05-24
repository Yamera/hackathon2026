import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';

type Props = {
  label: string;
  selected?: boolean;
};

export function ValueChip({ label, selected = false }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[styles.chip, selected && styles.selectedChip]}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: 'rgba(31,41,55,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedChip: {
    backgroundColor: 'rgba(124,92,255,0.11)',
    borderColor: 'rgba(124,92,255,0.3)',
  },
  text: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.gray,
  },
  selectedText: {
    color: COLORS.purple,
  },
});
