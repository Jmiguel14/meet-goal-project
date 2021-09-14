import {
  IonButton,
  IonCol,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRow,
} from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import React from "react";
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

  return (
    <>
      {id === data?.id ? (
        <>
          <PhotoUser />
          <IonRow className="ion-justify-content-center">
            <IonCol size="auto">
              {currentUser.uid === id ? (
                <IonButton
                  className={styles.edit_photos}
                  expand="block"
                  fill="outline"
                  strong={true}
                  routerLink="/tabs/editar-fotos"
                >
                  Editar fotos
                </IonButton>
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
          {data?.userType === USER_TYPES.PLAYER ? (
            <PlayerSegments />
          ) : (
            <ClubSegments />
          )}
        </>
      ) : (
        <IonLoading isOpen={true} message="Cargando..." />
      )}
    </>
  );
};

export default UserProfile;
