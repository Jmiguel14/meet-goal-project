import {
  IonContent,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import React, { useState } from "react";
import CareerInfo from "../CareerInfo/CareerInfo";
import ChannelsInfo from "../ChannelsInfo/ChannelsInfo";
import MedicalInfo from "../MedicalInfo/MedicalInfo";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import PsycoInfo from "../PsycoInfo/PsycoInfo";
import TacticalInfo from "../TacticalInfo/TacticalInfo";

import styles from "./styles.module.css";

export const PlayerSegments: React.FC = () => {
  const [info, setInfo] = useState("personal");
  return (
    <IonContent>
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

export default PlayerSegments;
