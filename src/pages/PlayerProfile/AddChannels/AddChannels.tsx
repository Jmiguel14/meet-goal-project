import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
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
import { useState } from "react";

import "./AddChannels.css";

const AddChannels: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light" class="acciones">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/perfil-jugador"
              className="icon-back"
            />
          </IonButtons>
          <IonTitle color="primary" class="titulo">
            Redes Sociales
          </IonTitle>
          <IonButton fill="clear" slot="end" color="tertiary">
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider color="primary">
          <div className="subtitulo">Pega aquí tus redes sociales</div>
        </IonItemDivider>
        <IonItem class="elemento">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={logoFacebook}></IonIcon>
          </IonButton>
          <IonInput placeholder="facebook"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={logoTwitter}></IonIcon>
          </IonButton>
          <IonInput placeholder="twitter"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={logoInstagram}></IonIcon>
          </IonButton>
          <IonInput placeholder="instagram"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={logoYoutube}></IonIcon>
          </IonButton>
          <IonInput placeholder="youtube"></IonInput>
        </IonItem>
        <IonItem class="elemento">
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
