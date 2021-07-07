import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { EditChannelsLinks } from "firebase/client";
import {
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoVimeo,
  logoYoutube,
} from "ionicons/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styles from "./styles.module.css";

const AddChannels: React.FC = () => {
  const [facebook, setFacebook] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [vimeo, setVimeo] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const { reset, handleSubmit } = useForm();
  const [present] = useIonToast();
  const history = useHistory();

  const onSubmit = async () => {
    if (await EditChannelsLinks(facebook, twitter, instagram, youtube, vimeo)) {
      present({
        message: "Se ha actualizado la inforamción de tus redes",
        duration: 1000,
        position: "top",
        color: "primary",
      });
    }
    reset();
    history.push("/tabs/perfil-jugador");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/tabs/perfil-jugador"
              className={styles.icon_back}
            />
          </IonButtons>
          <IonTitle color="primary" className={styles.title}>
            Redes Sociales
          </IonTitle>
          <button
            type="submit"
            form="add-channels-info-form"
            slot="end"
            className={styles.save_channels_info}
          >
            Guardar
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.networks}>
        <IonItemDivider color="primary">
          <div className={styles.subtitle}>Pega aquí tus redes sociales</div>
        </IonItemDivider>
        <form onSubmit={handleSubmit(onSubmit)} id="add-channels-info-form">
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoFacebook}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Facebook: Ej. www.facebook.com/meet-goal-official-page"
              onIonChange={(e: any) => setFacebook(e.currentTarget.value)}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoTwitter}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Twitter: Ej. www.twitter.com/MeetGoalOfficial"
              onIonChange={(e: any) => setTwitter(e.currentTarget.value)}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoInstagram}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Instagram: Ej. www.instagram.com/MeetGoalOfficial"
              onIonChange={(e: any) => setInstagram(e.currentTarget.value)}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoYoutube}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Youtube: Ej. www.youtube.com/channel/UcsqpqcxtErZpw"
              onIonChange={(e: any) => setYoutube(e.currentTarget.value)}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoVimeo}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Vimeo: Ej. www.vimeo.com/userZZZZZZZZ"
              onIonChange={(e: any) => setVimeo(e.currentTarget.value)}
            ></IonInput>
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddChannels;
