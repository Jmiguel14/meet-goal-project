import {
  IonButton,
  IonCard,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { pencilOutline } from "ionicons/icons";
import styles from "./styles.module.css";
import MedalIcon from "icons/medalIcon.png";
import PlayerIcon from "icons/playerIcon.png";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { useAuth } from "contexts/AuthContext";
import { getUserDoc } from "firebase/client";
import SkillIcon from "icons/skillIcon.png";

interface ContainerProps {}

const TacticalInfo: React.FC<ContainerProps> = () => {
  const [datos, setDatos] = useState<
    firebase.firestore.DocumentData | undefined
  >();

  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setDatos);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);
  return (
    <>
      <IonCard className={styles.positional_data}>
        <IonItem className={styles.title}>
          <IonLabel>
            {datos?.pospri !== undefined ? datos?.pospri : "Posición Principal"}
          </IonLabel>
          <IonButton
            fill="clear"
            routerLink="/tabs/editar-info-tactica-jugador"
          >
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem className={styles.element}>
          <IonImg
            src={PlayerIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>
            {datos?.possec !== undefined
              ? datos?.possec
              : "Posición Secundaria"}
          </IonText>
        </IonItem>
        <IonItem className={styles.element}>
          <IonImg
            src={MedalIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>
            {datos?.goals !== undefined ? datos?.goals : "Logros"}
          </IonText>
        </IonItem>
      </IonCard>
      <IonCard className={styles.tactical_data}>
        <IonItem className={styles.title}>
          <IonLabel>Atributos</IonLabel>
          <IonButton
            fill="clear"
            routerLink="/tabs/editar-info-atributos-jugador"
          >
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem className={styles.element}>
          <IonImg
            src={SkillIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText className={styles.attribute}>
            {datos?.firstAttribute !== undefined
              ? datos?.firstAttribute
              : "Aquí se mostrarán tus atributos"}
          </IonText>
        </IonItem>
        <IonItem className={styles.element}>
          <IonImg
            src={SkillIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText className={styles.attribute}>
            {datos?.secondAttribute !== undefined
              ? datos?.secondAttribute
              : "Aquí se mostrarán tus atributos"}
          </IonText>
        </IonItem>
        <IonItem className={styles.element}>
          <IonImg
            src={SkillIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText className={styles.attribute}>
            {datos?.thirdAttribute !== undefined
              ? datos?.thirdAttribute
              : "Aquí se mostrarán tus atributos"}
          </IonText>
        </IonItem>
        <IonItem className={styles.element}>
          <IonImg
            src={SkillIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText className={styles.attribute}>
            {datos?.fourthAttribute !== undefined
              ? datos?.fourthAttribute
              : "Aquí se mostrarán tus atributos"}
          </IonText>
        </IonItem>
      </IonCard>
    </>
  );
};

export default TacticalInfo;
