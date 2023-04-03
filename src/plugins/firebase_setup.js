// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyA6iazB11dgTAsgyXchbxUjLKcK4WWPUFk',
	authDomain: 'sample-bot-382605.firebaseapp.com',
	projectId: 'sample-bot-382605',
	storageBucket: 'sample-bot-382605.appspot.com',
	messagingSenderId: '598386644683',
	appId: '1:598386644683:web:22bfc93b4da915194aad4e',
	measurementId: 'G-LPHB3R627Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default getFirestore();
