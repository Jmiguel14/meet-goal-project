import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import PlayerList from "components/PlayerList";
import { arrowBackOutline } from "ionicons/icons";
import { useState } from "react";
import styles from "./styles.module.css";

const SearchForPlayer: React.FC = () => {
  const [segment, setSegment] = useState<string | undefined>("clubs");

  const SEGMENTS = {
    clubs: <IonLabel>Clubs</IonLabel>,
    calls: <IonLabel>Convocatorias</IonLabel>,
    players: <PlayerList />,
  } as { [index: string]: JSX.Element };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="regresar" color="light">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={arrowBackOutline} />
          </IonButton>
          <IonTitle>Búsqueda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar></IonSearchbar>
        <IonSegment
          value={segment}
          onIonChange={(e) => {
            console.log(e);
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
        {segment && SEGMENTS[segment]}
      </IonContent>
    </IonPage>
  );
};

export default SearchForPlayer;
