import admin from 'firebase-admin';
import { config } from './env';

if (!admin.apps.length) {
  if (!config.firebase.projectId || !config.firebase.clientEmail || !config.firebase.privateKey) {
    throw new Error('Firebase environment variables are missing');
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.firebase.projectId,
      clientEmail: config.firebase.clientEmail,
      privateKey: config.firebase.privateKey,
    }),
  });

  console.log('🔥 Firebase Admin initialized');
}

export default admin;
