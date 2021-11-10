import { yupResolver } from "@hookform/resolvers/yup";
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
  IonNote,
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
import * as yup from "yup";
import { ERROR_MESSAGES } from "constants/errorMessages";

interface ChanelsForm {
  facebook: string;
  twitter: string;
  instagram: string;
  vimeo: string;
  youtube: string;
}

const schema = yup.object().shape({
  facebook: yup.string().matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, {
    message: ERROR_MESSAGES.MATCH_WITH_TEXT,
    excludeEmptyString: true,
  }),
  twitter: yup.string().matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, {
    message: ERROR_MESSAGES.MATCH_WITH_TEXT,
    excludeEmptyString: true,
  }),
  instagram: yup.string().matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, {
    message: ERROR_MESSAGES.MATCH_WITH_TEXT,
    excludeEmptyString: true,
  }),
  vimeo: yup.string().matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, {
    message: ERROR_MESSAGES.MATCH_WITH_TEXT,
    excludeEmptyString: true,
  }),
  youtube: yup.string().matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, {
    message: ERROR_MESSAGES.MATCH_WITH_TEXT,
    excludeEmptyString: true,
  }),
});

const AddChannels: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const { currentUser, data } = useAuth();

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

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
          message: "Se ha actualizado la información de tus redes",
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
      <IonContent className={styles.networks}>
        <IonItemDivider color="primary">
          <div className={styles.subtitle}>Pega aquí tus redes sociales</div>
        </IonItemDivider>
        <form onSubmit={handleSubmit(onSubmit)} id="add-channels-info-form">
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoFacebook}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Ej. miguelangel.juradocedeno"
              {...register("facebook")}
              onIonChange={() => {
                clearErrors("facebook");
              }}
            ></IonInput>
          </IonItem>
          {errors.facebook && (
            <IonNote color="danger">{errors.facebook?.message}</IonNote>
          )}
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoTwitter}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Ej. migueljuradoced"
              {...register("twitter")}
              onIonChange={() => {
                clearErrors("twitter");
              }}
            ></IonInput>
          </IonItem>
          {errors.twitter && (
            <IonNote color="danger">{errors.twitter?.message}</IonNote>
          )}
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoInstagram}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Ej. j_miguel14.v"
              {...register("instagram")}
              onIonChange={() => {
                clearErrors("instagram");
              }}
            ></IonInput>
          </IonItem>
          {errors.instagram && (
            <IonNote color="danger">{errors.instagram?.message}</IonNote>
          )}
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoYoutube}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Ej. UCWQBpIaaoNJfGPfqFIYp03g"
              {...register("youtube")}
              onIonChange={() => {
                clearErrors("youtube");
              }}
            ></IonInput>
          </IonItem>
          {errors.youtube && (
            <IonNote color="danger">{errors.youtube?.message}</IonNote>
          )}
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoVimeo}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Ej. user150607591"
              {...register("vimeo")}
              onIonChange={() => {
                clearErrors("vimeo");
              }}
            ></IonInput>
          </IonItem>
          {errors.vimeo && (
            <IonNote color="danger">{errors.vimeo?.message}</IonNote>
          )}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddChannels;
