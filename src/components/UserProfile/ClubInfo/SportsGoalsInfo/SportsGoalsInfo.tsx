import {
  IonButton,
  IonCard,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import styles from "./styles.module.css";
import Trophy from "icons/trophy.png";
import { useAuth } from "contexts/AuthContext";
import { useParams } from "react-router";

const SportsGoalsInfo = () => {
  const { data, currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <IonCard className={styles.boxes}>
        <IonItem>
          <IonImg
            src={Trophy}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className={styles.info}>
              {data?.totalWins !== undefined
                ? data?.totalWins
                : "Premios Totales"}
            </h1>
          </IonLabel>
          <IonText className={styles.text}>
            Campeonatos y torneos ganados
          </IonText>
        </IonItem>
      </IonCard>

      <IonCard className={styles.boxes}>
        <IonItem>
          <IonImg
            src={Trophy}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className={styles.info}>
              {data?.maxNacGoal !== undefined
                ? data?.maxNacGoal
                : "Máximo Logro"}
            </h1>
          </IonLabel>
          <IonText className={styles.text}>Logro máximo nacionalmente</IonText>
        </IonItem>
      </IonCard>

      <IonCard className={styles.boxes}>
        <IonItem>
          <IonImg
            src={Trophy}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className={styles.info}>
              {data?.maxIntGoal !== undefined
                ? data?.maxIntGoal
                : "Máximo Logro"}
            </h1>
          </IonLabel>
          <IonText className={styles.text}>
            Logro máximo internacionalmente
          </IonText>
        </IonItem>
      </IonCard>
      {currentUser.uid === id ? (
        <IonButton
          size="default"
          shape="round"
          expand="full"
          className="ion-padding-horizontal"
          routerLink="/tabs/editar-logros-institucionales-club"
        >
          Editar
        </IonButton>
      ) : (
        ""
      )}
    </>
  );
};

export default SportsGoalsInfo;
