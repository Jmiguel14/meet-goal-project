import {
  IonBackButton,
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
import { PlayerInfo } from "components/PlayerInfo/PlayerInfo";
import { arrowBackCircleOutline, arrowBackOutline } from "ionicons/icons";
import "./PlayerProfile.css";

const PlayerProfile: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar class="regresar">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/perfil-jugador" className="icon-back" />
        </IonButtons>
        <IonTitle>Perfil</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <PlayerInfo />
    </IonContent>
  </IonPage>
);

export default PlayerProfile;
