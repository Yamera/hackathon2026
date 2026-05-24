import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import { portfolioImages, upcomingEvents } from '@/constants/profile-data';
import { ProfileStat } from '@/components/ui/ProfileStat';
import { UpcomingEventCard } from '@/components/ui/UpcomingEventCard';
import { PortfolioImage } from '@/components/ui/PortfolioImage';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => router.push('/settings')}
          >
            <Feather name="settings" size={24} color={COLORS.dark} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <LinearGradient
            colors={[
              'rgba(124,92,255,0.75)',
              'rgba(255,122,89,0.42)',
              'rgba(78,205,196,0.45)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.heroGradient}
          />

          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600' }}
              style={styles.avatar}
            />
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={24} color={COLORS.white} />
            </View>
          </View>

          <Text style={styles.name}>Maya Ben</Text>
          <Text style={styles.role}>Danseuse & chorégraphe</Text>

          <View style={styles.locationRow}>
            <Feather name="map-pin" size={17} color={COLORS.gray} />
            <Text style={styles.location}>Montréal, QC</Text>
          </View>

          <View style={styles.statsRow}>
            <ProfileStat value="2 318" label="Abonnés" icon="account-group" color={COLORS.purple} />
            <ProfileStat value="28" label="Événements" icon="calendar-star" color={COLORS.coral} />
            <ProfileStat value="15" label="Collabs" icon="handshake" color={COLORS.turquoise} />
          </View>

        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mes événements</Text>
          <Text style={styles.seeAll}>Voir tout ›</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventsRow}
        >
          {upcomingEvents.map((event) => (
            <UpcomingEventCard
              key={event.id}
              title={event.title}
              date={event.date}
              location={event.location}
              status={event.status}
              image={event.image}
            />
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Portfolio</Text>
          <Text style={styles.seeAll}>Voir tout ›</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.portfolioRow}
        >
          {portfolioImages.map((item) => (
            <PortfolioImage key={item.id} image={item.image} />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerActions: {
    paddingHorizontal: 20,
    paddingTop: 8,
    alignItems: 'flex-end',
  },
  circleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 5,
  },
  heroCard: {
    marginHorizontal: 20,
    marginTop: 14,
    borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.45)',
    alignItems: 'center',
    paddingBottom: 32,
  },
  heroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 210,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
  },
  avatarWrapper: {
    marginTop: 48,
    width: 156,
    height: 156,
    borderRadius: 78,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 146,
    height: 146,
    borderRadius: 73,
  },
  verifiedBadge: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.turquoise,
    borderWidth: 4,
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    marginTop: 24,
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.dark,
    letterSpacing: -1,
  },
  role: {
    marginTop: 4,
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.purple,
  },
  locationRow: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  location: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray,
  },
  statsRow: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 12,
  },
  sectionHeader: {
    marginTop: 26,
    paddingHorizontal: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: '900',
    color: COLORS.dark,
  },
  seeAll: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.purple,
  },
  eventsRow: {
    paddingHorizontal: 28,
    paddingTop: 16,
    gap: 14,
  },
  portfolioRow: {
    paddingHorizontal: 28,
    paddingTop: 16,
    gap: 12,
  },
});
