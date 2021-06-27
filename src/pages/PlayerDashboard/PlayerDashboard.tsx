import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import MeetGoal from "icons/MeetGoal";
import "./PlayerDashboard.css";

const PlayerDashboard: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="light">
        <IonRow className='ion-justify-content-center'>
          <IonCol size="auto">
            <MeetGoal width={40} height={40} />
          </IonCol>
        </IonRow>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen className="ion-padding"></IonContent>
  </IonPage>
);

export default PlayerDashboard;
