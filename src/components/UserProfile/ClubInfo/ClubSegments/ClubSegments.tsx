import {
  IonContent,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import React, { useState } from "react";
import InstitutionalInfo from "../InstitutionalInfo/InstitutionalInfo";
import SportsGoalsInfo from "../SportsGoalsInfo/SportsGoalsInfo";

import styles from "./styles.module.css";

export const ClubSegments: React.FC = () => {
  const [info, setInfo] = useState("institucional");
  return (
    <IonContent>
      <IonSegment scrollable value={info} className={styles.menu_horizontal}>
        <IonSegmentButton
          value="institucional"
          className={styles.segments}
          onClick={() => setInfo("institucional")}
        >
          <IonLabel>Datos Instintucionales</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton
          value="logros"
          className={styles.segments}
          onClick={() => setInfo("logros")}
        >
          <IonLabel>Logros deportivos</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      <>
        {info === "institucional" ? <InstitutionalInfo /> : <div></div>}
        {info === "logros" ? <SportsGoalsInfo /> : <div></div>}
      </>
    </IonContent>
  );
};

export default ClubSegments;
