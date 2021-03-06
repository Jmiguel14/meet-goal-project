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
} from "@ionic/react";
import { pencilOutline } from "ionicons/icons";
import styles from "./styles.module.css";
import FacebookIcon from "icons/FacebookIcon.png";
import InstagramIcon from "icons/InstagramIcon.png";
import TwitterIcon from "icons/TwitterIcon.png";
import YoutubeIcon from "icons/YouTubeIcon.png";
import VimeoIcon from "icons/VimeoIcon.png";
import { useAuth } from "contexts/AuthContext";
import { useParams } from "react-router";

const ChannelsInfo = () => {
  const { data, currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <IonCard className={styles.social_networks}>
        <IonItem className={styles.title}>
          <IonLabel>Canales y Redes Sociales</IonLabel>
          {currentUser.uid === id ? (
            <IonButton fill="clear" routerLink="/tabs/canales-jugador">
              <IonIcon icon={pencilOutline} />
            </IonButton>
          ) : (
            ""
          )}
        </IonItem>
      </IonCard>

      <IonGrid className={styles.logos}>
        <IonRow>
          <IonCol>
            {data?.facebook !== undefined && data?.facebook !== "" ? (
              <IonCard
                href={`https://www.facebook.com/${data?.facebook}`}
                target="_blank"
                className={styles.channel_logo_facebook}
              >
                <IonButton size="large" fill="clear">
                  <IonImg src={FacebookIcon} slot="start"></IonImg>
                </IonButton>
              </IonCard>
            ) : (
              <div></div>
            )}
          </IonCol>

          <IonCol>
            {data?.twitter !== undefined && data?.twitter !== "" ? (
              <IonCard
                href={`https://twitter.com/${data?.twitter}`}
                target="_blank"
                className={styles.channel_logo_twitter}
              >
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
            {data?.instagram !== undefined && data?.instagram !== "" ? (
              <IonCard
                href={`https://www.instagram.com/${data?.instagram}`}
                target="_blank"
                className={styles.channel_logo_instagram}
              >
                <IonButton size="large" fill="clear">
                  <IonImg
                    src={InstagramIcon}
                    slot="start"
                    className={styles.ion_padding_vertical}
                  ></IonImg>
                </IonButton>
              </IonCard>
            ) : (
              <div></div>
            )}
          </IonCol>
          <IonCol>
            {data?.youtube !== undefined && data?.youtube !== "" ? (
              <IonCard
                href={`https://www.youtube.com/channel/${data?.youtube}`}
                target="_blank"
                className={styles.channel_logo_youtube}
              >
                <IonButton size="large" fill="clear">
                  <IonImg
                    src={YoutubeIcon}
                    slot="start"
                    className={styles.ion_padding_vertical}
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
            {data?.vimeo !== undefined && data?.vimeo !== "" ? (
              <IonCard
                href={`https://vimeo.com/${data?.vimeo}`}
                target="_blank"
                className={styles.channel_logo_vimeo}
              >
                <IonButton size="large" fill="clear">
                  <IonImg
                    src={VimeoIcon}
                    slot="start"
                    className={styles.ion_padding_vertical}
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
