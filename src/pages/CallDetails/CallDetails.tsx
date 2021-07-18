import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";
import styles from "./styles.module.css";
import Avatar from "icons/avatar.png";
import { useParams } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { firestore, getCallCreator, getCallData } from "firebase/client";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { COLLECTIONS } from "constants/collections";

const CallDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const { currentUser } = useAuth();
  const [callData, setCallData] = useState<firebase.firestore.DocumentData>();
  const [clubData, setClubData] = useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    const res = firestore.collection(COLLECTIONS.CALLS).doc(id);
    res.get().then((doc) => {
      if (doc.exists) {
        setCallData(doc.data());
      }
    });
  }, [id]);

  useEffect(() => {
    const res = firestore.collection(COLLECTIONS.USERS).doc(callData?.clubId);
    res.get().then((doc) => {
      if (doc.exists) {
        setClubData(doc.data());
      }
    });
  }, [callData]);

  function backHome() {
    history.push("/tabs/convocatorias-creadas");
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
              <IonTitle>Convocatoria</IonTitle>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className={styles.club_container}>
          <IonItem className={styles.title_club}>
            <IonLabel>
              <h1 className={styles.title_club_details}>
                Detalles de la Convocatoria
              </h1>
            </IonLabel>
          </IonItem>
          <IonItem lines="none" className={styles.info_club}>
            <IonAvatar slot="start" className={styles.avatar}>
              {" "}
              <img src={clubData?.avatarURL}></img>
            </IonAvatar>
            <IonLabel position="stacked">
              <h1
                className={styles.club_name}
              >{`${clubData?.city}/${clubData?.country}`}</h1>
            </IonLabel>
            <IonText className={styles.club_location}>{clubData?.name}</IonText>
          </IonItem>
          <IonItemDivider color="primary">
            <div className={styles.request}>Requerimos</div>
          </IonItemDivider>
          <IonItem className={styles.position_container} lines="none">
            <IonLabel position="stacked">
              <h1 className={styles.position_desc}>Posición</h1>
            </IonLabel>
            <IonText className={styles.position_data}>
              {callData?.posRequired}
            </IonText>
          </IonItem>
          <IonItem lines="none" className={styles.age_container}>
            <IonLabel position="stacked">
              <h1 className={styles.age_desc}>Edad</h1>
            </IonLabel>
            <IonText className={styles.age_data}>
              {callData?.ageRequired}
            </IonText>
          </IonItem>
          <IonItem lines="none" className={styles.extra_container}>
            <IonLabel position="stacked">
              <h1 className={styles.extra_desc}>Información extra</h1>
            </IonLabel>
            <IonText className={styles.extra_data}>
              {callData?.extraDetails}
            </IonText>
          </IonItem>
        </IonCard>
        <IonItemDivider color="primary">
          <div className={styles.request}>Futbolistas Postulantes</div>
        </IonItemDivider>
        <IonItem>Futbolista 1</IonItem>
      </IonContent>
    </IonPage>
  );
};
export default CallDetails;
