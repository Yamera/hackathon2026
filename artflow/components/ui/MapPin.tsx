import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  top: number;
  left: number;
};

export function MapPin({ icon, color, top, left }: Props) {
  return (
    <View style={[styles.wrapper, { top, left }]}>
      <View style={[styles.pin, { backgroundColor: color, shadowColor: color }]}>
        <MaterialCommunityIcons name={icon} size={25} color={COLORS.white} />
      </View>
      <View style={[styles.tip, { borderTopColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  pin: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 16,
    elevation: 6,
  },
  tip: {
    marginTop: -5,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
