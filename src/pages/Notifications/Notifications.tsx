import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import {
  getUserNotifications,
  updateNotificationState,
} from "firebase/notificationsServices";
import { converterDate } from "utils/converterDate";
import NotificationModal from "components/NotificationModal/NotificationModal";
import NotificationPoster from "assets/notificationPoster.svg";
import NotificationIcon from "icons/Notification.png";
import { notifications } from "ionicons/icons";
import { NOTIFYTITLES } from "constants/notificationsTitles";

const Notifications: React.FC = () => {
  const [notificationList, setNotificationList] =
    useState<firebase.firestore.DocumentData>();
  const [notifyId, setNotifyId] = useState("");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const unsubscribe = getUserNotifications(setNotificationList);
    return () => unsubscribe && unsubscribe();
  }, []);

  function passNotificationId(id: string) {
    setNotifyId(id);
    try {
      updateNotificationState(id);
      setShowModal(true);
    } catch (e) {
      setShowModal(false);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles.back}>
          <IonTitle>Notificaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider color="primary">
          <div className={styles.title_divider}>Mis Notificaciones</div>
        </IonItemDivider>
        {notificationList?.length === 0 ? (
          <div className={styles.container_message}>
            <img src={NotificationPoster} className="ion-padding"></img>
            <IonLabel className={styles.message_not_found}>
              Aún no registra ninguna notificación
            </IonLabel>
          </div>
        ) : (
          notificationList?.map((notification: any, index: number) => (
            <IonCard key={index} className={styles.back}>
              <IonItem
                className={styles.details}
                onClick={() => passNotificationId(notification.id)}
              >
                <IonIcon
                  icon={notifications}
                  size="medium"
                  color={notification.isSeen === false ? "primary" : "medium"}
                ></IonIcon>
                <IonLabel>
                  <h1
                    className={
                      notification.isSeen === false
                        ? styles.data_not_seen
                        : styles.data_seen
                    }
                  >
                    {notification.title === NOTIFYTITLES.PLAYERACCEPTED
                      ? `${notification.title} por el club ${notification.clubName}`
                      : ""}
                    {notification.title === NOTIFYTITLES.NEWCALL
                      ? `${notification.title} Requieres un  ${notification.posRequired}`
                      : ""}
                    {notification.title === NOTIFYTITLES.POSTULATION
                      ? `${notification.title} del ${notification.clubName}`
                      : ""}
                  </h1>
                </IonLabel>
                <IonText className={styles.date}>{`${converterDate(
                  notification.createdAt
                )}`}</IonText>
              </IonItem>
            </IonCard>
          ))
        )}
        <IonModal isOpen={showModal}>
          {notifyId !== "" || notifyId !== undefined ? (
            <NotificationModal id={notifyId}></NotificationModal>
          ) : (
            ""
          )}
          <IonButton onClick={() => setShowModal(false)}>Cerrar</IonButton>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Notifications;
