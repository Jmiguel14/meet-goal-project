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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ERROR_MESSAGES } from "constants/errorMessages";
interface ChanelsForm {
  facebook: string
  twitter: string
  instagram: string
  vimeo: string
  youtube: string
}

const schema = yup.object().shape({
  facebook: yup.string().required(ERROR_MESSAGES.REQUIRED),
  twitter: yup.string().required(ERROR_MESSAGES.REQUIRED),
  instagram: yup.string().required(ERROR_MESSAGES.REQUIRED),
  vimeo: yup.string().required(ERROR_MESSAGES.REQUIRED),
  youtube: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

const AddChannels: React.FC = () => {
  const [facebook, setFacebook] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [vimeo, setVimeo] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const [present] = useIonToast();
  const history = useHistory();
  const { currentUser } = useAuth();
  const {
    handleSubmit,
    register,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const errorlength = Object.keys(errors).length
    console.log(errorlength)
    if(errorlength === 5){
      present({
        message: "Debe ingresar al menos un canal",
        duration: 3000,
        position: "top",
        color: "warning",
      });
    } 
  }, [errors])
  

  const onSubmit = async (data: ChanelsForm) => {
    console.log('data', data)
    const errorlength = errors.length
    console.log(errorlength)
    // if (await EditChannelsLinks(facebook, twitter, instagram, youtube, vimeo)) {
    //   present({
    //     message: "Se ha actualizado la inforamción de tus redes",
    //     duration: 1000,
    //     position: "top",
    //     color: "success",
    //   });
    //   history.goBack();
    // } else {
    //   present({
    //     message: "Error al actualizar la información. Intentelo nuevamente...",
    //     duration: 1000,
    //     position: "top",
    //     color: "success",
    //   });
    // }
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
              {...register('facebook')}
              onIonChange={() => clearErrors()}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoTwitter}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Ej. www.twitter.com/MeetGoalOfficial"
              {...register('twitter')}
              onIonChange={() => clearErrors()}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoInstagram}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Ej. www.instagram.com/MeetGoalOfficial"
              {...register('instagram')}
              onIonChange={() => clearErrors()}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoYoutube}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Ej. www.youtube.com/channel/UcsqpqcxtErZpw"
              {...register('youtube')}
              onIonChange={() => clearErrors()}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.network}>
            <IonButton slot="start" fill="clear">
              <IonIcon icon={logoVimeo}></IonIcon>
            </IonButton>
            <IonInput
              placeholder="Ej. www.vimeo.com/user"
              {...register('vimeo')}
              onIonChange={() => clearErrors()}
            ></IonInput>
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddChannels;
