import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants/colors';

export function BudgetSlider() {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.amount}>0$</Text>
        <Text style={styles.amount}>1000$</Text>
      </View>
      <View style={styles.trackContainer}>
        <View style={styles.activeTrack} />
        <View style={styles.dottedTrack} />
        <View style={styles.thumb} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -2,
    paddingHorizontal: 10,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  amount: {
    fontSize: 12,
    color: '#000000',
  },
  trackContainer: {
    height: 26,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  activeTrack: {
    position: 'absolute',
    left: 4,
    width: 122,
    height: 4,
    backgroundColor: COLORS.dark,
    borderRadius: 2,
  },
  dottedTrack: {
    position: 'absolute',
    left: 126,
    right: 4,
    height: 4,
    borderRadius: 2,
    borderStyle: 'dotted',
    borderWidth: 2,
    borderColor: '#8B8B8B',
  },
  thumb: {
    position: 'absolute',
    left: 120,
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: COLORS.dark,
  },
});
