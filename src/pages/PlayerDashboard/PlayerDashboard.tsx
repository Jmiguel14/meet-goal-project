import {
  IonApp,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import MeetGoal from "icons/MeetGoal";
import "./PlayerDashboard.css";

const PlayerDashboard: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="light">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" className="icon-back" />
        </IonButtons>
        <IonRow>
          <IonCol size="auto" className="icon-header">
            <MeetGoal width={40} height={40} />
          </IonCol>
        </IonRow>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen className="ion-padding"></IonContent>
  </IonPage>
);

export default PlayerDashboard;
