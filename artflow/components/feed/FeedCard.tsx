import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  FadeInDown,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { FeedPost } from '@/types';
import { Colors } from '@/constants/colors';
import { FontFamily, FontSize } from '@/constants/typography';
import { BorderRadius, Spacing } from '@/constants/theme';
import { ArtistAvatar } from '@/components/ui/ArtistAvatar';
import { formatLikeCount, formatTimeAgo } from '@/data/feed';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

interface FeedCardProps {
  post: FeedPost;
  index: number;
}

export function FeedCard({ post, index }: FeedCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likeCount, setLikeCount] = useState(post.likes);

  const heartScale = useSharedValue(1);
  const saveScale = useSharedValue(1);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));
  const saveStyle = useAnimatedStyle(() => ({
    transform: [{ scale: saveScale.value }],
  }));

  const handleLike = () => {
    heartScale.value = withSequence(
      withSpring(1.4, { damping: 8 }),
      withSpring(1, { damping: 10 })
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  };

  const handleSave = () => {
    saveScale.value = withSequence(
      withSpring(1.3, { damping: 8 }),
      withSpring(1, { damping: 10 })
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsSaved((prev) => !prev);
  };

  const categoryColor = Colors.categoryColors[post.artistCategory] ?? Colors.purple;
  const isReel = post.type === 'reel';

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 80).springify()}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push(`/artist/${post.artistId}` as any)}
          style={styles.artistRow}
          activeOpacity={0.8}
        >
          <ArtistAvatar
            uri={post.artistAvatar}
            size={40}
            isLive={false}
            isAvailable={false}
          />
          <View style={styles.artistInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.artistName}>{post.artistName}</Text>
              {post.isVerified && (
                <Text style={[styles.verifiedBadge, { color: categoryColor }]}>✦</Text>
              )}
            </View>
            <Text style={styles.postMeta}>
              {post.location} · {formatTimeAgo(post.postedAt)}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreBtn}>
          <Text style={styles.moreDots}>···</Text>
        </TouchableOpacity>
      </View>

      {/* Media */}
      <View style={styles.mediaContainer}>
        <Image
          source={{ uri: post.mediaUri }}
          style={styles.media}
          resizeMode="cover"
        />
        {isReel && (
          <>
            <LinearGradient
              colors={['rgba(8,8,16,0)', 'rgba(8,8,16,0.5)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.reelBadge}>
              <Text style={styles.reelText}>▶ REEL</Text>
            </View>
            {post.views && (
              <View style={styles.viewCount}>
                <Text style={styles.viewText}>{formatLikeCount(post.views)} views</Text>
              </View>
            )}
          </>
        )}
        {/* Category glow bar */}
        <LinearGradient
          colors={[categoryColor, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.categoryBar, { opacity: 0.8 }]}
        />
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={handleLike} activeOpacity={1} style={styles.actionBtn}>
            <Animated.Text
              style={[
                styles.actionIcon,
                { color: isLiked ? Colors.pink : Colors.textSecondary },
                heartStyle,
              ]}
            >
              {isLiked ? '♥' : '♡'}
            </Animated.Text>
            <Text style={[styles.actionCount, isLiked && { color: Colors.pink }]}>
              {formatLikeCount(likeCount)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>◇</Text>
            <Text style={styles.actionCount}>{formatLikeCount(post.comments)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>⇪</Text>
            <Text style={styles.actionCount}>{formatLikeCount(post.shares)}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSave} activeOpacity={1}>
          <Animated.Text
            style={[
              styles.saveIcon,
              { color: isSaved ? Colors.purpleLight : Colors.textSecondary },
              saveStyle,
            ]}
          >
            {isSaved ? '⊟' : '⊞'}
          </Animated.Text>
        </TouchableOpacity>
      </View>

      {/* Caption */}
      <View style={styles.captionBlock}>
        <Text style={styles.caption} numberOfLines={2}>
          <Text style={styles.captionName}>{post.artistName} </Text>
          {post.caption}
        </Text>
        <View style={styles.tags}>
          {post.tags.slice(0, 4).map((tag) => (
            <TouchableOpacity key={tag} style={styles.tagChip}>
              <Text style={[styles.tagText, { color: categoryColor }]}>#{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
    backgroundColor: Colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  artistInfo: {
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  artistName: {
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  verifiedBadge: {
    fontSize: 11,
  },
  postMeta: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
  moreBtn: {
    padding: 8,
  },
  moreDots: {
    color: Colors.textTertiary,
    fontSize: 16,
    letterSpacing: 1,
  },
  mediaContainer: {
    width: '100%',
    height: CARD_WIDTH,
    position: 'relative',
    backgroundColor: Colors.card,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  reelBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(8,8,16,0.6)',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  reelText: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.xs,
    letterSpacing: 1,
  },
  viewCount: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  viewText: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
  },
  categoryBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftActions: {
    flexDirection: 'row',
    gap: 20,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionIcon: {
    fontSize: 22,
    color: Colors.textSecondary,
  },
  actionCount: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  saveIcon: {
    fontSize: 22,
  },
  captionBlock: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  caption: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  captionName: {
    fontFamily: FontFamily.semibold,
    color: Colors.textPrimary,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: Colors.elevated,
    borderRadius: 6,
  },
  tagText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
  },
});
