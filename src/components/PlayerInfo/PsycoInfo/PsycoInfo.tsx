import {
  IonBadge,
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
import AttitudeIcon from "icons/attitudeIcon.png";
import PersonalityIcon from "icons/personalityIcon.png";
import CharacterIcon from "icons/characterIcon.png";
import { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { getUserDoc } from "firebase/client";
import firebase from "firebase/app";
import ValueIcon from "icons/valueIcon.png";

interface ContainerProps {}

const PsycoInfo: React.FC<ContainerProps> = () => {
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
      <IonCard className={styles.psycology_data}>
        <IonItem className={styles.title}>
          <IonLabel>Parámetros Psicológicos</IonLabel>
          <IonButton
            fill="clear"
            routerLink="/tabs/editar-info-psicologica-jugador"
          >
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem className={styles.data_psyco}>
          <IonImg
            src={CharacterIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className={styles.data_detail}>
              {datos?.character === undefined || datos?.character === ""
                ? "Carácter"
                : datos?.character}
            </h1>
          </IonLabel>
          <IonText className={styles.descripcion}>Carácter</IonText>
        </IonItem>
        <IonItem className={styles.container_personality}>
          <IonImg
            src={PersonalityIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked" className={styles.container_data}>
            {datos?.personality === undefined ||
            JSON.stringify(datos?.personality) === "{}" ? (
              <h1 className={styles.data_detail}>Personalidad</h1>
            ) : (
              <>
                <div>
                  <IonBadge color="primary" className={styles.data_style}>
                    {datos?.personality.detail1}
                  </IonBadge>
                  <IonBadge color="primary" className={styles.data_style}>
                    {datos?.personality.detail2}
                  </IonBadge>
                  <br />
                  <IonBadge color="primary" className={styles.data_style}>
                    {datos?.personality.detail3}
                  </IonBadge>
                  <IonBadge color="primary" className={styles.data_style}>
                    {datos?.personality.detail4}
                  </IonBadge>
                </div>
              </>
            )}
          </IonLabel>
          <IonText className={styles.descripcion}>Personalidad</IonText>
        </IonItem>
        <IonItem className={styles.data_psyco}>
          <IonImg
            src={AttitudeIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className={styles.data_detail}>
              {datos?.attitude === undefined || datos?.attitude === ""
                ? "Actitud"
                : datos?.attitude}
            </h1>
          </IonLabel>
          <IonText className={styles.descripcion}>Actitud</IonText>
        </IonItem>
      </IonCard>
      <IonCard className={styles.psycology_data}>
        <IonItem className={styles.title}>
          <IonLabel>Valores</IonLabel>
          <IonButton fill="clear" routerLink="/tabs/editar-valores-jugador">
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem>
          <IonImg
            src={ValueIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText className={styles.values}>
            {datos?.value1 !== undefined
              ? datos?.value1
              : "Aquí se mostrarán los valores seleccionados"}
          </IonText>
        </IonItem>
        <IonItem>
          <IonImg
            src={ValueIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText className={styles.values}>
            {datos?.value2 !== undefined
              ? datos?.value2
              : "Aquí se mostrarán los valores seleccionados"}
          </IonText>
        </IonItem>
        <IonItem>
          <IonImg
            src={ValueIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText className={styles.values}>
            {datos?.value3 !== undefined
              ? datos?.value3
              : "Aquí se mostrarán los valores seleccionados"}
          </IonText>
        </IonItem>
      </IonCard>
    </>
  );
};

export default PsycoInfo;
