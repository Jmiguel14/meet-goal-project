import {
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import {
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoVimeo,
  logoYoutube,
  pencilOutline,
} from "ionicons/icons";
import "./ChannelsInfo.css";

interface ContainerProps {}

const ChannelsInfo: React.FC<ContainerProps> = () => {
  return (
    <>
      <IonCard>
        <IonItem class="titulo">
          <IonLabel>Canales y Redes Sociales</IonLabel>
          <IonButton fill="clear" routerLink="/canales-jugador">
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem class="elemento">
          <IonIcon icon={logoFacebook} slot="start"></IonIcon>
          <IonText>Facebook</IonText>
        </IonItem>
        <IonItem class="elemento">
          <IonIcon icon={logoTwitter} slot="start"></IonIcon>
          <IonText>Twitter</IonText>
        </IonItem>
        <IonItem class="elemento">
          <IonIcon icon={logoInstagram} slot="start"></IonIcon>
          <IonText>Instagram</IonText>
        </IonItem>
        <IonItem class="elemento">
          <IonIcon icon={logoYoutube} slot="start"></IonIcon>
          <IonText>Youtube</IonText>
        </IonItem>
        <IonItem class="elemento">
          <IonIcon icon={logoVimeo} slot="start"></IonIcon>
          <IonText>Vimeo</IonText>
        </IonItem>
      </IonCard>
    </>
  );
};

export default ChannelsInfo;
