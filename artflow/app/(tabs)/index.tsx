import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import { moods, homeEvents } from '@/constants/home-data';
import { MoodCard } from '@/components/ui/MoodCard';
import { EventCard } from '@/components/ui/EventCard';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Bonjour X</Text>
          <Text style={styles.question}>
            Quelle{' '}
            <Text style={styles.purpleText}>ambiance</Text> cherches-tu
            {'\n'}aujourd'hui ?
          </Text>
        </View>

        <View style={styles.moodContainer}>
          <View style={styles.moodRow}>
            {moods.slice(0, 3).map((mood) => (
              <MoodCard
                key={mood.id}
                title={mood.title}
                icon={mood.icon as any}
                color={mood.color}
              />
            ))}
          </View>
          <View style={styles.moodRowSecond}>
            {moods.slice(3).map((mood) => (
              <MoodCard
                key={mood.id}
                title={mood.title}
                icon={mood.icon as any}
                color={mood.color}
              />
            ))}
          </View>
        </View>

        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>
            Événements{' '}
            <Text style={styles.purpleText}>proches</Text>
          </Text>
        </View>

        <FlatList
          data={homeEvents}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventsList}
          renderItem={({ item }) => (
            <EventCard
              title={item.title}
              category={item.category}
              distance={item.distance}
              time={item.time}
              icon={item.icon as any}
              color={item.color}
            />
          )}
        />

        <LinearGradient
          colors={[
            'rgba(255, 248, 239, 0)',
            'rgba(124, 92, 255, 0.65)',
            'rgba(124, 92, 255, 0.95)',
          ]}
          style={styles.bottomGradient}
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
  header: {
    paddingHorizontal: 24,
    marginTop: 28,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.dark,
    letterSpacing: -0.8,
    marginBottom: 18,
  },
  question: {
    fontSize: 21,
    fontWeight: '500',
    color: COLORS.dark,
    lineHeight: 27,
    letterSpacing: -0.2,
  },
  purpleText: {
    color: COLORS.purple,
  },
  moodContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  moodRow: {
    flexDirection: 'row',
    gap: 14,
  },
  moodRowSecond: {
    flexDirection: 'row',
    gap: 28,
    marginTop: 16,
  },
  sectionTitleWrapper: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: '500',
    color: COLORS.dark,
    letterSpacing: -0.3,
  },
  eventsList: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  bottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 170,
  },
});
