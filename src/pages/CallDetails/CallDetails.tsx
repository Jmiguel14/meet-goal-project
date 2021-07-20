import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
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
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";
import { useAuth } from "contexts/AuthContext";
import { firestore } from "firebase/client";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { COLLECTIONS } from "constants/collections";
import { getACallData, getOwnCallData } from "firebase/callServices";

const CallDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const { currentUser } = useAuth();
  const [callData, setCallData] = useState<firebase.firestore.DocumentData>();
  const [clubData, setClubData] = useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    const unsubscribe = getACallData(id, (data) => {
      setCallData(data);
    });
  }, [id]);

  useEffect(() => {
    const unsubscribe = getOwnCallData(currentUser.uid, (data) => {
      setClubData(data);
    });
  }, [callData]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles.back}>
          <IonButtons slot="start">
            <IonButton
              fill="clear"
              className={styles.icon_back}
              routerLink="/tabs/convocatorias-creadas"
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
