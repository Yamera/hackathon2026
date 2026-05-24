import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  artist: string;
  location: string;
  time: string;
  avatar: string;
  image: string;
  likes: string;
  comments: string;
  shares: string;
  caption: string;
  tags: string[];
  accent: string;
};

export function FeedPostCard({
  artist, location, time, avatar, image, likes, comments, shares, caption, tags, accent,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: avatar }} style={[styles.avatar, { borderColor: accent }]} />
        <View style={styles.artistInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.artist}>{artist}</Text>
            <Ionicons name="sparkles" size={14} color={accent} />
          </View>
          <Text style={styles.location}>{location} · {time}</Text>
        </View>
        <TouchableOpacity>
          <Feather name="more-horizontal" size={24} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: image }} style={styles.postImage} />

      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <View style={styles.actionItem}>
            <Ionicons name="heart" size={24} color={COLORS.coral} />
            <Text style={styles.actionText}>{likes}</Text>
          </View>
          <View style={styles.actionItem}>
            <Ionicons name="chatbubble" size={22} color={COLORS.purple} />
            <Text style={styles.actionText}>{comments}</Text>
          </View>
          <View style={styles.actionItem}>
            <Feather name="share" size={22} color={COLORS.coral} />
            <Text style={styles.actionText}>{shares}</Text>
          </View>
        </View>
        <Feather name="bookmark" size={24} color={COLORS.dark} />
      </View>

      <Text style={styles.caption}>
        <Text style={styles.artistInline}>{artist} </Text>
        {caption}
      </Text>

      <View style={styles.tags}>
        {tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 18,
    marginBottom: 22,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 22,
    elevation: 5,
  },
  header: {
    height: 78,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
  },
  artistInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  artist: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.dark,
  },
  location: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray,
  },
  postImage: {
    width: '100%',
    height: 230,
  },
  actions: {
    paddingHorizontal: 16,
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.dark,
  },
  caption: {
    paddingHorizontal: 16,
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: COLORS.dark,
  },
  artistInline: {
    fontWeight: '900',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 18,
  },
  tag: {
    backgroundColor: 'rgba(124,92,255,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  tagText: {
    color: COLORS.purple,
    fontSize: 12,
    fontWeight: '800',
  },
});
