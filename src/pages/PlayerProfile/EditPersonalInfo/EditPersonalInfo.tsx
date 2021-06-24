import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBackCircleOutline, arrowBackOutline } from "ionicons/icons";
import "./EditPersonalInfo.css";

const EditPersonalInfo: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar class="regresar">
        <IonButton slot="start" fill="clear">
          <IonIcon icon={arrowBackOutline} />
        </IonButton>
        <IonTitle class="titulo">Editar Información Personal</IonTitle>
        <IonButton fill="clear" slot="end">
          Guardar
        </IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen></IonContent>
  </IonPage>
);

export default EditPersonalInfo;
