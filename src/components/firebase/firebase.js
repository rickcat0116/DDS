import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAAtW3MWbxWMQtEDqQm2B3cNg8-ow9QfIw",
    authDomain: "fm-dds.firebaseapp.com",
    databaseURL: "https://fm-dds-default-rtdb.firebaseio.com",
    projectId: "fm-dds",
    storageBucket: "fm-dds.appspot.com",
    messagingSenderId: "726646467114",
    appId: "1:726646467114:web:fc6d84db34235e4d5c3153",
    measurementId: "G-MFEEK3GHV0"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 인증 서비스 초기화
const auth = getAuth(app);

// Realtime Database 초기화
const database = getDatabase(app);

export { auth, database };