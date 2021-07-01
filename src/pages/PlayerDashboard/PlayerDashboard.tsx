import {
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonToolbar,
  IonMenuButton,
} from "@ionic/react";
import MeetGoal from "icons/MeetGoal";
import "./PlayerDashboard.css";

const PlayerDashboard: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="light">
        <IonButtons slot="start" className='menu-icon'>
          <IonMenuButton />
        </IonButtons>
        <IonRow className="ion-justify-content-center">
          <IonCol size="auto">
            <MeetGoal width={40} height={40} />
          </IonCol>
        </IonRow>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen className="ion-padding">hello word I'm sad cause a can't find the problem :'c</IonContent>
  </IonPage>
);

export default PlayerDashboard;
