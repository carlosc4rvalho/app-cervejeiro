import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDV96f2BtgkjYZKDPUFOw8Wiz-XxLQtDXI',
  authDomain: 'cervejeiro-bd0dc.firebaseapp.com',
  projectId: 'cervejeiro-bd0dc',
  storageBucket: 'cervejeiro-bd0dc.appspot.com',
  messagingSenderId: '698228839226',
  appId: '1:698228839226:web:e7cbc56691a18da26fb603',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
