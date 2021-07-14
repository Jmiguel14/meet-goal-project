import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import firebase from "firebase/app";
import { getUserDoc } from "firebase/client";
import { useHistory } from "react-router";
import { arrowBack } from "ionicons/icons";
import UserProfile from "components/UserProfile/UserProfile";

const UserProfilePage: React.FC = () => {
  const { data } = useAuth();
  const history = useHistory();

  function backHome() {
    history.push("/tabs/inicio-jugador");
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles.back}>
          <IonButtons slot="start">
            <IonButton
              fill="clear"
              className={styles.icon_back}
              onClick={backHome}
            >
              <IonIcon icon={arrowBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonRow className={styles.title}>
            <IonCol size="auto">
              <IonTitle>{data?.name}</IonTitle>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <UserProfile />
      </IonContent>
    </IonPage>
  );
};
export default UserProfilePage;
