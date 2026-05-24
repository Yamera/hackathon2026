import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';

type Props = {
  label: string;
};

export function ValueChip({ label }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.chip}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    width: 94,
    height: 32,
    borderRadius: 18,
    backgroundColor: '#DDD8D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.dark,
  },
});
