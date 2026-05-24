import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';

type Props = {
  name: string;
  message: string;
  time: string;
  image?: string | null;
  initials?: string;
  unread?: number;
  active?: boolean;
  online?: boolean;
  verified?: boolean;
  onPress?: () => void;
};

export function ConversationCard({
  name, message, time, image, initials, unread, active, online, verified, onPress,
}: Props) {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress}>
      <View style={[styles.card, active && styles.activeCard]}>
        <View>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <LinearGradient colors={[COLORS.dark, COLORS.purple]} style={styles.initialAvatar}>
              <Text style={styles.initials}>{initials}</Text>
            </LinearGradient>
          )}
          {online ? <View style={styles.onlineDot} /> : null}
        </View>

        <View style={styles.content}>
          <View style={styles.nameRow}>
            <Text numberOfLines={1} style={styles.name}>{name}</Text>
            {verified ? (
              <Ionicons name="checkmark-circle" size={18} color={COLORS.purple} />
            ) : null}
          </View>
          <Text numberOfLines={2} style={styles.message}>{message}</Text>
        </View>

        <View style={styles.rightSide}>
          <Text style={[styles.time, active && styles.activeTime]}>{time}</Text>
          {unread ? (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{unread}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 100,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
    marginHorizontal: 22,
    marginBottom: 14,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  activeCard: {
    backgroundColor: 'rgba(124, 92, 255, 0.12)',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  initialAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 16,
  },
  onlineDot: {
    position: 'absolute',
    right: 0,
    bottom: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#20C76A',
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  content: {
    flex: 1,
    marginLeft: 18,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.dark,
    maxWidth: 190,
  },
  message: {
    marginTop: 6,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: COLORS.gray,
  },
  rightSide: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.gray,
  },
  activeTime: {
    color: COLORS.purple,
  },
  unreadBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '900',
  },
});
