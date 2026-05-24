import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import { searchMoods, searchValues } from '@/constants/search-data';
import { SearchInput } from '@/components/ui/SearchInput';
import { LocationInput } from '@/components/ui/LocationInput';
import { MoodCard } from '@/components/ui/MoodCard';
import { ValueChip } from '@/components/ui/ValueChip';
import { BudgetSlider } from '@/components/ui/BudgetSlider';

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Recherche</Text>

          <SearchInput />

          <Text style={styles.sectionTitle}>Localisation</Text>
          <LocationInput />

          <Text style={styles.sectionTitle}>Ambiance</Text>
          <View style={styles.moodWrapper}>
            <View style={styles.moodRow}>
              {searchMoods.slice(0, 3).map((mood) => (
                <MoodCard
                  key={mood.id}
                  title={mood.title}
                  icon={mood.icon as any}
                  color={mood.color}
                />
              ))}
            </View>
            <View style={styles.moodSecondRow}>
              {searchMoods.slice(3).map((mood) => (
                <MoodCard
                  key={mood.id}
                  title={mood.title}
                  icon={mood.icon as any}
                  color={mood.color}
                />
              ))}
            </View>
          </View>

          <Text style={styles.sectionTitle}>Valeurs transmises</Text>
          <View style={styles.valuesRow}>
            {searchValues.map((value) => (
              <ValueChip key={value.id} label={value.label} />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Budget</Text>
          <BudgetSlider />
        </ScrollView>

        <LinearGradient
          colors={[
            'rgba(255,248,239,0)',
            'rgba(78,205,196,0.45)',
            'rgba(78,205,196,0.75)',
          ]}
          style={styles.bottomGlow}
          pointerEvents="none"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  title: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '900',
    color: COLORS.dark,
    marginTop: 14,
    marginBottom: 24,
  },
  sectionTitle: {
    marginTop: 22,
    marginBottom: 7,
    paddingHorizontal: 10,
    fontSize: 22,
    fontWeight: '400',
    color: '#000000',
  },
  moodWrapper: {
    alignItems: 'center',
  },
  moodRow: {
    flexDirection: 'row',
    gap: 18,
  },
  moodSecondRow: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 30,
  },
  valuesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  bottomGlow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 185,
  },
});
