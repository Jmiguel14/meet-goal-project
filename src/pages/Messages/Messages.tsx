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
import "./Messages.css";

const Messages: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar class="regresar">
        <IonButton slot="start" fill="clear">
          <IonIcon icon={arrowBackOutline} />
        </IonButton>
        <IonTitle>Mensajes</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen></IonContent>
  </IonPage>
);

export default Messages;
