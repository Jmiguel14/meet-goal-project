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
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { checkmarkOutline, closeOutline, create } from "ionicons/icons";
import styles from "./styles.module.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { CloseCall, getACallData, getOwnCallData } from "firebase/callServices";
import { useAuth } from "contexts/AuthContext";
import { setPostulation } from "firebase/postulationsServices";
import { USER_TYPES } from "constants/userTypes";
import { useCurrentUserData } from "hooks/useCurrentUserData";

import { isCallClosed, converterDate } from "utils/converterDate";

import { Player } from "types";
import {
  getPlayersPostulationData,
  selectPostulant,
} from "firebase/PostulateServices";
import { newNotification } from "firebase/notificationsServices";
import { NOTIFYTITLES } from "constants/notificationsTitles";
import { ERROR_MESSAGES } from "constants/errorMessages";

const CallDetails: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const { currentUser } = useAuth();
  const currentUserData = useCurrentUserData();
  const { id } = useParams<{ id?: string }>();
  const [callData, setCallData] = useState<firebase.firestore.DocumentData>();
  const [clubData, setClubData] = useState<firebase.firestore.DocumentData>();
  const [existPostulation, setExistPostulation] = useState<boolean>(false);
  const [messageNotification, setMessageNotification] = useState<string>("");
  const [playersData, setPlayersData] =
    useState<firebase.firestore.DocumentData>([]);

  useEffect(() => {
    const unsubscribe = getACallData(id, (data) => {
      setCallData(data);
    });
    return () => unsubscribe && unsubscribe();
  }, [id]);

  useEffect(() => {
    let unsubscribe: any;
    if (callData) {
      const unsubscribe = getOwnCallData(callData?.clubId, (data) => {
        setClubData(data);
      });
    }
    return () => unsubscribe && unsubscribe();
  }, [callData]);

  useEffect(() => {
    if (callData?.postulatedPlayersId !== undefined) {
      callData?.postulatedPlayersId.map((id: string) => {
        if (id === currentUser.uid) {
          setExistPostulation(true);
          present({
            message: "Ya est??s registrado en esta convocatoria",
            duration: 3000,
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
        duration: 3000,
        position: "top",
        color: "success",
      });
      newNotification(
        currentUser.uid,
        `Tu postulaci??n a la convocatoria del ${clubData?.name}, donde requiere un ${callData?.posRequired} de la categoria ${callData?.ageRequired} se registro con exito. Espera el cierre y posible notificaci??n. Suerte...`,
        NOTIFYTITLES.POSTULATION,
        clubData?.name,
        callData?.posRequired,
        callData?.ageRequired
      );
      history.push("/tabs/mis-postulaciones");
    } else {
      present({
        message: "Error al registrarte a la convocatoria",
        duration: 3000,
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
        duration: 3000,
        position: "top",
        color: "danger",
      });
    }
  };

  const sendPostulantsNotifications = () => {
    let flag = false;
    if (
      (callData?.postulatedPlayers !== "" && messageNotification !== "") ||
      (callData?.postulatedPlayers !== undefined && messageNotification !== "")
    ) {
      callData?.postulatedPlayers.map((player: any) => {
        if (player.isSelected) {
          newNotification(
            player.playerId,
            messageNotification,
            NOTIFYTITLES.PLAYERACCEPTED,
            clubData?.name,
            callData.posRequired,
            callData.ageRequired
          );
          flag = true;
        } else {
          newNotification(
            player.playerId,
            `Los datos de la convocatoria finalizada son: Nombre del club.- ${clubData?.name}. Edad requerida.- ${callData.ageRequired}. Posici??n Requerida.- ${callData.posRequired}`,
            NOTIFYTITLES.PLAYERREJECTED,
            clubData?.name,
            callData.posRequired,
            callData.ageRequired
          );
        }
      });
    }
    if (flag) {
      present({
        message: "Se ha enviado la notificaci??n a los jugadores",
        duration: 3000,
        position: "top",
        color: "success",
      });
      CloseCall(callData?.id);
      setMessageNotification("");
    }
    if (messageNotification === "") {
      present({
        message: ERROR_MESSAGES.MATCH_WITH_TEXT,
        duration: 1500,
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
      <IonContent>
        <IonCard className={styles.club_container}>
          <IonItem className={styles.title_club}>
            <IonLabel>
              <h1 className={styles.title_club_details}>
                Detalles de la Convocatoria
              </h1>
            </IonLabel>
            {currentUser.uid === callData?.clubId &&
            callData.isClosed === false ? (
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
                  ? "Ciudad/Pa??s"
                  : `${clubData?.city}/${clubData?.country}`}
              </h1>
            </IonLabel>
            <IonText className={styles.club_location}>{clubData?.name}</IonText>
            {callData?.isClosed === true ? (
              <IonText className={styles.endDate}>CERRADA</IonText>
            ) : (
              <IonText className={styles.endDate}>
                Termina el {converterDate(callData?.endDate)}
              </IonText>
            )}
          </IonItem>
          <IonItemDivider color="primary">
            <div className={styles.request}>Requerimos</div>
          </IonItemDivider>
          <IonItem className={styles.position_container} lines="none">
            <IonLabel position="stacked">
              <h1 className={styles.position_desc}>Posici??n</h1>
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
              <h1 className={styles.extra_desc}>Informaci??n extra</h1>
            </IonLabel>
            <IonText className={styles.extra_data}>
              {callData?.extraDetails}
            </IonText>
          </IonItem>
        </IonCard>
        {currentUserData?.userType === USER_TYPES.PLAYER &&
        isCallClosed(callData?.endDate) ? (
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
        {currentUserData?.userType === USER_TYPES.CLUB ? (
          <IonCol>
            <IonRow className={styles.tips}>
              <IonNote color="primary">
                Para seleccionar un jugador toque el bot??n verde
              </IonNote>
            </IonRow>
            <IonRow className={styles.tips}>
              <IonNote color="primary">
                Para descartarlo toque el bot??n rojo
              </IonNote>
            </IonRow>
          </IonCol>
        ) : (
          ""
        )}
        <br />
        <IonItemDivider color="primary">
          <div className={styles.request}>Futbolistas Postulantes</div>
        </IonItemDivider>
        <IonList>
          {callData?.postulatedPlayers
            ? playersData.map((player: Player, index: number) => {
                return (
                  <IonItem key={index}>
                    {callData.postulatedPlayers &&
                    currentUserData?.id === callData.clubId
                      ? callData.postulatedPlayers.map((postulation: any) =>
                          postulation.playerId === player.id ? (
                            <IonButton
                              key={player.id}
                              color={
                                postulation.isSelected ? "danger" : "success"
                              }
                              disabled={
                                callData.isClosed === true ? true : false
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
              })
            : ""}
        </IonList>
        <br />
        {currentUser.uid === callData?.clubId &&
        !isCallClosed(callData.endDate) &&
        callData.isClosed === false ? (
          <>
            <IonItemDivider color="primary">
              <div className={styles.request}>
                Notificar a los seleccionados
              </div>
            </IonItemDivider>
            <IonItem lines="none">
              <IonTextarea
                className={styles.postulant_notify}
                value={messageNotification}
                onIonChange={(e) =>
                  setMessageNotification(e.detail.value!.trim())
                }
                placeholder="Registre los detalles que desea notificar a los jugadores seleccionados"
              ></IonTextarea>
            </IonItem>
            <br />
            <IonButton
              shape="round"
              expand="block"
              size="default"
              className="ion-padding-horizontal"
              onClick={() => {
                sendPostulantsNotifications();
              }}
              routerLink="/tabs/panel-noticias"
            >
              Notificar
            </IonButton>
            <br />
          </>
        ) : (
          ""
        )}
      </IonContent>
    </IonPage>
  );
};
export default CallDetails;
