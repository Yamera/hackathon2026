import React, { useCallback, useRef, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker, Region } from 'react-native-maps';
import { COLORS } from '@/constants/colors';
import { categories, mapPins, nearbyEvents } from '@/constants/map-data';
import { HeaderActionButton } from '@/components/ui/HeaderActionButton';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { MapPin } from '@/components/ui/MapPin';
import { MapPreviewCard } from '@/components/ui/MapPreviewCard';
import { NearbyEventCard } from '@/components/ui/NearbyEventCard';
import { SearchInput } from '@/components/ui/SearchInput';

const INITIAL_REGION: Region = {
  latitude: 45.515,
  longitude: -73.575,
  latitudeDelta: 0.07,
  longitudeDelta: 0.05,
};

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  const handleRecenter = useCallback(() => {
    mapRef.current?.animateToRegion(INITIAL_REGION, 500);
    setRegion(INITIAL_REGION);
  }, []);

  const handleZoomIn = useCallback(() => {
    const nextRegion: Region = {
      ...region,
      latitudeDelta: Math.max(region.latitudeDelta * 0.7, 0.005),
      longitudeDelta: Math.max(region.longitudeDelta * 0.7, 0.005),
    };
    mapRef.current?.animateToRegion(nextRegion, 400);
    setRegion(nextRegion);
  }, [region]);

  const handleZoomOut = useCallback(() => {
    const nextRegion: Region = {
      ...region,
      latitudeDelta: Math.min(region.latitudeDelta * 1.3, 1.2),
      longitudeDelta: Math.min(region.longitudeDelta * 1.3, 1.2),
    };
    mapRef.current?.animateToRegion(nextRegion, 400);
    setRegion(nextRegion);
  }, [region]);

  const handleMarkerPress = useCallback((pinId: string, hasPreview: boolean) => {
    if (!hasPreview) {
      return;
    }
    setActivePreviewId((current) => (current === pinId ? null : pinId));
  }, []);

  const handleFilterSelect = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setActivePreviewId(null);
  }, []);

  const activePreviewPin = mapPins.find(
    (pin) => pin.id === activePreviewId && pin.preview,
  );
  const filteredPins =
    activeCategory === 'all'
      ? mapPins
      : mapPins.filter((pin) => pin.category === activeCategory);

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
            <HeaderActionButton
              type="filter"
              onPress={() => setFiltersOpen((current) => !current)}
            />
          </View>
        </View>
        {!isMapExpanded ? (
          <View style={styles.mapCard}>
            <View style={styles.mapImage}>
              <MapView
                ref={mapRef}
                style={styles.mapView}
                initialRegion={INITIAL_REGION}
                onRegionChangeComplete={(nextRegion) => setRegion(nextRegion)}
                showsCompass={false}
                showsUserLocation={false}
                onPress={() => setActivePreviewId(null)}
              >
                {filteredPins.map((pin) => (
                  <Marker
                    key={pin.id}
                    coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
                    tracksViewChanges={false}
                    onPress={(event) => {
                      event.stopPropagation?.();
                      handleMarkerPress(pin.id, Boolean(pin.preview));
                    }}
                  >
                    <MapPin icon={pin.icon as any} color={pin.color} absolute={false} />
                  </Marker>
                ))}
              </MapView>

              <LinearGradient
                colors={[
                  'rgba(255,248,239,0.2)',
                  'rgba(255,248,239,0.35)',
                  'rgba(255,248,239,0.25)',
                ]}
                style={[StyleSheet.absoluteFill, { borderRadius: 30 }]}
                pointerEvents="none"
              />

              <TouchableOpacity
                style={styles.mapExpandButton}
                onPress={() => setIsMapExpanded(true)}
              >
                <Feather name="maximize-2" size={20} color={COLORS.dark} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.locationButton} onPress={handleRecenter}>
                <Feather name="navigation" size={25} color={COLORS.gray} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.mapControl, styles.mapControlNormal, { top: 120 }]}
                onPress={handleZoomIn}
              >
                <Feather name="plus" size={27} color={COLORS.gray} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.mapControl, styles.mapControlNormal, { top: 195 }]}
                onPress={handleZoomOut}
              >
                <Feather name="minus" size={27} color={COLORS.gray} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.mapControl, styles.mapControlNormal, { top: 270 }]}
                onPress={handleRecenter}
              >
                <Feather name="crosshair" size={25} color={COLORS.gray} />
              </TouchableOpacity>

              {activePreviewPin?.preview ? (
                <MapPreviewCard
                  title={activePreviewPin.preview.title}
                  category={activePreviewPin.preview.category}
                  distance={activePreviewPin.preview.distance}
                  time={activePreviewPin.preview.time}
                  image={activePreviewPin.preview.image}
                />
              ) : null}
            </View>
          </View>
        ) : null}

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

      {isMapExpanded ? (
        <View style={styles.mapExpandedOverlay}>
          <View style={styles.mapExpandedSurface}>
            <MapView
              ref={mapRef}
              style={styles.mapView}
              initialRegion={INITIAL_REGION}
              onRegionChangeComplete={(nextRegion) => setRegion(nextRegion)}
              showsCompass={false}
              showsUserLocation={false}
              onPress={() => setActivePreviewId(null)}
            >
              {filteredPins.map((pin) => (
                <Marker
                  key={pin.id}
                  coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
                  tracksViewChanges={false}
                  onPress={(event) => {
                    event.stopPropagation?.();
                    handleMarkerPress(pin.id, Boolean(pin.preview));
                  }}
                >
                  <MapPin icon={pin.icon as any} color={pin.color} absolute={false} />
                </Marker>
              ))}
            </MapView>

            <LinearGradient
              colors={[
                'rgba(255,248,239,0.15)',
                'rgba(255,248,239,0.28)',
                'rgba(255,248,239,0.18)',
              ]}
              style={[StyleSheet.absoluteFill, { borderRadius: 0 }]}
              pointerEvents="none"
            />

            <TouchableOpacity
              style={[styles.mapExpandButton, styles.mapExpandButtonExpanded]}
              onPress={() => setIsMapExpanded(false)}
            >
              <Feather name="minimize-2" size={20} color={COLORS.dark} />
            </TouchableOpacity>

            <View style={styles.mapFilterButton}>
              <HeaderActionButton
                type="filter"
                onPress={() => setFiltersOpen((current) => !current)}
              />
            </View>

            <TouchableOpacity
              style={[styles.locationButton, styles.locationButtonExpanded]}
              onPress={handleRecenter}
            >
              <Feather name="navigation" size={25} color={COLORS.gray} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mapControl, styles.mapControlExpanded, { top: 220 }]}
              onPress={handleZoomIn}
            >
              <Feather name="plus" size={27} color={COLORS.gray} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mapControl, styles.mapControlExpanded, { top: 300 }]}
              onPress={handleZoomOut}
            >
              <Feather name="minus" size={27} color={COLORS.gray} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mapControl, styles.mapControlExpanded, { top: 380 }]}
              onPress={handleRecenter}
            >
              <Feather name="crosshair" size={25} color={COLORS.gray} />
            </TouchableOpacity>

            {activePreviewPin?.preview ? (
              <MapPreviewCard
                title={activePreviewPin.preview.title}
                category={activePreviewPin.preview.category}
                distance={activePreviewPin.preview.distance}
                time={activePreviewPin.preview.time}
                image={activePreviewPin.preview.image}
                containerStyle={styles.mapPreviewExpanded}
              />
            ) : null}
          </View>
        </View>
      ) : null}

      {filtersOpen ? (
        <View style={styles.filtersOverlay} pointerEvents="box-none">
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setFiltersOpen(false)} />
          <View style={styles.filtersCard}>
            <View style={styles.filtersHeader}>
              <Text style={styles.filtersTitle}>Filtres</Text>
              <TouchableOpacity onPress={() => setFiltersOpen(false)}>
                <Text style={styles.filtersClose}>Fermer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.filtersSearch}>
              <SearchInput />
            </View>
            <View style={styles.filtersChips}>
              {categories.map((cat) => (
                <CategoryChip
                  key={cat.id}
                  label={cat.label}
                  icon={cat.icon as any}
                  color={cat.color}
                  active={activeCategory === cat.id}
                  onPress={() => handleFilterSelect(cat.id)}
                />
              ))}
            </View>
          </View>
        </View>
      ) : null}
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
  mapCard: {
    marginHorizontal: 14,
    marginTop: 16,
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
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  mapExpandButton: {
    position: 'absolute',
    top: 32,
    left: 18,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.88)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  mapExpandButtonExpanded: {
    top: 62,
  },
  mapExpandedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.cream,
    zIndex: 20,
  },
  mapExpandedSurface: {
    flex: 1,
  },
  mapFilterButton: {
    position: 'absolute',
    top: 62,
    right: 18,
  },
  mapPreviewExpanded: {
    bottom: 120,
  },
  locationButton: {
    position: 'absolute',
    top: 44,
    right: 24,
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
  mapControlNormal: {
    right: 24,
  },
  locationButtonExpanded: {
    top: 140,
    right: 18,
  },
  mapControlExpanded: {
    right: 18,
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
  filtersOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    zIndex: 30,
  },
  filtersCard: {
    marginTop: 120,
    marginHorizontal: 16,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    padding: 16,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 8,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  filtersTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.dark,
  },
  filtersClose: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.purple,
  },
  filtersChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  filtersSearch: {
    marginTop: 6,
    marginBottom: 12,
  },
});
