# Quick Firebase Setup Guide

## Firebase Configuration Already Included ✅

Your Firebase configuration is already in the project:
- **Project ID**: gamespot-jizzakh
- **Config file**: `config/firebase.ts`

---

## What You Need to Do

### 1. Install Firebase Locally

After exporting this project, run:

```bash
npm install firebase
```

### 2. Get Your App ID

The config file needs your actual Firebase App ID. Here's how to get it:

1. Visit: https://console.firebase.google.com/
2. Select: **gamespot-jizzakh**
3. Click: ⚙️ **Project Settings**
4. Scroll to: **Your apps** section
5. Copy the **App ID** (looks like: `1:1043381638849:web:abc123def456`)
6. Replace `YOUR_APP_ID` in `config/firebase.ts`

### 3. Enable Authentication

1. In Firebase Console, click **Authentication**
2. Click **Get Started**
3. Click **Sign-in method** tab
4. Enable **Email/Password**
5. Click **Save**

### 4. Create a Test User

1. Go to **Users** tab
2. Click **Add User**
3. Email: `test@gamespot.uz`
4. Password: `test123`
5. Click **Add User**

### 5. Set Up Firestore Database

1. Click **Firestore Database**
2. Click **Create Database**
3. Select **Test mode** (for now)
4. Choose location: **asia-southeast1** or closest to you
5. Click **Enable**

### 6. Add Sample Data

Create a collection called `rooms` with this sample document:

```javascript
{
  name: "Cyber Arena Jizzakh",
  address: "Navoiy ko'chasi 12, Jizzakh",
  latitude: 40.1158,
  longitude: 67.8422,
  type: "PC",
  pricePerHour: 15000,
  phone: "+998 93 123 45 67",
  isPremium: true,
  rating: 4.8,
  description: "Premium gaming center"
}
```

---

## Run the App

```bash
npm run dev
```

Then test:
- Login with: `test@gamespot.uz` / `test123`
- View gaming rooms
- Toggle between Map and List view

---

## That's It! 🎮

Your app is now connected to Firebase with:
- ✅ Authentication
- ✅ Firestore database
- ✅ User management
- ✅ Gaming rooms data

For detailed instructions, see `SETUP_INSTRUCTIONS.md`
