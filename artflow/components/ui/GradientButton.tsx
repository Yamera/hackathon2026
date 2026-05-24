import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { FontFamily, FontSize } from '@/constants/typography';
import { BorderRadius } from '@/constants/theme';

interface GradientButtonProps {
  label: string;
  onPress: () => void;
  gradient?: readonly [string, string, ...string[]];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'ghost' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function GradientButton({
  label,
  onPress,
  gradient = Colors.gradients.purple,
  size = 'md',
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}: GradientButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const sizeStyles = {
    sm: { height: 36, paddingHorizontal: 16, borderRadius: BorderRadius.lg },
    md: { height: 48, paddingHorizontal: 24, borderRadius: BorderRadius.xl },
    lg: { height: 56, paddingHorizontal: 32, borderRadius: BorderRadius['2xl'] },
  }[size];

  const textSizes = {
    sm: FontSize.sm,
    md: FontSize.base,
    lg: FontSize.md,
  }[size];

  if (variant === 'ghost') {
    return (
      <AnimatedTouchable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[animatedStyle, styles.ghost, sizeStyles, fullWidth && styles.fullWidth, style]}
        activeOpacity={1}
      >
        {icon}
        <Text style={[styles.ghostText, { fontSize: textSizes }, textStyle]}>{label}</Text>
      </AnimatedTouchable>
    );
  }

  if (variant === 'outline') {
    return (
      <AnimatedTouchable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[animatedStyle, styles.outline, sizeStyles, fullWidth && styles.fullWidth, style]}
        activeOpacity={1}
      >
        {icon}
        <Text style={[styles.outlineText, { fontSize: textSizes }, textStyle]}>{label}</Text>
      </AnimatedTouchable>
    );
  }

  return (
    <AnimatedTouchable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[animatedStyle, fullWidth && styles.fullWidth, style]}
      activeOpacity={1}
    >
      <LinearGradient
        colors={disabled ? ['#333', '#222'] : gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, sizeStyles]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <>
            {icon}
            <Text style={[styles.text, { fontSize: textSizes }, textStyle]}>{label}</Text>
          </>
        )}
      </LinearGradient>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    color: '#fff',
    fontFamily: FontFamily.semibold,
    letterSpacing: 0.2,
  },
  ghost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.glass,
  },
  ghostText: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.medium,
  },
  outline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  outlineText: {
    color: Colors.textPrimary,
    fontFamily: FontFamily.medium,
  },
  fullWidth: {
    width: '100%',
  },
});
