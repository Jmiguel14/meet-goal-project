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
import "./PsycoInfo.css";
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
      <IonCard className="datos-psicologicos">
        <IonItem className="titulo">
          <IonLabel>Parámetros Psicológicos</IonLabel>
          <IonButton
            fill="clear"
            routerLink="/tabs/editar-info-psicologica-jugador"
          >
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem className="dato-psyco">
          <IonImg
            src={CharacterIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className="detalle-dato">
              {datos?.character !== undefined ? datos?.character : "Carácter"}
            </h1>
          </IonLabel>
          <IonText className="descripcion">Carácter</IonText>
        </IonItem>
        <IonItem className="dato-psyco">
          <IonImg
            src={PersonalityIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className="detalle-dato">
              {datos?.personality !== undefined
                ? datos?.personality
                : "Personalidad"}
            </h1>
          </IonLabel>
          <IonText className="descripcion">Personalidad</IonText>
        </IonItem>
        <IonItem className="dato-psyco">
          <IonImg
            src={AttitudeIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className="detalle-dato">
              {datos?.attitude !== undefined ? datos?.attitude : "Actitud"}
            </h1>
          </IonLabel>
          <IonText className="descripcion">Actitud</IonText>
        </IonItem>
      </IonCard>
      <IonCard className="datos-psicologicos">
        <IonItem className="titulo">
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
          <IonText className="valores">
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
          <IonText className="valores">
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
          <IonText className="valores">
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
