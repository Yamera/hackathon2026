# ArtLoop

Prototype hackathon d'une application Expo qui met en relation des utilisateurs et des artistes. Le depot separe maintenant l'application mobile de l'infrastructure/backend minimal.

## Structure

```text
.
|-- frontend/
|   |-- src/
|   |   |-- app/          # Ecrans et routes Expo Router
|   |   |-- components/   # Composants UI
|   |   |-- config/       # Configuration cliente Firebase
|   |   |-- constants/    # Donnees et constantes de presentation
|   |   |-- data/         # Donnees locales de demonstration
|   |   |-- services/     # Acces Firestore du clavardage
|   |   `-- assets/
|   |-- .env.example
|   `-- package.json
|-- backend/
|   |-- src/server.js     # API Node minimale et route de sante
|   |-- firestore.rules   # Regles d'acces au clavardage
|   |-- firebase.json
|   |-- .env.example
|   `-- package.json
|-- .gitignore
`-- README.md
```

Expo Router reconnait officiellement `src/app`, donc les routes restent organisees selon le routage fichiers d'Expo plutot que dans un dossier `pages`.

## Architecture

- Les artistes, evenements, filtres et contenus de feed restent locaux dans le frontend pour la demo.
- Le clavardage utilise Firebase Authentication anonyme et Cloud Firestore directement depuis l'application Expo afin de recevoir les messages en temps reel.
- Le dossier `backend` contient les regles Firebase deploiees et un petit serveur Node extensible. Il ne duplique pas les donnees locales et ne sert pas de proxy inutile devant Firestore.

## Lancer Le Frontend

```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
npx expo start
```

La copie de `.env.example` est recommandee pour configurer Firebase explicitement. La configuration de demonstration reste disponible comme valeur de repli afin de faciliter le lancement du prototype.

## Lancer Le Backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm start
```

Le serveur ecoute par defaut sur `http://localhost:4000`. Verification rapide :

```powershell
Invoke-RestMethod http://localhost:4000/health
```

## Configurer Firebase

1. Dans Firebase Authentication, activer le fournisseur `Anonymous`.
2. Creer une base Cloud Firestore en mode Standard.
3. Publier [backend/firestore.rules](backend/firestore.rules) dans la console Firebase ou la deployer :

```powershell
cd backend
npx firebase-tools login
npm run firebase:deploy-rules
```

Les variables `EXPO_PUBLIC_FIREBASE_*` se trouvent dans [frontend/.env.example](frontend/.env.example). Elles configurent le client Firebase; la protection des donnees est assuree par l'authentification et les regles Firestore.
