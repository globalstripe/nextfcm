import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {
      // Initialize the Firebase app with the credentials
      firebase?.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
      });

      try {
        const messaging = firebase.messaging();
        console.log('Firebase Util')
        console.log(messaging)
        console.log('Get Token from localforage')
        console.log('In our case we would store and fetch this from the UMS')
        console.log('In web - this is specific to the browser')
        console.log('So a user could have multiple tokens')
        console.log('Would it make sense for this to be an array')
        const tokenInLocalForage = await localforage.getItem("fcm_token");
   

        // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          console.log('Got token from local storage')
          console.log('Local Storage fcm_token', tokenInLocalForage)
          return tokenInLocalForage;
        } else {
          console.log('No token in local storage')
          console.log('Request it from Firebase')
        }

       
        // Request the push notification permission from browser
        console.log("Requestion Notification Permission:")
        const status = await Notification.requestPermission();
        console.log('Request Permission Status:', status)
        alert("Notification Permission: " + status)
        // this returns demied cos
        // The Notification API may no longer be used from insecure origins
        if (status && status === "granted") {
          // Get new token from Firebase
          const fcm_token = await messaging.getToken({
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY,
          });

          console.log('FCMToken:', fcm_token)

          // Set token in our local storage
          if (fcm_token) {
            localforage.setItem("fcm_token", fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };
