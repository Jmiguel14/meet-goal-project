import {
  IonButton,
  IonCard,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { useAuth } from "contexts/AuthContext";
import {
  calendarOutline,
  callOutline,
  documentTextOutline,
  globeOutline,
  mail,
} from "ionicons/icons";
import "./PersonalInfo.css";
import React from "react";
import MailIcon from "icons/emailIcon.png";
import BirthdayIcon from "icons/birthdayIcon.png";
import ContractIcon from "icons/contractIcon.png";
import MarketIcon from "icons/marketIcon.png";
import TelephoneIcon from "icons/telephoneIcon.png";
interface ContainerProps {}

const PersonalInfo: React.FC<ContainerProps> = () => {
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
            <h1 className="info">Correo</h1>
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
            <h1 className="info">Teléfono</h1>
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
            <h1 className="info">Fec. de Nacimiento</h1>
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
            <h1 className="info">Est. Contractual</h1>
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
            <h1 className="info">MarketTransfer</h1>
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
