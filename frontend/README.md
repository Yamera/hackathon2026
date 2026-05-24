# ArtLoop Frontend

Application mobile Expo Router et React Native du prototype ArtLoop.

## Dossiers

- `src/app` contient les ecrans et routes Expo Router.
- `src/components` contient les composants visuels reutilisables.
- `src/services` contient les acces Firestore du clavardage.
- `src/config/firebase.ts` initialise Firebase cote application.
- `src/data` et `src/constants` conservent les donnees locales de demonstration.

## Demarrage

```powershell
npm install
Copy-Item .env.example .env.local
npx expo start
```

## Firebase

Le chat se connecte a Firestore en temps reel et utilise une session anonyme. Les regles de securite et la configuration de deploiement Firebase sont conservees dans `../backend`.
