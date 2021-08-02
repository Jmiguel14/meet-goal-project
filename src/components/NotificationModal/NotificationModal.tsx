import {
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import styles from "./styles.module.css";
import { getNotificationDetails } from "firebase/notificationsServices";
import CongratPoster from "assets/CongratsPlayerAccepted.png";
import { NOTIFYTITLES } from "constants/notificationsTitles";

export interface props {
  id: string;
}

const NotificationModal = (props: props) => {
  const { id } = props;
  const [notifyData, setNotifyData] =
    useState<firebase.firestore.DocumentData>();
  useEffect(() => {
    const unsubscribe = getNotificationDetails(id, (data) => {
      setNotifyData(data);
    });
    return () => unsubscribe && unsubscribe();
  }, [id]);
  return (
    <>
      <IonHeader>
        <IonToolbar className={styles.back}>
          <IonTitle> Detalles de la notificación </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.back_modal}>
        <IonItem className={styles.back} lines="none">
          <IonLabel className={styles.title}>{notifyData?.title}</IonLabel>
        </IonItem>
        <IonItem className={styles.back} lines="none">
          <IonLabel position="stacked" className={styles.field}>
            Mensaje
          </IonLabel>
          <IonText className={styles.message}>
            {notifyData?.notification}
          </IonText>
        </IonItem>
        {notifyData?.title === NOTIFYTITLES.PLAYERACCEPTED ? (
          <IonImg src={CongratPoster} className="ion-padding-vertical"></IonImg>
        ) : (
          ""
        )}
      </IonContent>
    </>
  );
};

export default NotificationModal;
