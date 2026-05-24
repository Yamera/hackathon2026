import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  value: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
};

export function ProfileStat({ value, label, icon, color }: Props) {
  return (
    <View style={styles.card}>
      <MaterialCommunityIcons name={icon} size={28} color={color} />
      <View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 104,
    height: 64,
    borderRadius: 26,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.dark,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.gray,
  },
});
