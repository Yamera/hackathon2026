import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';
import { FontFamily, FontSize } from '@/constants/typography';
import { BorderRadius } from '@/constants/theme';

export interface FilterCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export const MAP_CATEGORIES: FilterCategory[] = [
  { id: 'all', label: 'All', icon: '✦', color: Colors.categoryColors.all },
  { id: 'music', label: 'Music', icon: '♪', color: Colors.categoryColors.music },
  { id: 'comedy', label: 'Comedy', icon: '☺', color: Colors.categoryColors.comedy },
  { id: 'dance', label: 'Dance', icon: '◈', color: Colors.categoryColors.dance },
  { id: 'visual', label: 'Visual', icon: '◉', color: Colors.categoryColors.visual },
  { id: 'dj', label: 'DJ', icon: '⊕', color: Colors.categoryColors.dj },
  { id: 'photography', label: 'Photo', icon: '⊙', color: Colors.categoryColors.photography },
  { id: 'theater', label: 'Theater', icon: '◎', color: Colors.categoryColors.theater },
];

interface CategoryFilterProps {
  categories: FilterCategory[];
  selected: string;
  onSelect: (id: string) => void;
  style?: object;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function FilterPill({
  category,
  isSelected,
  onPress,
}: {
  category: FilterCategory;
  isSelected: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.93, { damping: 15 }, () => {
      scale.value = withSpring(1, { damping: 15 });
    });
    onPress();
  };

  const color = category.color;

  return (
    <AnimatedTouchable
      onPress={handlePress}
      activeOpacity={1}
      style={[animatedStyle]}
    >
      {isSelected ? (
        <LinearGradient
          colors={[color, `${color}99`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.pill}
        >
          <Text style={styles.pillIcon}>{category.icon}</Text>
          <Text style={[styles.pillLabel, styles.pillLabelActive]}>{category.label}</Text>
        </LinearGradient>
      ) : (
        <View style={[styles.pill, styles.pillInactive]}>
          <Text style={[styles.pillIcon, { opacity: 0.6 }]}>{category.icon}</Text>
          <Text style={styles.pillLabel}>{category.label}</Text>
        </View>
      )}
    </AnimatedTouchable>
  );
}

export function CategoryFilter({ categories, selected, onSelect, style }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, style]}
    >
      {categories.map((cat) => (
        <FilterPill
          key={cat.id}
          category={cat}
          isSelected={selected === cat.id}
          onPress={() => onSelect(cat.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    gap: 5,
  },
  pillInactive: {
    backgroundColor: Colors.elevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillIcon: {
    fontSize: 12,
    color: '#fff',
  },
  pillLabel: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.medium,
    color: Colors.textSecondary,
  },
  pillLabelActive: {
    color: '#fff',
    fontFamily: FontFamily.semibold,
  },
});
