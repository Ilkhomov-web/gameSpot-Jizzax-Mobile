# GameSpot Jizzakh - Firebase Setup Instructions

## Important Notice

This project is built with **Expo and React Native**, but Firebase requires **native modules** that cannot be installed in the Bolt web environment.

You **MUST** export this project and set it up locally on your computer to make Firebase work.

---

## Step 1: Export the Project from Bolt

1. Click the **Export** button in Bolt
2. Download the project ZIP file
3. Extract it to your computer

---

## Step 2: Open the Project Locally

Open the project in your preferred code editor:
- **VS Code** (recommended)
- **Cursor**
- Any other code editor

---

## Step 3: Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

---

## Step 4: Install Firebase Packages

Run these commands to install Firebase:

```bash
npm install firebase
```

For native features (optional, if you need native Firebase services):

```bash
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
```

---

## Step 5: Update Firebase Configuration

Open `config/firebase.ts` and update the `appId`:

```typescript
export const firebaseConfig = {
  apiKey: "AIzaSyDjm55MSQY85rv5QWlkG39MuYzWf76fDGE",
  authDomain: "gamespot-jizzakh.firebaseapp.com",
  projectId: "gamespot-jizzakh",
  storageBucket: "gamespot-jizzakh.appspot.com",
  messagingSenderId: "1043381638849",
  appId: "1:1043381638849:web:YOUR_ACTUAL_APP_ID" // Replace this with your real app ID
};
```

To find your `appId`:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **gamespot-jizzakh**
3. Go to **Project Settings** (gear icon)
4. Scroll down to **Your apps**
5. Copy the **App ID** and paste it in the config file

---

## Step 6: Create Test User in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select **gamespot-jizzakh** project
3. Click **Authentication** in the left sidebar
4. Click **Get Started** (if not already enabled)
5. Click **Sign-in method** tab
6. Enable **Email/Password** authentication
7. Go to **Users** tab
8. Click **Add User**
9. Enter:
   - Email: `test@gamespot.uz`
   - Password: `test123`
10. Click **Add User**

---

## Step 7: Create Sample Gaming Rooms in Firestore

1. In Firebase Console, click **Firestore Database**
2. Click **Create Database**
3. Choose **Start in test mode** (for development)
4. Select a location (e.g., asia-southeast1)
5. Click **Start Collection**
6. Collection ID: `rooms`
7. Add a document with these fields:

### Document 1 (Premium Room):
```
Document ID: (Auto-generated)

Fields:
- name: "Cyber Arena Jizzakh"
- address: "Navoiy ko'chasi 12, Jizzakh"
- latitude: 40.1158
- longitude: 67.8422
- type: "PC"
- pricePerHour: 15000
- phone: "+998 93 123 45 67"
- isPremium: true (boolean)
- rating: 4.8 (number)
- description: "Premium gaming center with latest equipment"
```

### Document 2 (Regular Room):
```
Document ID: (Auto-generated)

Fields:
- name: "PlayStation Club"
- address: "O'zbekiston ko'chasi 45, Jizzakh"
- latitude: 40.1200
- longitude: 67.8500
- type: "PlayStation"
- pricePerHour: 12000
- phone: "+998 93 987 65 43"
- isPremium: false (boolean)
- rating: 4.5 (number)
- description: "PlayStation gaming room with comfortable seating"
```

---

## Step 8: Install React Native Maps (Optional)

To enable the map functionality:

```bash
npm install react-native-maps
npx expo install react-native-maps
```

---

## Step 9: Build and Run the App

### For Web:
```bash
npm run dev
```

### For iOS (Mac only):
```bash
npx expo prebuild
npx expo run:ios
```

### For Android:
```bash
npx expo prebuild
npx expo run:android
```

---

## Step 10: Test the App

1. Open the app
2. You should see the authentication overlay on the map
3. Click **Sign In**
4. Use the test credentials:
   - Email: `test@gamespot.uz`
   - Password: `test123`
5. After login, you should see:
   - Premium gaming rooms section
   - Map/List toggle
   - Gaming rooms data from Firestore

---

## Project Structure

```
project/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx          # Login screen
│   │   └── register.tsx       # Register screen
│   ├── (tabs)/
│   │   ├── _layout.tsx        # Tab navigation
│   │   ├── index.tsx          # Home screen with map
│   │   └── explore.tsx        # Explore all rooms
│   └── _layout.tsx            # Root layout with providers
├── components/
│   ├── AppHeader.tsx          # Header with logo and user menu
│   ├── AuthOverlay.tsx        # Blur overlay for non-authenticated users
│   ├── MapSettings.tsx        # Map/List toggle bar
│   ├── PremiumCard.tsx        # Premium room card
│   └── RoomsList.tsx          # List view of all rooms
├── contexts/
│   ├── AuthContext.tsx        # Firebase authentication context
│   └── RoomsContext.tsx       # Gaming rooms data context
├── config/
│   └── firebase.ts            # Firebase configuration
└── types/
    └── index.ts               # TypeScript types
```

---

## Features Implemented

✅ Firebase Authentication (Email/Password)
✅ Login & Register screens
✅ User menu with logout
✅ Premium gaming rooms section
✅ Map/List view toggle
✅ Blur overlay for unauthenticated users
✅ Firestore database integration
✅ Dark theme UI with purple gradients
✅ Responsive design
✅ Tab navigation

---

## Troubleshooting

### Firebase not initializing:
- Make sure you installed `firebase` package
- Check that your `appId` is correct in `config/firebase.ts`
- Verify Firebase project is active in console

### Authentication not working:
- Enable Email/Password authentication in Firebase Console
- Check that you created a test user
- Look at console logs for error messages

### Rooms not loading:
- Verify Firestore database is created
- Check that `rooms` collection exists with documents
- Make sure Firestore rules allow read access (test mode)

### Map not showing:
- Install `react-native-maps` package
- For native builds, run `npx expo prebuild`
- The web version won't show native maps

---

## Next Steps

1. Add real map implementation with React Native Maps
2. Implement room detail modal
3. Add filtering functionality
4. Add user profile management
5. Implement favorites/bookmarks
6. Add reviews and ratings system

---

## Support

If you encounter any issues:
1. Check the terminal for error messages
2. Review Firebase Console for configuration
3. Make sure all dependencies are installed
4. Try cleaning and rebuilding: `rm -rf node_modules && npm install`

Good luck! 🎮
