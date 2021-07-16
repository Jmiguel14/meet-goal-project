import {
  IonCol,
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterLink,
  IonRow,
} from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import React from "react";
import styles from "./styles.module.css";
import { useAuth } from "contexts/AuthContext";
import { useHistory } from "react-router";
import PhotoUser from "./PlayerInfo/PhotoUser/PhotoUser";
import PlayerSegments from "./PlayerInfo/PlayerSegments/PlayerSegments";
import ClubSegments from "./ClubInfo/ClubSegments/ClubSegments";
import { USER_TYPES } from "constants/userTypes";

export const UserProfile: React.FC = () => {
  const history = useHistory();
  const { data } = useAuth();

  return (
    <>
      <PhotoUser />
      <IonRow className="ion-justify-content-center">
        <IonCol size="auto">
          <IonRouterLink
            href="/tabs/editar-fotos"
            className={styles.edit_photos}
          >
            Editar foto de perfil o avatar
          </IonRouterLink>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <IonCol size="auto">
          <IonLabel className={styles.name}>{data?.name}</IonLabel>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <IonCol size="auto">
          <IonLabel className={styles.location}>
            <IonIcon icon={locationOutline} size="small"></IonIcon>{" "}
            {data?.city || data?.country !== undefined
              ? "" + data?.city + "/" + data?.country
              : "Ciudad/Pais"}
          </IonLabel>
        </IonCol>
      </IonRow>
      {data?.userType === USER_TYPES.JUGADOR ? (
        <PlayerSegments />
      ) : (
        <ClubSegments />
      )}
    </>
  );
};

export default UserProfile;
