import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import MeetGoal from "icons/MeetGoal";
import "./PlayerDashboard.css";

const PlayerDashboard: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar class="titulo-inicial">
        <IonButton fill="clear">
          <MeetGoal width={52} heigth={52} />
        </IonButton>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen className="ion-padding"></IonContent>
  </IonPage>
);

export default PlayerDashboard;
