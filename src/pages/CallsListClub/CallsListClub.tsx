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
} from "@ionic/react";
import { add, arrowBack } from "ionicons/icons";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import { getCallsData } from "firebase/callServices";
import { converterDate } from "utils/converterDate";
import { Routes } from "constants/routes";

const CallsListClub: React.FC = () => {
  const [callsList, setCallList] = useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    const unsubscribe = getCallsData(setCallList);
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
            >{`POSICIÓN: ${call.posRequired}`}</IonCardTitle>
            <IonItem className={styles.calls_details}>
              <IonLabel position="stacked">
                <h1
                  className={styles.calls_data}
                >{`Cat: ${call.ageRequired}`}</h1>
              </IonLabel>
              <IonText className={styles.end_date}>
                {call.isClosed === true
                  ? "CERRADA"
                  : `F. de Cierre: ${converterDate(call.endDate)}`}
              </IonText>
              <IonButton slot="end" fill="clear" size="small" color="tertiary">
                <Link to={`/tabs/convocatoria/${call.id}`}>Ver</Link>
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
