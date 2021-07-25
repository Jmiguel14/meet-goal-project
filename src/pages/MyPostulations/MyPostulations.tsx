import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Routes } from "constants/routes";
import { arrowBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import firebase from "firebase/app";
import { useAuth } from "contexts/AuthContext";
import { getMyCallsPostulated } from "firebase/postulationsServices";
import { converterDate } from "utils/converterDate";

const MyPostulations = () => {
  const { currentUser } = useAuth();
  const [postulations, setPostulations] =
    useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    const unsubscribe = getMyCallsPostulated(currentUser.uid, setPostulations);
    return () => unsubscribe && unsubscribe();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles.back}>
          <IonButtons slot="start">
            <IonButton
              fill="clear"
              className={styles.icon_back}
              routerLink={Routes.DASHBOARD}
            >
              <IonIcon icon={arrowBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonRow className={styles.title}>
            <IonCol size="auto">
              <IonTitle>Mis Postulaciones</IonTitle>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {postulations?.length === 0 ? (
          <div className={styles.container_message}>
            <IonLabel className={styles.message_not_found}>
              Aún no registra ninguna postulación
            </IonLabel>
          </div>
        ) : (
          ""
        )}
        {postulations?.map((call: any, key: any) => (
          <IonCard key={key} className={styles.back}>
            <IonCardTitle
              className={styles.title_calls_details}
            >{`POSICIÓN: ${call.posRequired}`}</IonCardTitle>
            <IonItem className={styles.calls_details}>
              <IonLabel position="stacked">
                <h1
                  className={styles.calls_data}
                >{`Cat: ${call.ageRequired}`}</h1>
              </IonLabel>
              <IonText
                className={styles.end_date}
              >{`F. de Cierre: ${converterDate(call.endDate)}`}</IonText>
            </IonItem>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default MyPostulations;
