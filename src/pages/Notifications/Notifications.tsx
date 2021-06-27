import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import "./Notifications.css";

const Notifications: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar class="regresar">
        <IonButton slot="start" fill="clear">
          <IonIcon icon={arrowBackOutline} />
        </IonButton>
        <IonTitle>Notificaciones</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen></IonContent>
  </IonPage>
);

export default Notifications;
