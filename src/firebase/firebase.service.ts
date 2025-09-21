import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor() {
    if (!admin.apps.length) {
      // Properly handle the private key replacement
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(
        /\\n/g,
        '\n',
      );

      if (!privateKey) {
        throw new Error('FIREBASE_PRIVATE_KEY is not defined');
      }

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        }),
      });
    }
  }

  async sendNotification(token: string, title: string, body: string) {
    try {
      const message: admin.messaging.Message = {
        token,
        notification: { title, body },
      };

      return await admin.messaging().send(message);
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }
}
