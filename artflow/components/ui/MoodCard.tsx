import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export function MoodCard({
  title,
  icon,
  color,
  selected = false,
  disabled = false,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.82}
      accessibilityRole="button"
      accessibilityLabel={`Ambiance ${title}`}
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      style={[
        styles.card,
        selected && styles.selectedCard,
        selected && { borderColor: color },
        disabled && styles.disabledCard,
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: `${color}1C` }]}>
        <MaterialCommunityIcons name={icon} size={27} color={color} />
      </View>
      <Text style={[styles.text, selected && styles.selectedText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 96,
    height: 101,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.74)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
  },
  disabledCard: {
    opacity: 0.48,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 9,
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.dark,
  },
  selectedText: {
    color: COLORS.purple,
  },
});
