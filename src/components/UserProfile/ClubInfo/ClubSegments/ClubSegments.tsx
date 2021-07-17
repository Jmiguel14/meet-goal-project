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
  const CLUBSEGMENTS = {
    institutional: <InstitutionalInfo />,
    goals: <SportsGoalsInfo />,
  } as { [index: string]: JSX.Element };

  const [info, setInfo] = useState<string | undefined>("institutional");
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
        <IonSegmentButton value="institutional">
          <IonLabel>Datos Institucionales</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="goals">
          <IonLabel>Logros deportivos</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      {info && CLUBSEGMENTS[info]}
    </>
  );
};

export default ClubSegments;
