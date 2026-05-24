import React from 'react';
import { Tabs } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Colors } from '@/constants/colors';
import { FontFamily, FontSize } from '@/constants/typography';

const TAB_CONFIG = [
  { name: 'index', label: 'Accueil', icon: '◈', activeIcon: '◉' },
  { name: 'map', label: 'Carte', icon: '⊙', activeIcon: '◉' },
  { name: 'search', label: 'Recherche', icon: '⊘', activeIcon: '⊗' },
  { name: 'feed', label: 'Feed', icon: '⊞', activeIcon: '⊟' },
  { name: 'messages', label: 'Messages', icon: '◇', activeIcon: '◈' },
  { name: 'profile', label: 'Profil', icon: '◎', activeIcon: '◍' },
];

function TabBarButton({
  config,
  isActive,
  onPress,
}: {
  config: (typeof TAB_CONFIG)[0];
  isActive: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const glow = useSharedValue(isActive ? 1 : 0);

  React.useEffect(() => {
    glow.value = withTiming(isActive ? 1 : 0, { duration: 200 });
  }, [isActive]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: interpolate(glow.value, [0, 1], [0.5, 1]),
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [{ scale: interpolate(glow.value, [0, 1], [0.5, 1]) }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.85, { damping: 10 }, () => {
      scale.value = withSpring(1, { damping: 10 });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.tabButton}
      activeOpacity={1}
    >
      <View style={styles.tabButtonInner}>
        {isActive && (
          <Animated.View style={[styles.activeGlow, glowStyle]}>
            <LinearGradient
              colors={[Colors.purpleGlow, 'transparent']}
              style={StyleSheet.absoluteFill}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </Animated.View>
        )}
        <Animated.Text
          style={[
            styles.tabIcon,
            { color: isActive ? Colors.purpleLight : Colors.textTertiary },
            iconStyle,
          ]}
        >
          {isActive ? config.activeIcon : config.icon}
        </Animated.Text>
        <Text
          style={[
            styles.tabLabel,
            { color: isActive ? Colors.purpleLight : Colors.textTertiary },
            isActive && styles.tabLabelActive,
          ]}
        >
          {config.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}>
      <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.tabBarOverlay} />
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const config = TAB_CONFIG[index];
          const isActive = state.index === index;

          if (!config) return null;

          return (
            <TabBarButton
              key={route.key}
              config={config}
              isActive={isActive}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isActive && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="map" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="feed" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: Colors.glassBorder,
  },
  tabBarOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8,8,16,0.85)',
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: Platform.OS === 'android' ? 8 : 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabButtonInner: {
    alignItems: 'center',
    gap: 3,
    paddingVertical: 4,
    paddingHorizontal: 12,
    minWidth: 56,
  },
  activeGlow: {
    position: 'absolute',
    top: -20,
    left: -10,
    right: -10,
    height: 50,
    borderRadius: 20,
    overflow: 'hidden',
  },
  tabIcon: {
    fontSize: 18,
  },
  tabLabel: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.medium,
  },
  tabLabelActive: {
    fontFamily: FontFamily.semibold,
  },
});
