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
  IonCard,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import MeetGoal from "icons/MeetGoal";
import "./Dashboard.css";
import { add } from "ionicons/icons";
import { USER_TYPES } from "constants/userTypes";
import { useCurrentUserData } from "hooks/useCurrentUserData";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { getNewsData } from "firebase/newsServices";
import { NewFormData } from "types";

const PlayerDashboard: React.FC = () => {
  const currentUserData = useCurrentUserData();
  const [newsData, setNewsData] = useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    let unMounted = false;
    if (!unMounted) {
      getNewsData(setNewsData);
    }
    return () => {
      unMounted = true;
    };
  }, []);

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
        <IonList>
          {newsData?.map((newData: NewFormData, index: number) => (
            <IonCard key={index} className="back_card">
              <IonRow>
                <div className="cover_container">
                  <img src={newData.image} className="cover"></img>
                </div>
              </IonRow>
              <IonRow>
                <div>
                  <IonLabel>
                    <h1 className="new_title">{newData.title}</h1>
                  </IonLabel>
                </div>
              </IonRow>
              <IonRow>
                <div>
                  <IonText>
                    <h1 className="new_description">{newData.description}</h1>
                  </IonText>
                </div>
              </IonRow>
            </IonCard>
          ))}
        </IonList>
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
