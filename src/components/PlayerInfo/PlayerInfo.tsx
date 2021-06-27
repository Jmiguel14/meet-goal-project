import {
  IonAvatar,
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
      <IonItem className="ion-text-center" lines="none">
        <IonLabel class="nombre">PlayerName</IonLabel>
      </IonItem>
      <IonItem className="ion-text-center" lines="none">
        <IonLabel class="locacion">
          <IonIcon icon={locationOutline}></IonIcon> Ciudad/País
        </IonLabel>
      </IonItem>
      {/*-- Scrollable Segment --*/}
      <IonSegment scrollable value="personal">
        <IonSegmentButton
          value="personal"
          class="segments"
          onClick={() => setInfo("personal")}
        >
          <IonLabel>Datos Personales</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="tactica"
          class="segments"
          onClick={() => setInfo("tactica")}
        >
          <IonLabel>Datos tacticos</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="carrera"
          class="segments"
          onClick={() => setInfo("carrera")}
        >
          <IonLabel>Experiencia</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="medica"
          class="segments"
          onClick={() => setInfo("medica")}
        >
          <IonLabel>Datos medicos</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="psico"
          class="segments"
          onClick={() => setInfo("psico")}
        >
          <IonLabel>Datos psicologicos</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="canales"
          class="segments"
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
