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
  const PLAYERSEGMENTS = {
    personal: <PersonalInfo />,
    tactical: <TacticalInfo />,
    career: <CareerInfo />,
    medical: <MedicalInfo />,
    psyco: <PsycoInfo />,
    channels: <ChannelsInfo />,
  } as { [index: string]: JSX.Element };
  const [info, setInfo] = useState<string | undefined>("personal");
  return (
    <>
      <IonSegment
        scrollable
        value={info}
        className={styles.menu_horizontal}
        onIonChange={(e) => {
          const value = e.detail.value;
          setInfo(value);
        }}
      >
        <IonSegmentButton value="personal">
          <IonLabel>Datos Personales</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="tactical">
          <IonLabel>Datos tácticos</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="career">
          <IonLabel>Experiencia</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="medical">
          <IonLabel>Datos médicos</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="psyco">
          <IonLabel>Datos psicológicos</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="channels">
          <IonLabel>Canales</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      {info && PLAYERSEGMENTS[info]}
    </>
  );
};

export default PlayerSegments;
