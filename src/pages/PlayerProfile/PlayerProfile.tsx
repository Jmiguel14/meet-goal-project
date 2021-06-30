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
  IonRow,
  IonCol,
} from "@ionic/react";
import { PlayerInfo } from "components/PlayerInfo/PlayerInfo";
import { arrowBackCircleOutline, arrowBackOutline } from "ionicons/icons";
import "./PlayerProfile.css";

const PlayerProfile: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar className="regresar">
        <IonButtons slot="start">
          <IonBackButton
            defaultHref="/tabs/inicio-jugador"
            className="icon-back"
          />
        </IonButtons>
        <IonRow className="title">
          <IonCol size="auto">
            <IonTitle>UserName</IonTitle>
          </IonCol>
        </IonRow>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <PlayerInfo />
    </IonContent>
  </IonPage>
);

export default PlayerProfile;
