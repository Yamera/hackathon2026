import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { COLORS } from '@/constants/colors';
import { FontFamily, FontSize } from '@/constants/typography';

type FeatherName = React.ComponentProps<typeof Feather>['name'];
type TabConfig = {
  label: string;
  icon: FeatherName;
  activeIcon: FeatherName;
};

const TAB_CONFIG: Record<string, TabConfig> = {
  index: { label: 'Accueil', icon: 'home', activeIcon: 'home' },
  map: { label: 'Carte', icon: 'map-pin', activeIcon: 'map-pin' },
  search: { label: 'Recherche', icon: 'search', activeIcon: 'search' },
  messages: { label: 'Messages', icon: 'message-circle', activeIcon: 'message-circle' },
  profile: { label: 'Profil', icon: 'user', activeIcon: 'user' },
};

function TabBarButton({
  config,
  isActive,
  onPress,
}: {
  config: TabConfig;
  isActive: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const glow = useSharedValue(isActive ? 1 : 0);

  React.useEffect(() => {
    glow.value = withTiming(isActive ? 1 : 0, { duration: 180 });
  }, [glow, isActive]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: interpolate(glow.value, [0, 1], [0.72, 1]),
  }));

  const activeStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
    transform: [{ scale: interpolate(glow.value, [0, 1], [0.96, 1]) }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.9, { damping: 12 }, () => {
      scale.value = withSpring(1, { damping: 12 });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.tabButton}
      activeOpacity={1}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={config.label}
    >
      <View style={styles.tabButtonInner}>
        {isActive ? (
          <Animated.View style={[styles.activePill, activeStyle]}>
            <LinearGradient
              colors={['rgba(124,92,255,0.16)', 'rgba(255,122,89,0.07)']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        ) : null}
        <Animated.View style={iconStyle}>
          <Feather
            name={isActive ? config.activeIcon : config.icon}
            size={20}
            color={isActive ? COLORS.purple : COLORS.gray}
          />
        </Animated.View>
        <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
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
      <BlurView intensity={68} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.tabBarOverlay} />
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const config = TAB_CONFIG[route.name];
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
      screenOptions={{ headerShown: false, sceneStyle: styles.scene }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="map" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="feed" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: 'transparent',
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(31,41,55,0.07)',
    overflow: 'hidden',
  },
  tabBarOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,248,239,0.88)',
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 9,
    paddingBottom: Platform.OS === 'android' ? 9 : 5,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabButtonInner: {
    minWidth: 65,
    paddingHorizontal: 9,
    paddingVertical: 7,
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 18,
    overflow: 'hidden',
  },
  tabLabel: {
    color: COLORS.gray,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
  },
  tabLabelActive: {
    color: COLORS.purple,
    fontFamily: FontFamily.semibold,
  },
});
