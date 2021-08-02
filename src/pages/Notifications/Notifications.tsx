import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
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
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/tabs/panel-noticias"
              className={styles.icon_back}
            />
          </IonButtons>
          <IonTitle>Notificaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider color="primary">
          <div className={styles.title_divider}>Mis Notificaciones</div>
        </IonItemDivider>
        {notificationList?.length === 0 ? (
          <div className={styles.container_message}>
            <IonLabel className={styles.message_not_found}>
              Aún no registra ninguna notificación
            </IonLabel>
          </div>
        ) : (
          notificationList?.map((notification: any, index: number) =>
            !notification.isSeen ? (
              <IonCard key={index} className={styles.back}>
                <IonItem
                  className={styles.details}
                  onClick={() => passNotificationId(notification.id)}
                >
                  <IonLabel>
                    <h1 className={styles.data}>{`${notification.title}`}</h1>
                  </IonLabel>
                  <IonText className={styles.date}>{`${converterDate(
                    notification.createdAt
                  )}`}</IonText>
                </IonItem>
              </IonCard>
            ) : (
              ""
            )
          )
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
