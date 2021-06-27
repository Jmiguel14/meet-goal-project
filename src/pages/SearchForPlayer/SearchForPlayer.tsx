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
import "./SearchForPlayer.css";

const SearchForPlayer: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar class="regresar">
        <IonButton slot="start" fill="clear">
          <IonIcon icon={arrowBackOutline} />
        </IonButton>
        <IonTitle>Búsqueda</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen></IonContent>
  </IonPage>
);

export default SearchForPlayer;
