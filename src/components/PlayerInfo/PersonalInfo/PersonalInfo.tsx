import {
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import {
  calendarOutline,
  callOutline,
  documentTextOutline,
  globeOutline,
  mail,
} from "ionicons/icons";
import "./PersonalInfo.css";

interface ContainerProps {}

const PersonalInfo: React.FC<ContainerProps> = () => {
  return (
    <>
      <IonCard className="cajas">
        <IonItem>
          <IonIcon icon={mail} slot="start" />
          <IonLabel position="stacked" className="info">
            Correo
          </IonLabel>
          <IonText className="texto">Correo</IonText>
        </IonItem>
      </IonCard>
      <IonCard className="cajas">
        <IonItem>
          <IonIcon icon={callOutline} slot="start" />
          <IonLabel position="stacked" className="info">
            Telefono
          </IonLabel>
          <IonText className="texto">Telefono</IonText>
        </IonItem>
      </IonCard>
      <IonCard className="cajas">
        <IonItem>
          <IonIcon icon={calendarOutline} slot="start" />
          <IonLabel position="stacked" className="info">
            Fecha de Nacimiento
          </IonLabel>
          <IonText className="texto">Fecha de Nacimiento</IonText>
        </IonItem>
      </IonCard>
      <IonCard className="cajas">
        <IonItem>
          <IonIcon icon={documentTextOutline} slot="start" />
          <IonLabel position="stacked" className="info">
            Estado Contractual
          </IonLabel>
          <IonText className="texto">Estado contractual</IonText>
        </IonItem>
      </IonCard>
      <IonCard className="cajas">
        <IonItem>
          <IonIcon icon={globeOutline} slot="start" />
          <IonLabel position="stacked" className="info">
            Link MarketTransfer
          </IonLabel>
          <IonText className="texto">Link MarketTransfer</IonText>
        </IonItem>
      </IonCard>
      <IonButton
        size="default"
        shape="round"
        expand="full"
        className="ion-padding-horizontal"
        routerLink="/editar-info-personal-jugador"
      >
        Editar
      </IonButton>
    </>
  );
};

export default PersonalInfo;
