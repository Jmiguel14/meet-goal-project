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
import { PlayerInfo } from "components/PlayerInfo/PlayerInfo";
import { arrowBackCircleOutline, arrowBackOutline } from "ionicons/icons";
import "./PlayerProfile.css";

const PlayerProfile: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar class="regresar">
        <IonButton slot="start" fill="clear">
          <IonIcon icon={arrowBackOutline} />
        </IonButton>
        <IonTitle>Perfil</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonImg
        class="portada"
        src="https://i.pinimg.com/originals/b5/7b/09/b57b09183ff3815986c2130808af06c1.jpg"
      ></IonImg>
      <PlayerInfo />
    </IonContent>
  </IonPage>
);

export default PlayerProfile;
