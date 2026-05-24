import React from 'react';
import { Image, StyleSheet } from 'react-native';

type Props = {
  image: string;
};

export function PortfolioImage({ image }: Props) {
  return <Image source={{ uri: image }} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 136,
    height: 118,
    borderRadius: 22,
  },
});
