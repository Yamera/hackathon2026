import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { StoryItem } from '@/types';
import { Colors } from '@/constants/colors';
import { FontFamily, FontSize } from '@/constants/typography';
import { LiveBadge } from '@/components/ui/LiveBadge';

interface StoriesRowProps {
  stories: StoryItem[];
}

export function StoriesRow({ stories }: StoriesRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {stories.map((story, index) => (
        <Animated.View key={story.id} entering={FadeInRight.delay(index * 60).springify()}>
          <TouchableOpacity style={styles.storyItem} activeOpacity={0.8}>
            {/* Ring gradient */}
            <LinearGradient
              colors={
                story.isLive
                  ? [Colors.live, Colors.pink]
                  : story.hasNew
                  ? [Colors.purple, Colors.pink, Colors.cyan]
                  : [Colors.elevated, Colors.elevated]
              }
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.ring}
            >
              <View style={styles.ringInner}>
                <Image source={{ uri: story.avatar }} style={styles.avatar} />
              </View>
            </LinearGradient>
            {story.isLive && (
              <View style={styles.liveBadge}>
                <LiveBadge size="sm" label="LIVE" />
              </View>
            )}
            <Text style={styles.name} numberOfLines={1}>{story.artistName}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
    flexDirection: 'row',
  },
  storyItem: {
    alignItems: 'center',
    gap: 5,
    width: 64,
  },
  ring: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringInner: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    padding: 2,
    backgroundColor: Colors.bg,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  liveBadge: {
    position: 'absolute',
    bottom: 18,
    alignSelf: 'center',
  },
  name: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    textAlign: 'center',
  },
});
