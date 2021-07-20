import { IonCol, IonRow, IonSearchbar } from "@ionic/react";
import {
  listtenFirstPlayersBatch,
  listtenNextPlayersBatch,
} from "firebase/playerList";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { usePlayers } from "hooks/usePlayers";
import styles from "./styles.module.css";
import { PlayersList } from "components/PlayersList";
import { SearchbarChangeEventDetail } from "@ionic/core";
import { Player } from "types";
import { toTitleCase } from "components/utils/toTitleCase";

const PlayersSegment = () => {
  const [players, setPlayers] = useState<firebase.firestore.DocumentData>([]);
  const [lastKey, setLastKey] = useState<
    firebase.firestore.Timestamp | undefined
  >();
  const [disableInfinitiScroll, setDisableInfinitiScroll] =
    useState<boolean>(false);

  const [searchText, setSearchText] = useState<string | undefined>("");
  const [oldPlayers, setOldPlayers] = useState<firebase.firestore.DocumentData>(
    []
  );
  const [filterPlayers, setFilterPlayers] =
    useState<firebase.firestore.DocumentData>([]);

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

  useEffect(() => {
    const oldPlayers = allPlayers.map((player: Player) => {
      const { name } = player;
      const lowerCaseName = name.toLowerCase();
      return {
        ...player,
        name: lowerCaseName,
      };
    });
    setOldPlayers(oldPlayers);
  }, [allPlayers]);

  useEffect(() => {
    if (searchText !== "") {
      let newList = [];
      newList = oldPlayers.filter((player: Player) =>
        player.name.includes(searchText?.toLowerCase()!)
      );
      const newListMapped = newList.map((list: Player) => {
        const { name } = list;
        const nameToTitleCase = toTitleCase(name);
        return {
          ...list,
          name: nameToTitleCase,
        };
      });
      setFilterPlayers(newListMapped);
    } else {
      setFilterPlayers(players);
    }
  }, [searchText, oldPlayers, players]);
  console.log("players", players);
  console.log("oldPlayers", oldPlayers);
  console.log("newPlayers", filterPlayers);

  const handleChange = (e: CustomEvent<SearchbarChangeEventDetail>) => {
    const searchValue = e.detail.value;
    setSearchText(searchValue);
  };

  return (
    <>
      <IonRow>
        <IonCol>
          <IonRow className={styles.searchBar}>
            <IonCol size="12">
              <IonSearchbar
                placeholder="Buscar"
                value={searchText}
                onIonChange={handleChange}
              ></IonSearchbar>
            </IonCol>
          </IonRow>
          <PlayersList
            players={filterPlayers}
            disableInfinitiScroll={disableInfinitiScroll}
            onSearchNext={searchNext}
          />
        </IonCol>
      </IonRow>
    </>
  );
};

export default PlayersSegment;
