import {
  IonCol,
  IonRow,
  IonSearchbar,
} from "@ionic/react";
import {
  listtenFirstPlayersBatch,
  listtenNextPlayersBatch,
} from "firebase/playerList";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { usePlayers } from "hooks/usePlayers";
import styles from "./styles.module.css";
import { PlayersList } from "components/PlayersList";

const PlayersSegment = () => {
  const [players, setPlayers] = useState<firebase.firestore.DocumentData>([]);
  const [lastKey, setLastKey] = useState<
    firebase.firestore.Timestamp | undefined
  >();
  const [disableInfinitiScroll, setDisableInfinitiScroll] =
    useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = listtenFirstPlayersBatch(setPlayers, setLastKey);
    return () => unsubscribe && unsubscribe();
  }, []);

  function searchNext($event: CustomEvent<void>) {
    listtenNextPlayersBatch(
      (newPlayers) => {
        setPlayers(players.concat(newPlayers));
      },
      setLastKey,
      lastKey
    );

    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  const allPlayers = usePlayers();
  console.log("allPlayers", allPlayers);

  useEffect(() => {
    if (players.length === allPlayers.length) {
      setDisableInfinitiScroll(true);
    } else {
      setDisableInfinitiScroll(false);
    }
  }, [players]);

  return (
    <>
      <IonRow>
        <IonCol>
        <IonRow className={styles.searchBar}>
          <IonCol size="12">
            <IonSearchbar placeholder='Buscar'></IonSearchbar>
          </IonCol>
        </IonRow>
            <PlayersList players={players} disableInfinitiScroll={disableInfinitiScroll} onSearchNext={searchNext}/>
        </IonCol>
      </IonRow>
    </>
  );
};

export default PlayersSegment;
