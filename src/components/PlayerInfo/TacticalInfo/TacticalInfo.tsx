import {
  IonButton,
  IonCard,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { pencilOutline } from "ionicons/icons";
import "./TacticalInfo.css";
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
      <IonCard className="datos-posicionales">
        <IonItem className="titulo">
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
        <IonItem className="elemento">
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
        <IonItem className="elemento">
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
      <IonCard className="datos-tacticos">
        <IonItem className="titulo">
          <IonLabel>Atributos</IonLabel>
          <IonButton
            fill="clear"
            routerLink="/tabs/editar-info-atributos-jugador"
          >
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem>
          <IonImg
            src={SkillIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText className="atributos">
            {datos?.firstAttribute !== undefined
              ? datos?.firstAttribute
              : "Aquí se mostrarán tus atributos"}
          </IonText>
        </IonItem>
        <IonItem>
          <IonImg
            src={SkillIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText className="atributos">
            {datos?.secondAttribute !== undefined
              ? datos?.secondAttribute
              : "Aquí se mostrarán tus atributos"}
          </IonText>
        </IonItem>
        <IonItem>
          <IonImg
            src={SkillIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText className="atributos">
            {datos?.thirdAttribute !== undefined
              ? datos?.thirdAttribute
              : "Aquí se mostrarán tus atributos"}
          </IonText>
        </IonItem>
        <IonItem>
          <IonImg
            src={SkillIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText className="atributos">
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
