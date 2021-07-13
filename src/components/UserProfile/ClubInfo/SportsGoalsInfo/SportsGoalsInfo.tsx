import {
  IonButton,
  IonCard,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import styles from "./styles.module.css";
import React from "react";
import Trophy from "icons/trophy.png";
import { useAuth } from "contexts/AuthContext";
interface ContainerProps {}

const SportsGoalsInfo: React.FC<ContainerProps> = () => {
  const { data } = useAuth();
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
              {data?.nationalWins !== undefined
                ? data?.nationalWins
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
              {data?.internationalWins !== undefined
                ? data?.internationalWins
                : "Máximo Logro"}
            </h1>
          </IonLabel>
          <IonText className={styles.text}>
            Logro máximo internacionalmente
          </IonText>
        </IonItem>
      </IonCard>
      <IonButton
        size="default"
        shape="round"
        expand="full"
        className="ion-padding-horizontal"
        routerLink="/tabs/editar-logros-institutionales-club"
      >
        Editar
      </IonButton>
    </>
  );
};

export default SportsGoalsInfo;
