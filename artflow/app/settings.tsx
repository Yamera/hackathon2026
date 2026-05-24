import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';

type SettingItem = {
  id: string;
  label: string;
  description?: string;
};

const SETTINGS: SettingItem[] = [
  { id: 'account', label: 'Compte', description: 'Profil, sécurité, mot de passe' },
  { id: 'add-event', label: 'Ajouter un événement', description: 'Publier un nouvel événement' },
  { id: 'privacy', label: 'Confidentialité', description: 'Visibilité, blocages, permissions' },
  { id: 'collab', label: 'Créer une collab', description: 'Lancer un projet collaboratif' },
  { id: 'delete-chat', label: 'Supprimer une conversation', description: 'Gérer vos discussions' },
  { id: 'help', label: 'Aide', description: 'Support, FAQ, contact' },
  { id: 'about', label: 'À propos', description: 'Version, mentions légales' },
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={COLORS.dark} />
        </TouchableOpacity>
        <Text style={styles.title}>Réglages</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {SETTINGS.map((item) => (
          <TouchableOpacity key={item.id} style={styles.row} activeOpacity={0.85}>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>{item.label}</Text>
              {item.description ? (
                <Text style={styles.rowDescription}>{item.description}</Text>
              ) : null}
            </View>
            <Feather name="chevron-right" size={22} color={COLORS.gray} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.dark,
  },
  headerSpacer: {
    width: 46,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    gap: 12,
  },
  row: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: COLORS.dark,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 3,
  },
  rowText: {
    flex: 1,
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.dark,
  },
  rowDescription: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
  },
});
