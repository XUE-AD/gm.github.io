const firebaseApp = firebase.initializeApp({
  apiKey: secrets.REACT_APP_FIREBASE_API_KEY,
  authDomain: secrets.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: secrets.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: secrets.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: secrets.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: secrets.REACT_APP_FIREBASE_APP_ID,
  measurementId: secrets.REACT_APP_FIREBASE_MEASUREMENT_ID
});
const auth = firebaseApp.auth();
