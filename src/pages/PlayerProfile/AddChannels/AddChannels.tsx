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
} from "@ionic/react";
import {
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoVimeo,
  logoYoutube,
} from "ionicons/icons";

import "./AddChannels.css";

const AddChannels: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light" className="acciones">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/perfil-jugador"
              className="icon-back"
            />
          </IonButtons>
          <IonTitle color="primary" className="titulo">
            Redes Sociales
          </IonTitle>
          <IonButton fill="clear" slot="end" color="tertiary">
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="redes">
        <IonItemDivider color="primary">
          <div className="subtitulo">Pega aquí tus redes sociales</div>
        </IonItemDivider>
        <IonItem className="red">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={logoFacebook}></IonIcon>
          </IonButton>
          <IonInput placeholder="facebook"></IonInput>
        </IonItem>
        <IonItem className="red">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={logoTwitter}></IonIcon>
          </IonButton>
          <IonInput placeholder="twitter"></IonInput>
        </IonItem>
        <IonItem className="red">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={logoInstagram}></IonIcon>
          </IonButton>
          <IonInput placeholder="instagram"></IonInput>
        </IonItem>
        <IonItem className="red">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={logoYoutube}></IonIcon>
          </IonButton>
          <IonInput placeholder="youtube"></IonInput>
        </IonItem>
        <IonItem className="red">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={logoVimeo}></IonIcon>
          </IonButton>
          <IonInput placeholder="vimeo"></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default AddChannels;
