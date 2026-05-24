import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';

type Props = {
  name: string;
  type?: string;
  image?: string;
  online?: boolean;
};

export function ChatStory({ name, type, image, online }: Props) {
  if (type === 'new') {
    return (
      <TouchableOpacity activeOpacity={0.85} style={styles.storyItem}>
        <LinearGradient
          colors={[COLORS.purple, COLORS.coral]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dashedCircle}
        >
          <View style={styles.newInner}>
            <Feather name="plus" size={30} color={COLORS.dark} />
          </View>
        </LinearGradient>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.storyItem}>
      <LinearGradient
        colors={[COLORS.purple, COLORS.coral]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.avatarRing}
      >
        <Image source={{ uri: image }} style={styles.avatar} />
        {online ? <View style={styles.onlineDot} /> : null}
      </LinearGradient>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  storyItem: {
    width: 76,
    alignItems: 'center',
  },
  avatarRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 3,
    borderColor: COLORS.cream,
  },
  onlineDot: {
    position: 'absolute',
    right: 3,
    bottom: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#20C76A',
    borderWidth: 3,
    borderColor: COLORS.cream,
  },
  dashedCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    padding: 3,
  },
  newInner: {
    flex: 1,
    borderRadius: 36,
    backgroundColor: COLORS.cream,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.purple,
  },
  name: {
    marginTop: 10,
    color: COLORS.dark,
    fontSize: 13,
    fontWeight: '700',
  },
});
