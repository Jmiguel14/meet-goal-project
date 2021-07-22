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
import ClubsSegment from "components/ClubsSegment";
import PlayersSegment from "components/PlayersSegment";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { SegmentChangeEventDetail } from "@ionic/core";
import { useHistory, useParams } from "react-router";

const SearchForPlayer: React.FC = () => {
  const { segment: paramSegment } = useParams<{ segment: string }>();
  const [segment, setSegment] = useState<string>(paramSegment);
  console.log("paramSegment", paramSegment);
  console.log("segment", segment);

  useEffect(() => {
    setSegment(paramSegment);
  }, [paramSegment]);

  const SEGMENTS = {
    clubs: <ClubsSegment />,
    calls: <IonLabel>Convocatorias</IonLabel>,
    players: <PlayersSegment />,
  } as { [index: string]: JSX.Element };

  const history = useHistory();

  const ROUTES_SEGMENTS = {
    clubs: () => history.push("/tabs/busqueda/clubs"),
    calls: () => history.push("/tabs/busqueda/calls"),
    players: () => history.push("/tabs/busqueda/players"),
  } as { [index: string]: () => void };

  useEffect(() => {
    ROUTES_SEGMENTS[segment]();
  }, [segment]);

  const handleChange = (e: CustomEvent<SegmentChangeEventDetail>) => {
    const value = e.detail.value;
    setSegment(value!);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="regresar" color="light">
          <IonTitle>Búsqueda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow className={styles.segments}>
          <IonCol size="12">
            <IonSegment scrollable value={segment} onIonChange={handleChange}>
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
