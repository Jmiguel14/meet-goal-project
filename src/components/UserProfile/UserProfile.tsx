import { IonCol, IonIcon, IonLabel, IonRouterLink, IonRow } from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { useAuth } from "contexts/AuthContext";
import PhotoUser from "./PlayerInfo/PhotoUser/PhotoUser";
import PlayerSegments from "./PlayerInfo/PlayerSegments/PlayerSegments";
import ClubSegments from "./ClubInfo/ClubSegments/ClubSegments";
import { USER_TYPES } from "constants/userTypes";
import { useParams } from "react-router";

export const UserProfile: React.FC = () => {
  const { data, currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [datas, setData] = useState('')

  return (
    <>
      <PhotoUser />
      <IonRow className="ion-justify-content-center">
        <IonCol size="auto">
          {currentUser.uid === id ? (
            <IonRouterLink
              href="/tabs/editar-fotos"
              className={styles.edit_photos}
            >
              Editar foto de perfil o avatar
            </IonRouterLink>
          ) : (
            ""
          )}
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
