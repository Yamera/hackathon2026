import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  type: 'search' | 'filter' | 'bell';
  badge?: number;
  onPress?: () => void;
};

export function HeaderActionButton({ type, badge, onPress }: Props) {
  const renderIcon = () => {
    if (type === 'search') return <Feather name="search" size={25} color={COLORS.dark} />;
    if (type === 'filter') return <Feather name="sliders" size={25} color={COLORS.dark} />;
    return <Ionicons name="notifications-outline" size={25} color={COLORS.dark} />;
  };

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
      {renderIcon()}
      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  badge: {
    position: 'absolute',
    top: -3,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.coral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
});
