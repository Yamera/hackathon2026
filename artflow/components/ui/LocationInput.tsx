import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

export function LocationInput() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Montréal, QC</Text>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons name="map-marker-path" size={22} color={COLORS.dark} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 38,
    borderRadius: 8,
    backgroundColor: '#F0EBEB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 6,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: '#000000',
  },
  iconBox: {
    width: 32,
    height: 30,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
