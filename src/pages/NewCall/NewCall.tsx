import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router";
import styles from "./styles.module.css";

const NewCall: React.FC = () => {
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
              <IonTitle>Nueva Convocatoria</IonTitle>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.back}></IonContent>
    </IonPage>
  );
};
export default NewCall;
