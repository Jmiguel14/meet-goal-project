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
import { useAuth } from "contexts/AuthContext";
import { EditChannelsLinks } from "firebase/client";
import {
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoVimeo,
  logoYoutube,
} from "ionicons/icons";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styles from "./styles.module.css";
interface ChanelsForm {
  facebook: string;
  twitter: string;
  instagram: string;
  vimeo: string;
  youtube: string;
}

const AddChannels: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const { currentUser, data } = useAuth();

  const initialValues = {
    facebook: "",
    twitter: "",
    instagram: "",
    vimeo: "",
    youtube: "",
  };

  useEffect(() => {
    if (data) {
      const { facebook, twitter, instagram, youtube, vimeo } = data;
      facebook === undefined
        ? setValue("facebook", "")
        : setValue("facebook", facebook);
      twitter === undefined
        ? setValue("twitter", "")
        : setValue("twitter", twitter);
      instagram === undefined
        ? setValue("instagram", "")
        : setValue("instagram", instagram);
      vimeo === undefined ? setValue("vimeo", "") : setValue("vimeo", vimeo);
      youtube === undefined
        ? setValue("youtube", "")
        : setValue("youtube", youtube);
    }
  }, [data]);

  const { handleSubmit, register, setValue } = useForm({
    defaultValues: initialValues,
  });

  const onSubmit = async (data: ChanelsForm) => {
    const { facebook, twitter, instagram, youtube, vimeo } = data;

    if (
      facebook === "" &&
      twitter === "" &&
      instagram === "" &&
      youtube === "" &&
      vimeo === ""
    ) {
      present({
        message: "Debe ingresar al menos un canal",
        duration: 3000,
        position: "top",
        color: "warning",
      });
    } else {
      try {
        await EditChannelsLinks(facebook, twitter, instagram, youtube, vimeo);
        present({
          message: "Se ha actualizado la inforamción de tus redes",
          duration: 3000,
          position: "top",
          color: "success",
        });
        history.goBack();
      } catch {
        present({
          message:
            "Error al actualizar la información. Intentelo nuevamente...",
          duration: 3000,
          position: "top",
          color: "danger",
        });
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={`/tabs/perfil/${currentUser.uid}`}
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
              placeholder="Ej. www.facebook.com/meet-goal-official-page"
              {...register("facebook")}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoTwitter}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Ej. www.twitter.com/MeetGoalOfficial"
              {...register("twitter")}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoInstagram}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Ej. www.instagram.com/MeetGoalOfficial"
              {...register("instagram")}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoYoutube}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Ej. www.youtube.com/channel/UcsqpqcxtErZpw"
              {...register("youtube")}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoVimeo}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Ej. www.vimeo.com/user"
              {...register("vimeo")}
            ></IonInput>
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddChannels;
