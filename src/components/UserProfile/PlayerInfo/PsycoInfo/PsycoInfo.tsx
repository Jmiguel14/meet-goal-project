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
  const { data } = useAuth();
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
              {data?.character === undefined || data?.character === ""
                ? "Carácter"
                : data?.character}
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
            {data?.personality === undefined ||
            JSON.stringify(data?.personality) === "{}" ? (
              <h1 className={styles.data_detail}>Personalidad</h1>
            ) : (
              <>
                <div>
                  <IonBadge color="primary" className={styles.data_style}>
                    {data?.personality.detail1}
                  </IonBadge>
                  <IonBadge color="primary" className={styles.data_style}>
                    {data?.personality.detail2}
                  </IonBadge>
                  <br />
                  <IonBadge color="primary" className={styles.data_style}>
                    {data?.personality.detail3}
                  </IonBadge>
                  <IonBadge color="primary" className={styles.data_style}>
                    {data?.personality.detail4}
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
              {data?.attitude === undefined || data?.attitude === ""
                ? "Actitud"
                : data?.attitude}
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
            {data?.value1 !== undefined
              ? data?.value1
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
            {data?.value2 !== undefined
              ? data?.value2
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
            {data?.value3 !== undefined
              ? data?.value3
              : "Aquí se mostrarán los valores seleccionados"}
          </IonText>
        </IonItem>
      </IonCard>
    </>
  );
};

export default PsycoInfo;
