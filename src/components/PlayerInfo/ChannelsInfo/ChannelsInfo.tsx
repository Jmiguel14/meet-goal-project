import {
  IonButton,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { pencilOutline } from "ionicons/icons";
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
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setDatos);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);
  return (
    <>
      <IonCard className="redes-sociales">
        <IonItem className="titulo">
          <IonLabel>Canales y Redes Sociales</IonLabel>
          <IonButton fill="clear" routerLink="/tabs/canales-jugador">
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
      </IonCard>

      <IonGrid className="logos">
        <IonRow>
          <IonCol>
            {datos?.facebook !== undefined && datos?.facebook !== "" ? (
              <IonCard href={datos?.facebook} className="channel-logo-facebook">
                <IonButton size="large" fill="clear">
                  <IonImg src={FacebookIcon} slot="start"></IonImg>
                </IonButton>
              </IonCard>
            ) : (
              <div></div>
            )}
          </IonCol>

          <IonCol>
            {datos?.twitter !== undefined && datos?.twitter !== "" ? (
              <IonCard href={datos?.twitter} className="channel-logo-twitter">
                <IonButton size="large" fill="clear">
                  <IonImg
                    src={TwitterIcon}
                    slot="start"
                    className="ion-padding-vertical"
                  ></IonImg>
                </IonButton>
              </IonCard>
            ) : (
              <div></div>
            )}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            {datos?.instagram !== undefined && datos?.instagram !== "" ? (
              <IonCard
                href={datos?.instagram}
                className="channel-logo-instagram"
              >
                <IonButton size="large" fill="clear">
                  <IonImg
                    src={InstagramIcon}
                    slot="start"
                    className="ion-padding-vertical"
                  ></IonImg>
                </IonButton>
              </IonCard>
            ) : (
              <div></div>
            )}
          </IonCol>
          <IonCol>
            {datos?.youtube !== undefined && datos?.youtube !== "" ? (
              <IonCard href={datos?.youtube} className="channel-logo-youtube">
                <IonButton size="large" fill="clear">
                  <IonImg
                    src={YoutubeIcon}
                    slot="start"
                    className="ion-padding-vertical"
                  ></IonImg>
                </IonButton>
              </IonCard>
            ) : (
              <div></div>
            )}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            {datos?.vimeo !== undefined && datos?.vimeo !== "" ? (
              <IonCard href={datos?.vimeo} className="channel-logo-vimeo">
                <IonButton size="large" fill="clear">
                  <IonImg
                    src={VimeoIcon}
                    slot="start"
                    className="ion-padding-vertical"
                  ></IonImg>
                </IonButton>
              </IonCard>
            ) : (
              <div></div>
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default ChannelsInfo;
