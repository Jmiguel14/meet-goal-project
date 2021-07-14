import {
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonToolbar,
  IonMenuButton,
  IonIcon,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { useAuth } from "contexts/AuthContext";
import MeetGoal from "icons/MeetGoal";
import "./Dashboard.css";
import {
  add,
  addCircle,
  addCircleOutline,
  addCircleSharp,
} from "ionicons/icons";

const PlayerDashboard: React.FC = () => {
  const { data } = useAuth();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start" className="menu-icon">
            <IonMenuButton />
          </IonButtons>
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
              <MeetGoal width={40} height={40} />
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {data?.userType !== "Jugador" ? (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        ) : (
          <div></div>
        )}
      </IonContent>
    </IonPage>
  );
};
export default PlayerDashboard;
