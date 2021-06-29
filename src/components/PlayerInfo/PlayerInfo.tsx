import {
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
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
import { firestore } from "firebase/client";
import { useAuth } from "contexts/AuthContext";

export const PlayerInfo: React.FC = () => {
  const [info, setInfo] = useState("personal");

  //const [datos, setDatos] = useState(null);

  //const { currentUser } = useAuth();

  /*useEffect(() => {
    let id = currentUser.uid;
    console.log(id);
    const res = firestore.collection("users").doc(id);
    res.get().then((doc) => {
      let data = doc.data();
      if (data) {
        console.log(data);
      }
    });
  }, []);*/
  return (
    <IonContent>
      <AvatarPlayer />
      <IonRow className="ion-justify-content-center">
        <IonCol size="auto">
          <IonLabel className="nombre">PlayerName</IonLabel>
        </IonCol>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <IonCol size="auto">
          <IonLabel className="locacion">
            <IonIcon icon={locationOutline}></IonIcon> Ciudad/País
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
