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
import { EditChannelsLinks } from "firebase/client";
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
  const [facebook, setFacebook] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [vimeo, setVimeo] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const onSubmit = async () => {
    await EditChannelsLinks(facebook, twitter, instagram, youtube, vimeo);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light" className="acciones">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/tabs/perfil-jugador"
              className="icon-back"
            />
          </IonButtons>
          <IonTitle color="primary" className="titulo">
            Redes Sociales
          </IonTitle>
          <IonButton
            fill="clear"
            slot="end"
            color="tertiary"
            onClick={onSubmit}
            routerLink="/tabs/perfil-jugador"
          >
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
          <IonInput
            placeholder="Facebook"
            onIonChange={(e: any) => setFacebook(e.currentTarget.value)}
          ></IonInput>
        </IonItem>
        <IonItem className="red">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={logoTwitter}></IonIcon>
          </IonButton>
          <IonInput
            placeholder="Twitter"
            onIonChange={(e: any) => setTwitter(e.currentTarget.value)}
          ></IonInput>
        </IonItem>
        <IonItem className="red">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={logoInstagram}></IonIcon>
          </IonButton>
          <IonInput
            placeholder="Instagram"
            onIonChange={(e: any) => setInstagram(e.currentTarget.value)}
          ></IonInput>
        </IonItem>
        <IonItem className="red">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={logoYoutube}></IonIcon>
          </IonButton>
          <IonInput
            placeholder="Youtube"
            onIonChange={(e: any) => setYoutube(e.currentTarget.value)}
          ></IonInput>
        </IonItem>
        <IonItem className="red">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={logoVimeo}></IonIcon>
          </IonButton>
          <IonInput
            placeholder="Vimeo"
            onIonChange={(e: any) => setVimeo(e.currentTarget.value)}
          ></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default AddChannels;
