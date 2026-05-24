import React from 'react';
import { PanResponder, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants/colors';

export type BudgetRange = [number, number];

type Props = {
  value: BudgetRange;
  onValueChange: (nextValue: BudgetRange) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
};

const THUMB_SIZE = 24;
const THUMB_RADIUS = THUMB_SIZE / 2;

function formatAmount(value: number) {
  return value === 0 ? 'Gratuit' : `${value} $`;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function BudgetSlider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 250,
  step = 5,
}: Props) {
  const [trackWidth, setTrackWidth] = React.useState(0);
  const currentValue = React.useRef(value);
  const activeThumb = React.useRef<'minimum' | 'maximum'>('minimum');

  React.useEffect(() => {
    currentValue.current = value;
  }, [value]);

  const availableWidth = Math.max(trackWidth - THUMB_SIZE, 1);

  const positionForValue = React.useCallback((amount: number) => {
    const ratio = (amount - minimumValue) / (maximumValue - minimumValue);
    return THUMB_RADIUS + ratio * availableWidth;
  }, [availableWidth, maximumValue, minimumValue]);

  const valueForLocation = React.useCallback((locationX: number) => {
    const position = clamp(locationX - THUMB_RADIUS, 0, availableWidth);
    const rawValue = minimumValue + (position / availableWidth) * (maximumValue - minimumValue);
    const steppedValue = minimumValue + Math.round((rawValue - minimumValue) / step) * step;

    return clamp(steppedValue, minimumValue, maximumValue);
  }, [availableWidth, maximumValue, minimumValue, step]);

  const setThumbValue = React.useCallback((locationX: number, thumb: 'minimum' | 'maximum') => {
    if (trackWidth === 0) return;

    const nextAmount = valueForLocation(locationX);
    const [currentMinimum, currentMaximum] = currentValue.current;
    const nextRange: BudgetRange = thumb === 'minimum'
      ? [Math.min(nextAmount, currentMaximum), currentMaximum]
      : [currentMinimum, Math.max(nextAmount, currentMinimum)];

    currentValue.current = nextRange;
    onValueChange(nextRange);
  }, [onValueChange, trackWidth, valueForLocation]);

  const chooseThumb = React.useCallback((locationX: number) => {
    const tappedAmount = valueForLocation(locationX);
    const [currentMinimum, currentMaximum] = currentValue.current;
    const minimumDistance = Math.abs(tappedAmount - currentMinimum);
    const maximumDistance = Math.abs(tappedAmount - currentMaximum);

    if (minimumDistance === maximumDistance) {
      activeThumb.current = tappedAmount >= currentMaximum ? 'maximum' : 'minimum';
    } else {
      activeThumb.current = minimumDistance < maximumDistance ? 'minimum' : 'maximum';
    }

    setThumbValue(locationX, activeThumb.current);
  }, [setThumbValue, valueForLocation]);

  const panResponder = React.useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      chooseThumb(event.nativeEvent.locationX);
    },
    onPanResponderMove: (event) => {
      setThumbValue(event.nativeEvent.locationX, activeThumb.current);
    },
  }), [chooseThumb, setThumbValue]);

  const minimumPosition = positionForValue(value[0]);
  const maximumPosition = positionForValue(value[1]);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.amount}>{formatAmount(minimumValue)}</Text>
        <View style={styles.selectionBadge}>
          <Text style={styles.selectionText}>
            {formatAmount(value[0])} - {formatAmount(value[1])}
          </Text>
        </View>
        <Text style={styles.amount}>{formatAmount(maximumValue)}+</Text>
      </View>

      <View
        {...panResponder.panHandlers}
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel="Plage de budget"
        accessibilityValue={{ text: `${formatAmount(value[0])} à ${formatAmount(value[1])}` }}
        onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
        style={styles.trackContainer}
      >
        <View style={styles.track} />
        {trackWidth > 0 ? (
          <>
            <View
              style={[
                styles.activeTrack,
                { left: minimumPosition, width: maximumPosition - minimumPosition },
              ]}
            />
            <View style={[styles.thumb, styles.minimumThumb, { left: minimumPosition - THUMB_RADIUS }]}>
              <View style={styles.thumbCenter} />
            </View>
            <View style={[styles.thumb, styles.maximumThumb, { left: maximumPosition - THUMB_RADIUS }]}>
              <View style={styles.thumbCenter} />
            </View>
          </>
        ) : null}
      </View>

      <Text style={styles.helperText}>Glisse les points pour ajuster ton budget.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 2,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  amount: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.gray,
  },
  selectionBadge: {
    backgroundColor: 'rgba(255,122,89,0.11)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  selectionText: {
    color: COLORS.coral,
    fontSize: 12,
    fontWeight: '900',
  },
  trackContainer: {
    height: 48,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    left: THUMB_RADIUS,
    right: THUMB_RADIUS,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(31,41,55,0.1)',
  },
  activeTrack: {
    position: 'absolute',
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.purple,
  },
  thumb: {
    position: 'absolute',
    top: 12,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_RADIUS,
    backgroundColor: COLORS.white,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 7,
    elevation: 3,
  },
  minimumThumb: {
    borderColor: COLORS.purple,
  },
  maximumThumb: {
    borderColor: COLORS.coral,
  },
  thumbCenter: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
  helperText: {
    marginTop: 2,
    color: COLORS.gray,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});
