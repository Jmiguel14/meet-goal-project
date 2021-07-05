import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
} from "@ionic/react";
import { PlayerInfo } from "components/PlayerInfo/PlayerInfo";
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
