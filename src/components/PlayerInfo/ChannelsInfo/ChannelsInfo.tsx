import {
  IonButton,
  IonCard,
  IonIcon,
  IonImg,
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
import FacebookIcon from "icons/FacebookIcon.png";
import InstagramIcon from "icons/InstagramIcon.png";
import TwitterIcon from "icons/TwitterIcon.png";
import YoutubeIcon from "icons/YouTubeIcon.png";
import VimeoIcon from "icons/VimeoIcon.png";
import { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { getUserDoc } from "firebase/client";
import firebase from "firebase/app";

interface ContainerProps {}

const ChannelsInfo: React.FC<ContainerProps> = () => {
  const [datos, setDatos] = useState<
    firebase.firestore.DocumentData | undefined
  >();

  const { currentUser } = useAuth();

  useEffect(() => {
    getUserDoc(currentUser.uid).then((doc) => {
      if (doc.exists) {
        setDatos(doc.data());
      }
    });
  }, []);
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
          <IonText>
            {datos?.facebook !== undefined ? datos?.facebook : "Facebook"}
          </IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={TwitterIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>
            {datos?.twitter !== undefined ? datos?.twitter : "Twitter"}
          </IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={InstagramIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>
            {datos?.instagram !== undefined ? datos?.instagram : "Instagram"}
          </IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={YoutubeIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>
            {datos?.youtube !== undefined ? datos?.youtube : "YouTube"}
          </IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={VimeoIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>
            {datos?.vimeo !== undefined ? datos?.vimeo : "Vimeo"}
          </IonText>
        </IonItem>
      </IonCard>
    </>
  );
};

export default ChannelsInfo;
