import {
  IonCol,
  IonContent,
  IonIcon,
  IonLabel,
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
import "./PlayerInfo.css";
import AvatarPlayer from "./AvatarPlayer/AvatarPlayer";
import { firestore, getUserDoc } from "firebase/client";
import firebase from "firebase/app";
import { useAuth } from "contexts/AuthContext";
export const PlayerInfo: React.FC = () => {
  const [info, setInfo] = useState("personal");

  const [datos, setDatos] = useState<
    firebase.firestore.DocumentData | undefined
  >();

  const { currentUser } = useAuth();

  useEffect(() => {
    const res = firestore.collection("users").doc(currentUser.uid);
    res.get().then((doc) => {
      if (doc.exists) {
        if (
          datos?.email !== doc.data()?.email ||
          datos?.city !== doc.data()?.city ||
          datos?.country !== doc.data()?.country
        ) {
          setDatos(doc.data());
          console.log(datos);
        }
      }
    });
  }, [datos]);
  return (
    <IonContent>
      <AvatarPlayer />
      <IonRow className="ion-justify-content-center">
        <IonCol size="auto">
          <IonLabel className="nombre">{datos?.name}</IonLabel>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <IonCol size="auto">
          <IonLabel className="locacion">
            <IonIcon icon={locationOutline}></IonIcon>{" "}
            {datos?.city || datos?.country !== undefined
              ? "" + datos?.city + "/" + datos?.country
              : "Ciudad/Pais"}
          </IonLabel>
        </IonCol>
      </IonRow>
      {/*-- Scrollable Segment --*/}
      <IonSegment scrollable value={info} className="menu-horizontal">
        <IonSegmentButton
          value="personal"
          className="segments"
          onClick={() => setInfo("personal")}
        >
          <IonLabel>Datos Personales</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="tactica"
          className="segments"
          onClick={() => setInfo("tactica")}
        >
          <IonLabel>Datos tácticos</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="carrera"
          className="segments"
          onClick={() => setInfo("carrera")}
        >
          <IonLabel>Experiencia</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="medica"
          className="segments"
          onClick={() => setInfo("medica")}
        >
          <IonLabel>Datos medicos</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="psico"
          className="segments"
          onClick={() => setInfo("psico")}
        >
          <IonLabel>Datos psicológicos</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="canales"
          className="segments"
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
