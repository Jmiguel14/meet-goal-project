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
  updateProfileAvatar,
  updateProfileCover,
} from "firebase/client";
import { COLLECTIONS } from "constants/collections";

const UpdatePhotos: React.FC = () => {
  const [present] = useIonToast();
  const [task, setTask] = useState<firebase.storage.UploadTask>();
  const [typePhoto, setTypePhoto] = useState("");

  const { currentUser } = useAuth();

  const { data } = useAuth();

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
          if (typePhoto === "avatar") {
            firestore
              .collection(COLLECTIONS.USERS)
              .doc(currentUser.uid)
              .update({
                avatarURL: url,
              });
          }
          if (typePhoto == "cover") {
            firestore
              .collection(COLLECTIONS.USERS)
              .doc(currentUser.uid)
              .update({
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
              defaultHref={`/tabs/perfil/${currentUser.uid}`}
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
          <div className={styles.custom_input_file}>
            <span className={styles.label}>SUBIR IMAGEN</span>
            <input
              className={styles.input_file}
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={HandleUploadAvatar}
            ></input>
          </div>
        </IonCard>
        <IonItemDivider color="primary">
          <div className={styles.divider}>Foto del perfil</div>
        </IonItemDivider>
        <IonCard>
          <IonImg src={data?.coverURL}> </IonImg>
          <div className={styles.custom_input_file}>
            <span className={styles.label}>SUBIR IMAGEN</span>
            <input
              className={styles.input_file}
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleUploadCover}
            ></input>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default UpdatePhotos;
