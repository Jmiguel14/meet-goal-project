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
import MeetGoal from "icons/MeetGoal";
import "./Dashboard.css";
import { add } from "ionicons/icons";
import { USER_TYPES } from "constants/userTypes";
import { useCurrentUserData } from "hooks/useCurrentUserData";

const PlayerDashboard: React.FC = () => {
  const currentUserData = useCurrentUserData()

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
        {currentUserData?.userType !== USER_TYPES.JUGADOR ? (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton routerLink="/tabs/nueva-convocatoria">
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
