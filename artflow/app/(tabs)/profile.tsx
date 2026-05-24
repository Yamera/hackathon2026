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
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import { portfolioImages, profileTags, upcomingEvents } from '@/constants/profile-data';
import { ProfileStat } from '@/components/ui/ProfileStat';
import { ProfileTag } from '@/components/ui/ProfileTag';
import { UpcomingEventCard } from '@/components/ui/UpcomingEventCard';
import { PortfolioImage } from '@/components/ui/PortfolioImage';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.circleButton}>
            <Feather name="more-horizontal" size={25} color={COLORS.dark} />
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

          <View style={styles.buttonsRow}>
            <TouchableOpacity activeOpacity={0.85}>
              <LinearGradient
                colors={[COLORS.purple, COLORS.coral]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.primaryButton}
              >
                <Feather name="send" size={22} color={COLORS.white} />
                <Text style={styles.primaryButtonText}>Contacter</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} style={styles.secondaryButton}>
              <Feather name="bookmark" size={24} color={COLORS.dark} />
              <Text style={styles.secondaryButtonText}>Suivre</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.aboutCard}>
          <Text style={styles.aboutTitle}>À propos</Text>
          <Text style={styles.aboutText}>
            Danseuse contemporaine et chorégraphe basée à Montréal. Maya crée des pièces qui
            explorent le mouvement, l'émotion et la connexion humaine.
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsRow}
        >
          {profileTags.map((tag) => (
            <ProfileTag key={tag.id} label={tag.label} icon={tag.icon as any} color={tag.color} />
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Événements à venir</Text>
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
    backgroundColor: COLORS.cream,
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
  buttonsRow: {
    marginTop: 28,
    flexDirection: 'row',
    gap: 18,
  },
  primaryButton: {
    width: 154,
    height: 62,
    borderRadius: 31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: COLORS.purple,
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 6,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '900',
  },
  secondaryButton: {
    width: 142,
    height: 62,
    borderRadius: 31,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  secondaryButtonText: {
    color: COLORS.dark,
    fontSize: 18,
    fontWeight: '900',
  },
  aboutCard: {
    marginHorizontal: 28,
    marginTop: 22,
    borderRadius: 26,
    backgroundColor: COLORS.white,
    padding: 20,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  aboutTitle: {
    fontSize: 23,
    fontWeight: '900',
    color: COLORS.dark,
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    color: COLORS.dark,
  },
  tagsRow: {
    paddingHorizontal: 28,
    paddingTop: 20,
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
