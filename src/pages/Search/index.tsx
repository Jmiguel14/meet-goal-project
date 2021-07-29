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
import { Routes } from "constants/routes";
import CallsSegment from "components/CallSegment";
import { useCurrentUserData } from "hooks/useCurrentUserData";
import { USER_TYPES } from "constants/userTypes";

const SearchForPlayer: React.FC = () => {
  const { segment: paramSegment } = useParams<{ segment: string }>();
  const [segment, setSegment] = useState<string>(paramSegment);
  const currentUserData = useCurrentUserData();

  useEffect(() => {
    setSegment(paramSegment);
  }, [paramSegment]);

  const SEGMENTS = {
    clubs: <ClubsSegment />,
    calls: <CallsSegment />,
    players: <PlayersSegment />,
  } as { [index: string]: JSX.Element };

  const history = useHistory();

  const ROUTES_SEGMENTS = {
    clubs: () => history.push(Routes.SEARCH_CLUBS),
    calls: () => history.push(Routes.SEARCH_CALLS),
    players: () => history.push(Routes.SEARCH_PLAYERS),
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
        {currentUserData?.userType === USER_TYPES.JUGADOR ? (
          <>
            <IonRow className={styles.segments}>
              <IonCol size="12">
                <IonSegment
                  scrollable
                  value={segment}
                  onIonChange={handleChange}
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
          </>
        ) : (
          <>{segment && SEGMENTS[segment]}</>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SearchForPlayer;
