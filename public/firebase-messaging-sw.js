
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');


firebase.initializeApp({
apiKey: "AIzaSyCFKfOEsVeZudq3Z-CrbKeyAgbGnadgvcs",
  authDomain: "notificacao-tridi-v3.firebaseapp.com",
  projectId: "notificacao-tridi-v3",
  storageBucket: "notificacao-tridi-v3.firebasestorage.app",
  messagingSenderId: "352090104712",
  appId: "1:352090104712:web:d12cb6c17990d912be503d",
  measurementId: "G-9470CCH7CR"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});