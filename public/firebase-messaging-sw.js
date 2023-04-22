importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDlzzzr8EpH7x9Kv3zE3bKaU3d3G7cK2YY",
  authDomain: "livescores-c375c.firebaseapp.com",
  databaseURL: "https://livescores-c375c.firebaseio.com",
  projectId: "livescores-c375c",
  storageBucket: "livescores-c375c.appspot.com",
  messagingSenderId: "219365098522",
  appId: "1:219365098522:web:ee827e71a84d6686bbfda3",
  measurementId: "G-6QY628TVTX"
});

const messaging = firebase.messaging();
