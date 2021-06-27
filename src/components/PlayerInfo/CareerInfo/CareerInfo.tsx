import {
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import {
  addCircleOutline,
  barChartOutline,
  speedometerOutline,
} from "ionicons/icons";
import "./CareerInfo.css";

interface ContainerProps {}

const CareerInfo: React.FC<ContainerProps> = () => {
  return (
    <>
      <IonButton
        shape="round"
        expand="block"
        className="ion-padding-horizontal"
        href="/agregar-experiencia"
      >
        <IonIcon icon={addCircleOutline}></IonIcon>
        Agregar club a tu experiencia
      </IonButton>
      <IonCard class="caja">
        <IonItem class="titulo">
          <IonLabel>ClubName</IonLabel>
        </IonItem>
        <IonItem class="elemento">
          <IonText>Pais - Año de Temporada</IonText>
        </IonItem>
        <IonCard class="elemento">
          <IonItem>
            <IonIcon icon={barChartOutline} slot="start"></IonIcon>
            <IonText>Categoria</IonText>
          </IonItem>
          <IonItem>
            <IonIcon icon={speedometerOutline} slot="start"></IonIcon>
            <IonText>Nivel</IonText>
          </IonItem>
        </IonCard>
      </IonCard>
    </>
  );
};

export default CareerInfo;
