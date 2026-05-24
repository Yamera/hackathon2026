import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

export function LocationInput() {
  return (
    <TouchableOpacity
      activeOpacity={0.82}
      accessibilityRole="button"
      accessibilityLabel="Modifier la localisation, Montréal Québec dans un rayon de 2 kilomètres"
      style={styles.container}
    >
      <View style={styles.iconBox}>
        <Feather name="map-pin" size={19} color={COLORS.turquoise} />
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>LOCALISATION</Text>
        <Text style={styles.text}>Montréal, QC · rayon de 2 km</Text>
      </View>
      <Text style={styles.modify}>Modifier</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 62,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.78)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(78,205,196,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  label: {
    color: COLORS.gray,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.9,
  },
  text: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.dark,
  },
  modify: {
    color: COLORS.purple,
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 6,
  },
});
