import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
};

export function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.searchBox}>
        <Feather name="search" size={30} color="#000000" />
        <TextInput
          placeholder="Rechercher une conversation..."
          placeholderTextColor={COLORS.gray}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 34,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  searchBox: {
    flex: 1,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  input: {
    flex: 1,
    marginLeft: 20,
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.dark,
  },
});
