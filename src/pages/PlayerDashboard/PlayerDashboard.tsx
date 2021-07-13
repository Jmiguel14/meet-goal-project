import {
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonToolbar,
  IonMenuButton,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useAuth } from "contexts/AuthContext";
import MeetGoal from "icons/MeetGoal";
import { useEffect, useState } from "react";
import "./PlayerDashboard.css";
import firebase from "firebase/app";
import { getUserDoc } from "firebase/client";
import { addOutline } from "ionicons/icons";

const PlayerDashboard: React.FC = () => {
  const [data, setData] = useState<
    firebase.firestore.DocumentData | undefined
  >();

  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setData);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);
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
          <button className="add_calls">
            <IonIcon icon={addOutline} className="add_calls_icon"></IonIcon>
          </button>
        ) : (
          <div></div>
        )}
      </IonContent>
    </IonPage>
  );
};
export default PlayerDashboard;
