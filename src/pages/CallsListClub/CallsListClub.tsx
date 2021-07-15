import {
  IonButton,
  IonButtons,
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
import { useState } from "react";
import { useHistory } from "react-router";
import { NewCallDataForm } from "types";
import styles from "./styles.module.css";
import { firestore } from "firebase/client";
import { COLLECTIONS } from "constants/collections";
import { useAuth } from "contexts/AuthContext";

const CallsListClub: React.FC = () => {
  const history = useHistory();
  const { currentUser } = useAuth();
  const [callsList, setCallList] = useState<NewCallDataForm[]>([]);

  const getMyCallsData = async () => {
    let id = currentUser.uid;
    try {
      let calls: NewCallDataForm[] = [];
      const res = await firestore
        .collection(COLLECTIONS.CALLS)
        .where("clubId", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let obj = {
              id: doc.id,
              clubId: doc.data().clubId,
              ageRequired: doc.data().ageRequired,
              posRequired: doc.data().posRequired,
              startDate: doc.data().startDate,
              endDate: doc.data().endDate,
              postulatedPlayers: doc.data().postulatedPlayers,
              extraDetails: doc.data().extraDetails,
            };
            calls.push(obj);
          });
          setCallList(calls);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useIonViewWillEnter(() => {
    getMyCallsData();
  });

  function backHome() {
    history.push("/tabs/inicio-jugador");
  }
  function converterDate(date: string) {
    let birth = date.split("T");
    return birth[0];
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
        <IonItemDivider color="primary" className={styles.container_divider}>
          <div className={styles.title_divider}>
            Listado de las convocatorias creadas
          </div>
        </IonItemDivider>
        {callsList.map((call) => (
          <IonItem key={call.id} className={styles.calls_details}>
            <IonLabel position="stacked">
              <h1
                className={styles.calls_data}
              >{`CAT: ${call.ageRequired} | POS: ${call.posRequired}`}</h1>
            </IonLabel>
            <IonText
              className={styles.end_date}
            >{`F. de Cierre: ${converterDate(call.endDate)}`}</IonText>
            <IonButton slot="end" fill="clear" size="small" color="tertiary">
              Ver
            </IonButton>
          </IonItem>
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
