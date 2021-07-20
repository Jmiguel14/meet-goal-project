import {
  IonRow,
  IonCol,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import PlayersSegment from "components/PlayersSegment";
import { useState } from "react";
import styles from "./styles.module.css";

const SearchForPlayer: React.FC = () => {
  const [segment, setSegment] = useState<string | undefined>("clubs");

  const SEGMENTS = {
    clubs: <IonLabel>Clubs</IonLabel>,
    calls: <IonLabel>Convocatorias</IonLabel>,
    players: <PlayersSegment />,
  } as { [index: string]: JSX.Element };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="regresar" color="light">
          <IonTitle>Búsqueda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRow className={styles.segments}>
          <IonCol size='12'>
            <IonSegment
              value={segment}
              onIonChange={(e) => {
                const value = e.detail.value;
                setSegment(value);
              }}
            >
              <IonSegmentButton value="clubs">
                <IonLabel>Clubes</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="calls">
                <IonLabel>Convocatorias</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="players">
                <IonLabel>Jugadores</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCol>
        </IonRow>
          {segment && SEGMENTS[segment]}
      </IonContent>
    </IonPage>
  );
};

export default SearchForPlayer;
