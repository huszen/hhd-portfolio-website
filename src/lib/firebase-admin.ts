// src/lib/firebase-admin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

function getAdminCredentials() {
  const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountRaw) {
    throw new Error('Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable');
  }

  const serviceAccount = JSON.parse(serviceAccountRaw);

  return {
    projectId: serviceAccount.project_id,
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key ? serviceAccount.private_key.replace(/\\n/g, '\n') : undefined,
  };
}

if (!getApps().length) {
  initializeApp({
    credential: cert(getAdminCredentials()),
  });
}

export const adminAuth = getAuth();
