import {
    IonButton,
    IonCard,
    IonCardHeader,
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
        <IonCard class="cajas">
          <IonItem>
            <IonIcon icon={mail} slot="start" />
            <IonLabel position="stacked" class="etiqueta">Correo</IonLabel>
            <IonText class="texto">Correo</IonText>
          </IonItem>
        </IonCard>
        <IonCard class="cajas">
          <IonItem>
            <IonIcon icon={callOutline} slot="start" />
            <IonLabel position="stacked" class="etiqueta">Telefono</IonLabel>
            <IonText class="texto">Telefono</IonText>
          </IonItem>
        </IonCard>
        <IonCard class="cajas">
          <IonItem>
            <IonIcon icon={calendarOutline} slot="start" />
            <IonLabel position="stacked" class="etiqueta">Fecha de Nacimiento</IonLabel>
            <IonText class="texto">Fecha de Nacimiento</IonText>
          </IonItem>
        </IonCard>
        <IonCard class="cajas">
          <IonItem>
            <IonIcon icon={documentTextOutline} slot="start" />
            <IonLabel position="stacked" class="etiqueta">Estado Contractual</IonLabel>
            <IonText class="texto">Estado contractual</IonText>
          </IonItem>
        </IonCard>
        <IonCard class="cajas">
          <IonItem>
            <IonIcon icon={globeOutline} slot="start" />
            <IonLabel position="stacked" class="etiqueta">Link MarketTransfer</IonLabel>
            <IonText class="texto">Link MarketTransfer</IonText>
          </IonItem>
        </IonCard>
        <IonButton
          size="default"
          shape="round"
          expand="full"
          className="ion-padding-horizontal"
        >
          Editar
        </IonButton>
      </>
    );
  };
  
  export default PersonalInfo;
  