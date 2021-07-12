import {
  IonCol,
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterLink,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import CareerInfo from "./CareerInfo/CareerInfo";
import ChannelsInfo from "./ChannelsInfo/ChannelsInfo";
import MedicalInfo from "./MedicalInfo/MedicalInfo";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import PsycoInfo from "./PsycoInfo/PsycoInfo";
import TacticalInfo from "./TacticalInfo/TacticalInfo";
import styles from "./styles.module.css";
import AvatarPlayer from "./AvatarPlayer/AvatarPlayer";
import { getUserDoc } from "firebase/client";
import firebase from "firebase/app";
import { useAuth } from "contexts/AuthContext";
import { useHistory } from "react-router";

export const PlayerInfo: React.FC = () => {
  const [info, setInfo] = useState("personal");
  const [busy, setBusy] = useState(true);
  const history = useHistory();
  const [data, setData] = useState<
    firebase.firestore.DocumentData | undefined
  >();

  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setData);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);

  return (
    <IonContent>
      <IonRow>
        <IonCol>
          <AvatarPlayer />
        </IonCol>
      </IonRow>
      <br />
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
      <IonSegment scrollable value={info} className={styles.menu_horizontal}>
        <IonSegmentButton
          value="personal"
          className={styles.segments}
          onClick={() => setInfo("personal")}
        >
          <IonLabel>Datos Personales</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="tactica"
          className={styles.segments}
          onClick={() => setInfo("tactica")}
        >
          <IonLabel>Datos tácticos</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="carrera"
          className={styles.segments}
          onClick={() => setInfo("carrera")}
        >
          <IonLabel>Experiencia</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="medica"
          className={styles.segments}
          onClick={() => setInfo("medica")}
        >
          <IonLabel>Datos médicos</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="psico"
          className={styles.segments}
          onClick={() => setInfo("psico")}
        >
          <IonLabel>Datos psicológicos</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="canales"
          className={styles.segments}
          onClick={() => setInfo("canales")}
        >
          <IonLabel>Canales</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      <>
        {info === "personal" ? <PersonalInfo /> : <div></div>}
        {info === "tactica" ? <TacticalInfo /> : <div></div>}
        {info === "carrera" ? <CareerInfo /> : <div></div>}
        {info === "medica" ? <MedicalInfo /> : <div></div>}
        {info === "psico" ? <PsycoInfo /> : <div></div>}
        {info === "canales" ? <ChannelsInfo /> : <div></div>}
      </>
    </IonContent>
  );
};

export default PlayerInfo;
