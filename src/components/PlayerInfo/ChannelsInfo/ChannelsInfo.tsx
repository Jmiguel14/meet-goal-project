import {
  IonButton,
  IonCard,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { pencilOutline } from "ionicons/icons";
import "./ChannelsInfo.css";
import FacebookIcon from "icons/FacebookIcon.png";
import InstagramIcon from "icons/InstagramIcon.png";
import TwitterIcon from "icons/TwitterIcon.png";
import YoutubeIcon from "icons/YouTubeIcon.png";
import VimeoIcon from "icons/VimeoIcon.png";

interface ContainerProps {}

const ChannelsInfo: React.FC<ContainerProps> = () => {
  return (
    <>
      <IonCard className="redes-sociales">
        <IonItem className="titulo">
          <IonLabel>Canales y Redes Sociales</IonLabel>
          <IonButton fill="clear" routerLink="/tabs/canales-jugador">
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={FacebookIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>Facebook</IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={TwitterIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>Twitter</IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={InstagramIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>Instagram</IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={YoutubeIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>Youtube</IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={VimeoIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>Vimeo</IonText>
        </IonItem>
      </IonCard>
    </>
  );
};

export default ChannelsInfo;
