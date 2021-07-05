import {
  IonButton,
  IonCard,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import "./PersonalInfo.css";
import React, { useEffect, useState } from "react";
import MailIcon from "icons/emailIcon.png";
import BirthdayIcon from "icons/birthdayIcon.png";
import ContractIcon from "icons/contractIcon.png";
import MarketIcon from "icons/marketIcon.png";
import TelephoneIcon from "icons/telephoneIcon.png";
import firebase from "firebase/app";
import { useAuth } from "contexts/AuthContext";
import { getUserDoc } from "firebase/client";
interface ContainerProps {}

const PersonalInfo: React.FC<ContainerProps> = () => {
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
      <IonCard className="cajas">
        <IonItem>
          <IonImg
            src={MailIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className="info">
              {datos?.email !== undefined ? datos?.email : "Correo"}
            </h1>
          </IonLabel>
          <IonText className="texto">Correo</IonText>
        </IonItem>
      </IonCard>
      <IonCard className="cajas">
        <IonItem>
          <IonImg
            src={TelephoneIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className="info">
              {datos?.phone !== undefined ? datos?.phone : "Teléfono"}
            </h1>
          </IonLabel>
          <IonText className="texto">Teléfono</IonText>
        </IonItem>
      </IonCard>
      <IonCard className="cajas">
        <IonItem>
          <IonImg
            src={BirthdayIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className="info">
              {datos?.birth !== undefined ? datos?.birth : "F. de Nacimiento"}
            </h1>
          </IonLabel>
          <IonText className="texto">Fecha de Nacimiento</IonText>
        </IonItem>
      </IonCard>
      <IonCard className="cajas">
        <IonItem>
          <IonImg
            src={ContractIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className="info">
              {datos?.contract !== undefined
                ? datos?.contract
                : "Est. Contractual"}
            </h1>
          </IonLabel>
          <IonText className="texto">Estado contractual</IonText>
        </IonItem>
      </IonCard>
      <IonCard className="cajas">
        <IonItem>
          <IonImg
            src={MarketIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className="info">
              {datos?.market !== undefined ? datos?.market : "MarketTransfer"}
            </h1>
          </IonLabel>
          <IonText className="texto">Link MarketTransfer</IonText>
        </IonItem>
      </IonCard>
      <IonButton
        size="default"
        shape="round"
        expand="full"
        className="ion-padding-horizontal"
        routerLink="/tabs/editar-info-personal-jugador"
      >
        Editar
      </IonButton>
    </>
  );
};

export default PersonalInfo;
