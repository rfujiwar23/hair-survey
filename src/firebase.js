import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBSwx61032g3gy74F_w3u4zSzYYwHLwrtE",
    authDomain: "kevin-murphy-survey.firebaseapp.com",
    projectId: "kevin-murphy-survey",
    storageBucket: "kevin-murphy-survey.appspot.com",
    messagingSenderId: "1058304283025",
    appId: "1:1058304283025:web:f834c60a63b97b1eee0a30",
    measurementId: "G-JP4PV8LPBV"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export default db;