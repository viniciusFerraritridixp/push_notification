// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
 apiKey: "AIzaSyCFKfOEsVeZudq3Z-CrbKeyAgbGnadgvcs",
  authDomain: "notificacao-tridi-v3.firebaseapp.com",
  projectId: "notificacao-tridi-v3",
  storageBucket: "notificacao-tridi-v3.firebasestorage.app",
  messagingSenderId: "352090104712",
  appId: "1:352090104712:web:d12cb6c17990d912be503d",
  measurementId: "G-9470CCH7CR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);
  if (permission === 'granted') { 
     const token = await getToken(messaging, 
    { vapidKey: 'BA4xmbZViJnEq_qYCEVhsHLbhKjin9FGJK3ALQQRxwndDIzcXU4mC4EE3NxEfa0dCHxWBeb2uTudXJJqDOlKJWA' }
  );
  console.log(token);
};
  }
 
export const getFcmToken = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'BA4xmbZViJnEq_qYCEVhsHLbhKjin9FGJK3ALQQRxwndDIzcXU4mC4EE3NxEfa0dCHxWBeb2uTudXJJqDOlKJWA' });
    return currentToken;
  } catch (err) {
    console.error('Erro ao obter token FCM:', err);
    return null;
  }
}
 