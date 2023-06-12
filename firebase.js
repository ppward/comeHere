import { initializeApp } from 'firebase/app';
import { getAuth ,signInWithEmailAndPassword} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDKh2OlCH3rXcL_W5PokwjbazZvQunwljw",
  authDomain: "comehere-ab06a.firebaseapp.com",
  projectId: "comehere-ab06a",
  storageBucket: "comehere-ab06a.appspot.com",
  messagingSenderId: "721321240189",
  appId: "1:721321240189:web:5f7da3c2cd7bdb35c47314"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

