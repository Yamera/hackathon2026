import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@/constants/colors';

type Props = {
  label: string;
  active?: boolean;
};

export function FeedTab({ label, active }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.wrapper}>
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
      {active ? <View style={styles.indicator} /> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.gray,
  },
  activeText: {
    color: COLORS.purple,
    fontWeight: '900',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    width: 58,
    height: 3,
    borderRadius: 3,
    backgroundColor: COLORS.purple,
  },
});
