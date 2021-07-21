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
import { toTitleCase } from "utils/toTitleCase";
import { SkeletonList } from "components/Skeletons/SkeletonList";

const PlayersSegment = () => {
  const [players, setPlayers] = useState<firebase.firestore.DocumentData>();
  const [lastKey, setLastKey] = useState<
    firebase.firestore.Timestamp | undefined
  >();
  const [disableInfinitiScroll, setDisableInfinitiScroll] =
    useState<boolean>(false);

  const [searchText, setSearchText] = useState<string | undefined>("");
  const [oldPlayers, setOldPlayers] = useState<firebase.firestore.DocumentData>(
    []
  );
  const [filteredPlayers, setFilteredPlayers] = useState<
    firebase.firestore.DocumentData | undefined
  >([]);

  useEffect(() => {
    const unsubscribe = listtenFirstPlayersBatch(setPlayers, setLastKey);
    return () => unsubscribe && unsubscribe();
  }, []);

  function searchNext($event: CustomEvent<void>) {
    listtenNextPlayersBatch(
      (newPlayers) => {
        setPlayers(players?.concat(newPlayers));
      },
      setLastKey,
      lastKey
    );

    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  const allPlayers = usePlayers();

  useEffect(() => {
    if (players?.length === allPlayers.length) {
      setDisableInfinitiScroll(true);
    } else {
      setDisableInfinitiScroll(false);
    }
  }, [players]);

  useEffect(() => {
    const oldPlayers = allPlayers.map((player: Player) => {
      const { name, pospri } = player;
      const lowerCaseName = name.toLowerCase();
      const lowerCasePlayerPosition = pospri?.toLowerCase();
      return {
        ...player,
        name: lowerCaseName,
        pospri: lowerCasePlayerPosition,
      };
    });
    setOldPlayers(oldPlayers);
  }, [allPlayers]);

  useEffect(() => {
    if (searchText !== "") {
      let newList = [];
      newList = oldPlayers.filter(
        (player: Player) =>
          player.name.includes(searchText?.toLowerCase()!) ||
          player.pospri?.includes(searchText?.toLowerCase()!)
      );
      const newListMapped = newList.map((list: Player) => {
        const { name, pospri } = list;
        const nameToTitleCase = toTitleCase(name);
        const pospriToTitleCase = toTitleCase(pospri);
        return {
          ...list,
          name: nameToTitleCase,
          pospri: pospriToTitleCase,
        };
      });
      setFilteredPlayers(newListMapped);
    } else {
      setFilteredPlayers(players);
    }
  }, [searchText, oldPlayers, players]);

  const handleChange = (e: CustomEvent<SearchbarChangeEventDetail>) => {
    const searchValue = e.detail.value;
    setSearchText(searchValue);
  };

  return (
    <>
      <IonRow>
        <IonCol>
          {players ? (
            <>
              <IonRow className={styles.searchBar}>
                <IonCol size="12">
                  <IonSearchbar
                    placeholder="Buscar por nombre o por posición"
                    value={searchText}
                    onIonChange={handleChange}
                  ></IonSearchbar>
                </IonCol>
              </IonRow>
              <PlayersList
                players={filteredPlayers}
                disableInfinitiScroll={disableInfinitiScroll}
                onSearchNext={searchNext}
              />
            </>
          ) : (
            <SkeletonList />
          )}
        </IonCol>
      </IonRow>
    </>
  );
};

export default PlayersSegment;
