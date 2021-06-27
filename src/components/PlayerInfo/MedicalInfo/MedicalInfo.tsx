import {
  IonButton,
  IonCard,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { addCircleOutline, medkitOutline, timeOutline } from "ionicons/icons";
import "./MedicalInfo.css";
import SurgeryIcon from "icons/SurgeryIcon.png";
import RecoveryTimeIcon from "icons/recoveryTimeIcon.png";

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
      <IonCard className="datos-medicos">
        <IonItem className="titulo">
          <IonLabel>Lesion o enfermedad</IonLabel>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={RecoveryTimeIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>Tiempo de recuperacion</IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={SurgeryIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>Operacion</IonText>
        </IonItem>
      </IonCard>
    </>
  );
};

export default MedicalInfo;
