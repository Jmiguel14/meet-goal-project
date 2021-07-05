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
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import "./PlayerProfile.css";
import firebase from "firebase/app";
import { getUserDoc } from "firebase/client";

const PlayerProfile: React.FC = () => {
  const [datos, setDatos] = useState<
    firebase.firestore.DocumentData | undefined
  >();

  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setDatos);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);
  return (
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
              <IonTitle>{datos?.name}</IonTitle>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <PlayerInfo />
      </IonContent>
    </IonPage>
  );
};
export default PlayerProfile;
