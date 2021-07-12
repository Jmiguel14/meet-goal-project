import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonCard,
  IonImg,
  useIonToast,
  IonItemDivider,
} from "@ionic/react";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import firebase from "firebase/app";
import {
  firestore,
  getUserDoc,
  updateProfileAvatar,
  updateProfileCover,
} from "firebase/client";

const UpdatePhotos: React.FC = () => {
  const [present] = useIonToast();
  const [data, setData] = useState<
    firebase.firestore.DocumentData | undefined
  >();
  const [task, setTask] = useState<firebase.storage.UploadTask>();
  const [typePhoto, setTypePhoto] = useState("");

  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setData);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);

  async function HandleUploadAvatar(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files![0];
    setTask(updateProfileAvatar(file));
    setTypePhoto("avatar");
  }
  function handleUploadCover(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    setTask(updateProfileCover(file));
    setTypePhoto("cover");
  }

  useEffect(() => {
    if (task) {
      const onProgress = () => {};
      const onError = () => {};
      const onComplete = () => {
        present({
          message: "Se ha cambiado su foto correctamente",
          duration: 1000,
          position: "top",
          color: "success",
        });
        task.snapshot.ref.getDownloadURL().then((url) => {
          if (typePhoto == "avatar") {
            firestore.collection("users").doc(currentUser.uid).update({
              avatarURL: url,
            });
          } else {
            firestore.collection("users").doc(currentUser.uid).update({
              coverURL: url,
            });
          }
        });
      };
      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

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
      <IonContent fullscreen className={styles.back}>
        <IonItemDivider color="primary" className={styles.container_divider}>
          <div className={styles.divider}>Avatar del usuario</div>
        </IonItemDivider>
        <IonCard>
          <IonImg src={data?.avatarURL}> </IonImg>
          <input type="file" onChange={HandleUploadAvatar}></input>
        </IonCard>
        <IonItemDivider color="primary">
          <div className={styles.divider}>Foto del perfil</div>
        </IonItemDivider>
        <IonCard>
          <IonImg src={data?.coverURL}> </IonImg>
          <input type="file" onChange={handleUploadCover}></input>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default UpdatePhotos;
