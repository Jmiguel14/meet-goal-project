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
import { useEffect, useState } from "react";
import firebase from "firebase";
import styles from "./styles.module.css";
import { getNotificationDetails } from "firebase/notificationsServices";
import CongratPoster from "assets/CongratsPlayerAccepted.png";
import CallPoster from "assets/NewCallPoster.png";
import PostulationPoster from "assets/PostulationPoster.png";
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
          <IonLabel className={styles.title}>
            {notifyData?.title === NOTIFYTITLES.PLAYERACCEPTED
              ? `${notifyData?.title} del ${notifyData?.clubName}. Donde requiere un ${notifyData?.posRequired} de la categoria ${notifyData?.ageRequired}`
              : ""}
            {notifyData?.title === NOTIFYTITLES.NEWCALL
              ? `${notifyData?.title}`
              : ""}
            {notifyData?.title === NOTIFYTITLES.POSTULATION
              ? `${notifyData?.title}`
              : ""}
          </IonLabel>
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
        {notifyData?.title === NOTIFYTITLES.NEWCALL ? (
          <IonImg src={CallPoster} className="ion-padding-vertical"></IonImg>
        ) : (
          ""
        )}
        {notifyData?.title === NOTIFYTITLES.POSTULATION ? (
          <IonImg
            src={PostulationPoster}
            className="ion-padding-vertical"
          ></IonImg>
        ) : (
          ""
        )}
      </IonContent>
    </>
  );
};

export default NotificationModal;
