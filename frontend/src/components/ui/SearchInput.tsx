import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

export function SearchInput() {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Feather name="search" size={19} color={COLORS.purple} />
      </View>
      <TextInput
        accessibilityLabel="Recherche"
        placeholder="Artiste, événement ou catégorie"
        placeholderTextColor={COLORS.gray}
        returnKeyType="search"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'rgba(31,41,55,0.04)',
  },
  iconBox: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: 'rgba(124,92,255,0.11)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
    paddingVertical: 0,
  },
});
