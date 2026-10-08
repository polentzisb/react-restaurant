const environment = import.meta.env;
const firebaseConfig = {
  apiKey: environment.VITE_FIREBASE_API_KEY,
  authDomain: environment.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: environment.VITE_FIREBASE_PROJECT_ID,
  storageBucket: environment.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: environment.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: environment.VITE_FIREBASE_APP_ID,
};

export const isContactConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
let databasePromise;

async function getDatabase() {
  if (!databasePromise) {
    databasePromise = Promise.all([import('firebase/app'), import('firebase/firestore/lite')])
      .then(([{ initializeApp, getApps, getApp }, { getFirestore }]) => getFirestore(getApps().length ? getApp() : initializeApp(firebaseConfig)))
      .catch((error) => { databasePromise = undefined; throw error; });
  }
  return databasePromise;
}

export async function sendMessage({ name, email, message }) {
  if (!isContactConfigured) throw new Error('El formulario no está configurado.');
  const db = await getDatabase();
  const { collection, addDoc, serverTimestamp } = await import('firebase/firestore/lite');
  await addDoc(collection(db, 'messages'), {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    createdAt: serverTimestamp(),
  });
}
