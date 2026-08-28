import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

if (process.env.FIREBASE_PROJECT_ID) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log('?? Firebase Admin initialized successfully.');
  } catch (error) {
    console.error('?? Firebase initialization error:', error);
  }
} else {
  console.log('?? Firebase credentials not found. Firebase Admin not initialized.');
}

export const db = admin.apps.length ? admin.firestore() : null;
