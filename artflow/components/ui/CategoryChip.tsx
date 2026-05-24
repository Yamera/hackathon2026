import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  active?: boolean;
};

export function CategoryChip({ label, icon, color, active }: Props) {
  if (active) {
    return (
      <TouchableOpacity activeOpacity={0.85}>
        <LinearGradient
          colors={[COLORS.purple, COLORS.coral]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.activeChip}
        >
          <Text style={styles.activeText}>{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.chip}>
      <MaterialCommunityIcons name={icon} size={22} color={color} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  activeChip: {
    height: 54,
    paddingHorizontal: 28,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.purple,
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 5,
  },
  activeText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '800',
  },
  chip: {
    height: 54,
    paddingHorizontal: 22,
    borderRadius: 27,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 3,
  },
  text: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: '700',
  },
});
