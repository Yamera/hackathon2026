import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

export function SearchInput() {
  return (
    <View style={styles.container}>
      <Feather name="search" size={22} color="#000000" />
      <TextInput
        placeholder="Que cherches-tu ?"
        placeholderTextColor="#000000"
        style={styles.input}
      />
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
    paddingHorizontal: 12,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 0,
  },
});
