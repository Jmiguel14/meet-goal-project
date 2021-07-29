import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { checkmarkOutline, closeOutline, create } from "ionicons/icons";
import styles from "./styles.module.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { getACallData, getOwnCallData } from "firebase/callServices";
import { useAuth } from "contexts/AuthContext";
import { setPostulation } from "firebase/postulationsServices";
import { USER_TYPES } from "constants/userTypes";
import { useCurrentUserData } from "hooks/useCurrentUserData";
import { Player } from "types";
import {
  getPlayersPostulationData,
  selectPostulant,
} from "firebase/PostulateServices";

const CallDetails: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const { currentUser } = useAuth();
  const currentUserData = useCurrentUserData();
  const { id } = useParams<{ id?: string }>();
  const [callData, setCallData] = useState<firebase.firestore.DocumentData>();
  const [clubData, setClubData] = useState<firebase.firestore.DocumentData>();
  const [existPostulation, setExistPostulation] = useState<boolean>(false);
  const [playersData, setPlayersData] =
    useState<firebase.firestore.DocumentData>([]);

  useEffect(() => {
    const unsubscribe = getACallData(id, (data) => {
      setCallData(data);
    });
    return () => unsubscribe && unsubscribe();
  }, [id]);

  useEffect(() => {
    if (callData) {
      const unsubscribe = getOwnCallData(callData?.clubId, (data) => {
        setClubData(data);
      });
    }
  }, [callData]);

  useEffect(() => {
    if (callData?.postulatedPlayersId !== undefined) {
      callData?.postulatedPlayersId.map((id: string) => {
        if (id === currentUser.uid) {
          setExistPostulation(true);
          present({
            message: "Ya esta registrado en esta convocatoria",
            duration: 1000,
            position: "top",
            color: "danger",
          });
        }
      });
    }
  }, [callData, id, currentUser]);

  useEffect(() => {
    if (callData && callData.postulatedPlayersId != undefined) {
      const unsuscribe = getPlayersPostulationData(
        callData?.postulatedPlayersId,
        (data) => {
          setPlayersData(data);
        }
      );
    }
  }, [callData]);

  const postPlayerPostulation = async () => {
    if (await setPostulation(id!, currentUser.uid)) {
      present({
        message: "Te has registrado a la convocatoria",
        duration: 1000,
        position: "top",
        color: "success",
      });
      history.push("/tabs/mis-postulaciones");
    } else {
      present({
        message: "Error al registrarte a la convocatoria",
        duration: 1000,
        position: "top",
        color: "danger",
      });
    }
  };

  const selectPostulationsPlayers = async (
    callId: string,
    playerId: string,
    isSelected: false
  ) => {
    try {
      await selectPostulant(callId, playerId, isSelected);
    } catch (e) {
      present({
        message: "Error, intente nuevamente",
        duration: 1000,
        position: "top",
        color: "danger",
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles.back}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" className={styles.icon_back} />
          </IonButtons>
          <IonRow className={styles.title}>
            <IonCol size="auto">
              <IonTitle>Convocatoria</IonTitle>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className={styles.club_container}>
          <IonItem className={styles.title_club}>
            <IonLabel>
              <h1 className={styles.title_club_details}>
                Detalles de la Convocatoria
              </h1>
            </IonLabel>
            {currentUser.uid === callData?.clubId ? (
              <Link to={`/tabs/editar-convocatoria/${callData?.id}`}>
                <IonIcon icon={create} size="medium" color="primary"></IonIcon>
              </Link>
            ) : (
              ""
            )}
          </IonItem>
          <IonItem lines="none" className={styles.info_club}>
            <IonAvatar slot="start" className={styles.avatar}>
              {" "}
              <img src={clubData?.avatarURL}></img>
            </IonAvatar>
            <IonLabel position="stacked">
              <h1 className={styles.club_name}>
                {clubData?.city === undefined
                  ? "Ciudad/País"
                  : `${clubData?.city}/${clubData?.country}`}
              </h1>
            </IonLabel>
            <IonText className={styles.club_location}>{clubData?.name}</IonText>
          </IonItem>
          <IonItemDivider color="primary">
            <div className={styles.request}>Requerimos</div>
          </IonItemDivider>
          <IonItem className={styles.position_container} lines="none">
            <IonLabel position="stacked">
              <h1 className={styles.position_desc}>Posición</h1>
            </IonLabel>
            <IonText className={styles.position_data}>
              {callData?.posRequired}
            </IonText>
          </IonItem>
          <IonItem lines="none" className={styles.age_container}>
            <IonLabel position="stacked">
              <h1 className={styles.age_desc}>Edad</h1>
            </IonLabel>
            <IonText className={styles.age_data}>
              {callData?.ageRequired}
            </IonText>
          </IonItem>
          <IonItem lines="none" className={styles.extra_container}>
            <IonLabel position="stacked">
              <h1 className={styles.extra_desc}>Información extra</h1>
            </IonLabel>
            <IonText className={styles.extra_data}>
              {callData?.extraDetails}
            </IonText>
          </IonItem>
        </IonCard>
        {currentUserData?.userType === USER_TYPES.JUGADOR ? (
          existPostulation ? (
            ""
          ) : (
            <IonButton
              shape="round"
              expand="block"
              size="default"
              className="ion-padding"
              onClick={() => postPlayerPostulation()}
            >
              Postularme
            </IonButton>
          )
        ) : (
          ""
        )}
        <br />
        <IonItemDivider color="primary">
          <div className={styles.request}>Futbolistas Postulantes</div>
        </IonItemDivider>
        <IonList>
          {callData?.postulatedPlayers &&
            playersData.map((player: Player, index: number) => {
              return (
                <IonItem key={index}>
                  {currentUserData?.id === callData.clubId
                    ? callData.postulatedPlayers.map((postulation: any) =>
                        postulation.playerId === player.id ? (
                          <IonButton
                            key={player.id}
                            color={
                              postulation.isSelected ? "danger" : "success"
                            }
                            onClick={() =>
                              selectPostulationsPlayers(
                                callData?.id,
                                postulation.playerId,
                                postulation.isSelected
                              )
                            }
                          >
                            <IonIcon
                              icon={
                                postulation.isSelected
                                  ? closeOutline
                                  : checkmarkOutline
                              }
                            ></IonIcon>
                          </IonButton>
                        ) : (
                          ""
                        )
                      )
                    : ""}
                  <IonLabel>{player.name}</IonLabel>
                  {currentUserData?.id === callData.clubId ? (
                    <IonButton
                      slot="end"
                      fill="clear"
                      size="small"
                      routerLink={`/tabs/perfil/${player.id}`}
                    >
                      Ver
                    </IonButton>
                  ) : (
                    ""
                  )}
                </IonItem>
              );
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default CallDetails;
