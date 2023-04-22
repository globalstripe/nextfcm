import React, { useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/messaging";
import { firebaseCloudMessaging } from "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";


// https://www.npmjs.com/package/react-toastify

function PushNotificationLayout({ children }) {

  const router = useRouter();

  useEffect( () => {
    console.log('Ran Use Effect in PushNotificationLayout')
    const resp = setToken();
    console.log('Back in PushNotificationLayout', resp)

    // Event listener that listens for the push notification event in the background
    // This if code checks if the browser supports service workers.
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("Event received by serviceWorker Listener");
        console.log(event.data);

       // console.log(event.data.firebaseMessaging.payload)
       // alert(JSON.stringify(event.data.firebaseMessaging.payload))
       // alert(event.data.firebaseMessaging.payload.notification.title 
       //   + "\n\n" 
       //   + event.data.firebaseMessaging.payload.notification.body
       //   + "\n\n" 
       //   + event.data.firebaseMessaging.payload.data.url
       //   )

          toast(
            <div onClick={() => handleClickPushNotification(event.data.firebaseMessaging.payload.data.url)}>
              <h5>{event.data.firebaseMessaging.payload.notification.title}</h5>
              <h6>{event.data.firebaseMessaging.payload.notification.body}</h6>
            </div>,
            {
                position: toast.POSITION.TOP_RIGHT,
                className: styles.toastmessage,
                closeOnClick: false,
            }
          );

      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        console.log('Try to initialise firebaseCloudMessaging')
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log("In setToken", token);
          getMessage();
        } else {
          console.log('Failed to Set Token')
        }
      } catch (error) {
        console.log(error);
      }
    }

  });

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url) => {
    router.push(url);
  };

  // Get the push notification message and triggers a toast to show it
  function getMessage() {
    const messaging = firebase.messaging();
    messaging.onMessage((message) => {
      toast(
        <div onClick={() => handleClickPushNotification(message?.data?.url)}>
          <h5>{message?.notification?.title}</h5>
          <h6>{message?.notification?.body}</h6>
        </div>,
        {
          closeOnClick: false,
        }
      );
    });
  }

  return (
    <>
      <ToastContainer
      className={styles.toastcontainer}
      autoClose={15000}
      pauseOnHover
      />
      {children}
    </>
  );
}

export default PushNotificationLayout;
