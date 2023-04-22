import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {
      // Initialize the Firebase app with the credentials
      firebase?.initializeApp({
        apiKey: "AIzaSyDlzzzr8EpH7x9Kv3zE3bKaU3d3G7cK2YY",
        authDomain: "livescores-c375c.firebaseapp.com",
        databaseURL: "https://livescores-c375c.firebaseio.com",
        projectId: "livescores-c375c",
        storageBucket: "livescores-c375c.appspot.com",
        messagingSenderId: "219365098522",
        appId: "1:219365098522:web:ee827e71a84d6686bbfda3",
        measurementId: "G-6QY628TVTX",
        //vapidKey: "BIyVUWeDndD-yCZSzVzG7H7Mgs4YrMntH_yOVy4t-8b_uGLTZtFOCRwATkV1-ufajy1BC9AJER-THGDD0Mw4SdA"
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
            vapidKey: "BIyVUWeDndD-yCZSzVzG7H7Mgs4YrMntH_yOVy4t-8b_uGLTZtFOCRwATkV1-ufajy1BC9AJER-THGDD0Mw4SdA",
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
