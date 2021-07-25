import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonBackButton,
} from "@ionic/react";
import { useAuth } from "contexts/AuthContext";
import { useEffect } from "react";
import styles from "./styles.module.css";
import { getUserDoc } from "firebase/client";
import { useParams } from "react-router";
import UserProfile from "components/UserProfile/UserProfile";

const UserProfilePage: React.FC = () => {
  const { data, setData, currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setData, id);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser, id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles.back}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" className={styles.icon_back} />
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
