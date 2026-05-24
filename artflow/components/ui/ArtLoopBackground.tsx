import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ArtLoopBackground: React.FC = () => (
  <View style={[StyleSheet.absoluteFill, styles.base]} pointerEvents="none">
    <LinearGradient
      colors={['#FFD16670', 'transparent']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.56, y: 0.56 }}
      style={StyleSheet.absoluteFill}
    />
    <LinearGradient
      colors={['#B8F7EF70', 'transparent']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0.44, y: 0.56 }}
      style={StyleSheet.absoluteFill}
    />
    <LinearGradient
      colors={['#FFD6E070', 'transparent']}
      start={{ x: 0, y: 1 }}
      end={{ x: 0.5, y: 0.5 }}
      style={StyleSheet.absoluteFill}
    />
  </View>
);

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#FFF8EF',
  },
});

export default ArtLoopBackground;
