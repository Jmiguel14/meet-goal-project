import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { locationOutline } from "ionicons/icons";
import React, { useState } from "react";
import CareerInfo from "./CareerInfo/CareerInfo";
import ChannelsInfo from "./ChannelsInfo/ChannelsInfo";
import MedicalInfo from "./MedicalInfo/MedicalInfo";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import PsycoInfo from "./PsycoInfo/PsycoInfo";
import TacticalInfo from "./TacticalInfo/TacticalInfo";
import "./PlayerInfo.css";
import AvatarPlayer from "./AvatarPlayer/AvatarPlayer";

export const PlayerInfo: React.FC = () => {
  const [info, setInfo] = useState("");
  return (
    <IonContent>
      <AvatarPlayer />
      <div className="nombre-pais">
        <IonItem className="ion-text-center" lines="none">
          <IonLabel className="nombre">PlayerName</IonLabel>
        </IonItem>
        <IonItem className="ion-text-center" lines="none">
          <IonLabel className="locacion">
            <IonIcon icon={locationOutline}></IonIcon> Ciudad/País
          </IonLabel>
        </IonItem>
      </div>
      {/*-- Scrollable Segment --*/}
      <IonSegment scrollable value="personal" className="menu-horizontal">
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
          <IonLabel>Datos tacticos</IonLabel>
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
          <IonLabel>Datos psicologicos</IonLabel>
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
