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
import { useAuth } from "contexts/AuthContext";
import SkillIcon from "icons/skillIcon.png";
import { useParams } from "react-router";

interface ContainerProps {}

const TacticalInfo = () => {
  const { data, currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <IonCard className={styles.positional_data}>
        <IonItem className={styles.title}>
          <IonLabel>
            {data?.pospri !== undefined ? data?.pospri : "Posición Principal"}
          </IonLabel>
          {currentUser.uid === id ? (
            <IonButton
              fill="clear"
              routerLink="/tabs/editar-info-tactica-jugador"
            >
              <IonIcon icon={pencilOutline} />
            </IonButton>
          ) : (
            ""
          )}
        </IonItem>
        <IonItem className={styles.element}>
          <IonImg
            src={PlayerIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>
            {data?.possec !== undefined ? data?.possec : "Posición Secundaria"}
          </IonText>
        </IonItem>
        <IonItem className={styles.element}>
          <IonImg
            src={MedalIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>
            {data?.goals !== undefined ? data?.goals : "Logros"}
          </IonText>
        </IonItem>
      </IonCard>
      <IonCard className={styles.tactical_data}>
        <IonItem className={styles.title}>
          <IonLabel>Atributos</IonLabel>
          {currentUser.uid === id ? (
            <IonButton
              fill="clear"
              routerLink="/tabs/editar-info-atributos-jugador"
            >
              <IonIcon icon={pencilOutline} />
            </IonButton>
          ) : (
            ""
          )}
        </IonItem>
        <IonItem className={styles.element}>
          <IonImg
            src={SkillIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText className={styles.attribute}>
            {data?.firstAttribute !== undefined
              ? data?.firstAttribute
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
            {data?.secondAttribute !== undefined
              ? data?.secondAttribute
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
            {data?.thirdAttribute !== undefined
              ? data?.thirdAttribute
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
            {data?.fourthAttribute !== undefined
              ? data?.fourthAttribute
              : "Aquí se mostrarán tus atributos"}
          </IonText>
        </IonItem>
      </IonCard>
    </>
  );
};

export default TacticalInfo;
