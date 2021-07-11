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
  IonBackButton,
  IonCard,
  IonImg,
  IonInput,
  useIonToast,
} from "@ionic/react";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import firebase from "firebase/app";
import { firestore, getUserDoc } from "firebase/client";
import { useHistory } from "react-router";

const UpdatePhotos: React.FC = () => {
  const [present] = useIonToast();
  const [datos, setDatos] = useState<
    firebase.firestore.DocumentData | undefined
  >();

  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setDatos);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);

  function handleUploadAvatar(event: any) {
    const file = event.target.files[0];
    const storageRef = firebase
      .storage()
      .ref()
      .child(`images/${currentUser.uid}/avatar.png`);
    const task = storageRef.put(file).then((savedPicture) => {
      storageRef.getDownloadURL().then((url) => {
        firestore.collection("users").doc(currentUser.uid).update({
          avatarURL: url,
        });
        present({
          message: "Se ha cambiado su foto correctamente",
          duration: 1000,
          position: "top",
          color: "success",
        });
      });
    });
  }
  function handleUploadCover(event: any) {
    const file = event.target.files[0];
    const storageRef = firebase
      .storage()
      .ref()
      .child(`images/${currentUser.uid}/cover.png`);
    const task = storageRef.put(file).then((savedPicture) => {
      storageRef.getDownloadURL().then((url) => {
        firestore.collection("users").doc(currentUser.uid).update({
          coverURL: url,
        });
        present({
          message: "Se ha cambiado su foto correctamente",
          duration: 1000,
          position: "top",
          color: "success",
        });
      });
    });
  }

  function backHome() {
    history.push("/tabs/inicio-jugador");
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light" className={styles.back}>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/tabs/perfil-jugador"
              className={styles.icon_back}
            />
          </IonButtons>
          <IonTitle color="primary" className={styles.titles}>
            Cambiar fotos de perfil
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonImg src={datos?.avatarURL}> </IonImg>
          <input type="file" onChange={handleUploadAvatar}></input>
        </IonCard>
        <IonCard>
          <IonImg src={datos?.coverURL}> </IonImg>
          <input type="file" onChange={handleUploadCover}></input>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default UpdatePhotos;
