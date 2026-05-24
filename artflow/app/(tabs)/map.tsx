import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '@/constants/colors';
import { categories, mapPins, nearbyEvents } from '@/constants/map-data';
import { HeaderActionButton } from '@/components/ui/HeaderActionButton';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { MapPin } from '@/components/ui/MapPin';
import { MapPreviewCard } from '@/components/ui/MapPreviewCard';
import { NearbyEventCard } from '@/components/ui/NearbyEventCard';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.screen}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              Carte <Text style={styles.purple}>locale</Text>
            </Text>
            <Text style={styles.subtitle}>Découvre les artistes près de toi</Text>
          </View>
          <View style={styles.actions}>
            <HeaderActionButton type="search" />
            <HeaderActionButton type="filter" />
            <HeaderActionButton type="bell" badge={3} />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((cat) => (
            <CategoryChip
              key={cat.id}
              label={cat.label}
              icon={cat.icon as any}
              color={cat.color}
              active={cat.active}
            />
          ))}
        </ScrollView>

        <View style={styles.mapCard}>
          <ImageBackground
            source={{ uri: 'https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-73.587,45.52,12,0/900x650?access_token=VOTRE_TOKEN' }}
            style={styles.mapImage}
            imageStyle={styles.mapImageRadius}
          >
            <LinearGradient
              colors={[
                'rgba(255,248,239,0.45)',
                'rgba(255,248,239,0.72)',
                'rgba(255,248,239,0.42)',
              ]}
              style={[StyleSheet.absoluteFill, { borderRadius: 30 }]}
            />

            <Text style={[styles.areaLabel, { top: 98, left: 36 }]}>
              LE PLATEAU{'\n'}MONT-ROYAL
            </Text>
            <Text style={[styles.areaLabel, { top: 58, right: 52 }]}>
              ROSEMONT{'\n'}– LA PETITE-PATRIE
            </Text>
            <Text style={[styles.areaLabel, { bottom: 90, left: 28 }]}>MILE END</Text>
            <Text style={[styles.areaLabel, { bottom: 30, right: 150 }]}>VIEUX-MONTRÉAL</Text>

            <View style={styles.locationOuter}>
              <View style={styles.locationMid}>
                <View style={styles.locationDot} />
              </View>
            </View>

            {mapPins.map((pin) => (
              <MapPin
                key={pin.id}
                icon={pin.icon as any}
                color={pin.color}
                top={pin.top}
                left={pin.left}
              />
            ))}

            <TouchableOpacity style={styles.locationButton}>
              <Feather name="navigation" size={25} color={COLORS.gray} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.mapControl, { top: 260 }]}>
              <Feather name="plus" size={27} color={COLORS.gray} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.mapControl, { top: 333 }]}>
              <Feather name="crosshair" size={25} color={COLORS.gray} />
            </TouchableOpacity>

            <MapPreviewCard />
          </ImageBackground>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Événements à proximité <Text style={styles.purple}>✦</Text>
          </Text>
          <Text style={styles.seeAll}>Voir tout ›</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventsRow}
        >
          {nearbyEvents.map((event) => (
            <NearbyEventCard
              key={event.id}
              title={event.title}
              subtitle={event.subtitle}
              time={event.time}
              distance={event.distance}
              icon={event.icon as any}
              color={event.color}
              image={event.image}
            />
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
  screen: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 44,
    fontWeight: '900',
    letterSpacing: -1.4,
    color: COLORS.dark,
  },
  purple: {
    color: COLORS.purple,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 17,
    fontWeight: '500',
    color: COLORS.gray,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  categories: {
    paddingHorizontal: 18,
    paddingTop: 26,
    paddingBottom: 22,
    gap: 14,
  },
  mapCard: {
    marginHorizontal: 14,
    height: 432,
    borderRadius: 30,
    backgroundColor: '#F3EEE8',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 28,
    elevation: 6,
  },
  mapImage: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 30,
  },
  mapImageRadius: {
    borderRadius: 30,
  },
  areaLabel: {
    position: 'absolute',
    color: COLORS.coral,
    opacity: 0.8,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.6,
    lineHeight: 21,
  },
  locationOuter: {
    position: 'absolute',
    top: 168,
    left: 167,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(78,205,196,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(78,205,196,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationMid: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(78,205,196,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.turquoise,
    borderWidth: 6,
    borderColor: COLORS.white,
  },
  locationButton: {
    position: 'absolute',
    top: 32,
    right: 18,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(255,255,255,0.78)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  mapControl: {
    position: 'absolute',
    right: 18,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(255,255,255,0.78)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  sectionHeader: {
    marginTop: 28,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: COLORS.dark,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.4,
  },
  seeAll: {
    color: COLORS.purple,
    fontSize: 15,
    fontWeight: '800',
  },
  eventsRow: {
    paddingHorizontal: 18,
    paddingTop: 18,
    gap: 14,
  },
});
