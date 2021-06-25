import {
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { addCircleOutline, medkitOutline, timeOutline } from "ionicons/icons";
import "./MedicalInfo.css";

interface ContainerProps {}

const MedicalInfo: React.FC<ContainerProps> = () => {
  return (
    <>
      <IonButton
        shape="round"
        expand="block"
        className="ion-padding-horizontal"
        routerLink="/agregar-lesiones-jugador"
      >
        <IonIcon icon={addCircleOutline}></IonIcon>
        Agregar informes medicos
      </IonButton>
      <IonCard>
        <IonItem class="titulo">
          <IonLabel>Lesion o enfermedad</IonLabel>
        </IonItem>
        <IonItem class="elemento">
          <IonIcon icon={timeOutline} slot="start"></IonIcon>
          <IonText>Tiempo de recuperacion</IonText>
        </IonItem>
        <IonItem class="elemento">
          <IonIcon icon={medkitOutline} slot="start"></IonIcon>
          <IonText>Operacion</IonText>
        </IonItem>
      </IonCard>
    </>
  );
};

export default MedicalInfo;
