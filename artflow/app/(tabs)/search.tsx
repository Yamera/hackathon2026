import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import { searchMoods, searchValues } from '@/constants/search-data';
import ArtLoopBackground from '@/components/ui/ArtLoopBackground';
import { BudgetSlider, type BudgetRange } from '@/components/ui/BudgetSlider';
import { LocationInput } from '@/components/ui/LocationInput';
import { MoodCard } from '@/components/ui/MoodCard';
import { SearchInput } from '@/components/ui/SearchInput';
import { ValueChip } from '@/components/ui/ValueChip';

const MAX_SELECTED_MOODS = 3;

export default function SearchScreen() {
  const [selectedMoodIds, setSelectedMoodIds] = React.useState<string[]>([]);
  const [budgetRange, setBudgetRange] = React.useState<BudgetRange>([20, 120]);
  const hasReachedMoodLimit = selectedMoodIds.length === MAX_SELECTED_MOODS;

  const toggleMood = (moodId: string) => {
    setSelectedMoodIds((currentIds) => {
      if (currentIds.includes(moodId)) {
        return currentIds.filter((id) => id !== moodId);
      }

      if (currentIds.length >= MAX_SELECTED_MOODS) {
        return currentIds;
      }

      return [...currentIds, moodId];
    });
  };

  const selectionHint = selectedMoodIds.length === 0
    ? "Choisis jusqu'à 3"
    : `${selectedMoodIds.length}/3 sélectionnée${selectedMoodIds.length > 1 ? 's' : ''}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.cream} />
      <ArtLoopBackground />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>EXPLORER</Text>
          <Text style={styles.title}>
            Trouve une scène qui{'\n'}
            <Text style={styles.purple}>te ressemble</Text>
          </Text>
          <Text style={styles.subtitle}>
            Découvre des artistes et événements selon ton humeur, tes valeurs et ton budget.
          </Text>
        </View>

        <View style={styles.searchPanel}>
          <SearchInput />
          <LocationInput />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quelle ambiance ?</Text>
          <Text style={[styles.sectionHint, hasReachedMoodLimit && styles.sectionHintLimit]}>
            {selectionHint}
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moodsRow}
        >
          {searchMoods.map((mood) => {
            const isSelected = selectedMoodIds.includes(mood.id);

            return (
              <MoodCard
                key={mood.id}
                title={mood.title}
                icon={mood.icon as any}
                color={mood.color}
                selected={isSelected}
                disabled={hasReachedMoodLimit && !isSelected}
                onPress={() => toggleMood(mood.id)}
              />
            );
          })}
        </ScrollView>

        <View style={styles.filtersCard}>
          <View style={styles.sectionHeaderInside}>
            <Text style={styles.sectionTitle}>Tes valeurs</Text>
            <Text style={styles.optionalLabel}>OPTIONNEL</Text>
          </View>
          <View style={styles.valuesRow}>
            {searchValues.map((value, index) => (
              <ValueChip key={value.id} label={value.label} selected={index !== 1} />
            ))}
          </View>

          <View style={styles.budgetHeader}>
            <Text style={styles.sectionTitle}>Budget</Text>
            <Text style={styles.budgetCaption}>Par événement</Text>
          </View>
          <BudgetSlider value={budgetRange} onValueChange={setBudgetRange} />
        </View>

        <TouchableOpacity
          activeOpacity={0.88}
          accessibilityRole="button"
          accessibilityLabel="Afficher les expériences correspondantes"
          style={styles.resultsButtonWrapper}
        >
          <LinearGradient
            colors={[COLORS.purple, COLORS.coral]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.resultsButton}
          >
            <Feather name="search" size={19} color={COLORS.white} />
            <Text style={styles.resultsButtonText}>Afficher 24 expériences</Text>
            <Feather name="arrow-right" size={19} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scrollContent: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 118,
  },
  header: {
    marginBottom: 22,
  },
  eyebrow: {
    color: COLORS.purple,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 10,
  },
  title: {
    color: COLORS.dark,
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 39,
    letterSpacing: -1,
  },
  purple: {
    color: COLORS.purple,
  },
  subtitle: {
    maxWidth: 410,
    marginTop: 10,
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
  },
  searchPanel: {
    padding: 12,
    gap: 10,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.62)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.84)',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 3,
  },
  sectionHeader: {
    marginTop: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderInside: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: COLORS.dark,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.35,
  },
  sectionHint: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHintLimit: {
    color: COLORS.coral,
  },
  moodsRow: {
    paddingTop: 15,
    paddingBottom: 2,
    gap: 10,
  },
  filtersCard: {
    marginTop: 25,
    padding: 18,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.86)',
  },
  optionalLabel: {
    color: COLORS.turquoise,
    backgroundColor: 'rgba(78,205,196,0.12)',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 10,
  },
  valuesRow: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  budgetHeader: {
    marginTop: 25,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  budgetCaption: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: '700',
  },
  resultsButtonWrapper: {
    marginTop: 20,
  },
  resultsButton: {
    height: 58,
    borderRadius: 19,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 11,
    shadowColor: COLORS.purple,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 18,
    elevation: 5,
  },
  resultsButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '900',
  },
  resultsHeader: {
    marginTop: 31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultsSubtitle: {
    marginTop: 5,
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: '600',
  },
  seeAll: {
    color: COLORS.purple,
    fontSize: 13,
    fontWeight: '900',
  },
  eventsRow: {
    paddingTop: 17,
    paddingBottom: 4,
    gap: 12,
  },
});
