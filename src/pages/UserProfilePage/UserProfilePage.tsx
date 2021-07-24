import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";
import styles from "./styles.module.css";
import { getUserDoc } from "firebase/client";
import { useHistory, useParams } from "react-router";
import { arrowBack } from "ionicons/icons";
import UserProfile from "components/UserProfile/UserProfile";

const UserProfilePage: React.FC = () => {
  const { data, setData, currentUser } = useAuth();
  const {id} = useParams<{id: string}>()
  const history = useHistory();

  useEffect(() => {
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setData, id);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);

  function backHome() {
    history.push("/tabs/inicio-jugador");
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles.back}>
          <IonButtons slot="start">
            <IonButton
              fill="clear"
              className={styles.icon_back}
              onClick={backHome}
            >
              <IonIcon icon={arrowBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonRow className={styles.title}>
            <IonCol size="auto">
              <IonTitle>{data?.name}</IonTitle>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <UserProfile />
      </IonContent>
    </IonPage>
  );
};
export default UserProfilePage;
