import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
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
import { add, arrowBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { NewCallDataForm } from "types";
import styles from "./styles.module.css";
import { firestore } from "firebase/client";
import { COLLECTIONS } from "constants/collections";
import { useAuth } from "contexts/AuthContext";
import firebase from "firebase/app";
import { getMyCallsData } from "firebase/client";

const CallsListClub: React.FC = () => {
  const history = useHistory();
  const { currentUser } = useAuth();
  const [callsList, setCallList] = useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    const unsubscribe = getMyCallsData(setCallList);
    //return () => unsubscribe && unsubscribe()
  }, []);

  function backHome() {
    history.push("/tabs/inicio-jugador");
  }
  function converterDate(date: firebase.firestore.Timestamp) {
    let convertDate = date.toDate();
    let newDate = `${convertDate.getUTCDate()} / ${
      convertDate.getUTCMonth() + 1
    } / ${convertDate.getUTCFullYear()}`;
    return newDate;
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
              <IonTitle>Mis Convocatorias</IonTitle>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider color="primary">
          <div className={styles.title_divider}>
            Listado de las convocatorias creadas
          </div>
        </IonItemDivider>
        {callsList?.map((call: any, key: any) => (
          <IonCard key={key} className={styles.back}>
            <IonCardTitle
              className={styles.title_calls_details}
            >{`CATEGORÍA: ${call.ageRequired}`}</IonCardTitle>
            <IonItem className={styles.calls_details}>
              <IonLabel position="stacked">
                <h1
                  className={styles.calls_data}
                >{`POSICIÓN: ${call.posRequired}`}</h1>
              </IonLabel>
              <IonText
                className={styles.end_date}
              >{`F. de Cierre: ${converterDate(call.endDate)}`}</IonText>
              <IonButton slot="end" fill="clear" size="small" color="tertiary">
                Ver
              </IonButton>
            </IonItem>
          </IonCard>
        ))}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/tabs/nueva-convocatoria">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};
export default CallsListClub;
