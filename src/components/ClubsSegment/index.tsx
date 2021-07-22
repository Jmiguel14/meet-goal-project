import { IonCol, IonRow, IonSearchbar } from "@ionic/react";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import styles from "./styles.module.css";
import { SearchbarChangeEventDetail } from "@ionic/core";
import { Club } from "types";
import { toTitleCase } from "utils/toTitleCase";
import { SkeletonList } from "components/Skeletons/SkeletonList";
import {
  listtenFirstClubsBatch,
  listtenNextClubsBatch,
} from "firebase/clubsList";
import { useClubs } from "hooks/useClubs";
import { ClubsList } from "components/ClubsList";

const ClubsSegment = () => {
  const [clubs, setClubs] = useState<firebase.firestore.DocumentData>();
  const [lastKey, setLastKey] = useState<
    firebase.firestore.Timestamp | undefined
  >();
  const [disableInfinitiScroll, setDisableInfinitiScroll] =
    useState<boolean>(false);

  const [searchText, setSearchText] = useState<string | undefined>("");
  const [oldClubs, setOldClubs] = useState<firebase.firestore.DocumentData>([]);
  const [filteredClubs, setFilteredClubs] = useState<
    firebase.firestore.DocumentData | undefined
  >([]);

  useEffect(() => {
    const unsubscribe = listtenFirstClubsBatch(setClubs, setLastKey);
    return () => unsubscribe && unsubscribe();
  }, []);

  function searchNext($event: CustomEvent<void>) {
    listtenNextClubsBatch(
      (newClubs) => {
        setClubs(clubs?.concat(newClubs));
      },
      setLastKey,
      lastKey
    );

    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  const allClubs = useClubs();

  useEffect(() => {
    if (clubs?.length === allClubs.length) {
      setDisableInfinitiScroll(true);
    } else {
      setDisableInfinitiScroll(false);
    }
  }, [clubs]);

  useEffect(() => {
    const oldClubs = allClubs.map((club: Club) => {
      const { name } = club;
      const lowerCaseName = name.toLowerCase();
      return {
        ...club,
        name: lowerCaseName,
      };
    });
    setOldClubs(oldClubs);
  }, [allClubs]);

  useEffect(() => {
    if (searchText !== "") {
      let newList = [];
      newList = oldClubs.filter((club: Club) =>
        club.name.includes(searchText?.toLowerCase()!)
      );
      const newListMapped = newList.map((list: Club) => {
        const { name } = list;
        const nameToTitleCase = toTitleCase(name);
        return {
          ...list,
          name: nameToTitleCase,
        };
      });
      setFilteredClubs(newListMapped);
    } else {
      setFilteredClubs(clubs);
    }
  }, [searchText, oldClubs, clubs]);

  const handleChange = (e: CustomEvent<SearchbarChangeEventDetail>) => {
    const searchValue = e.detail.value;
    setSearchText(searchValue);
  };

  return (
    <>
      <IonRow>
        <IonCol>
          {clubs ? (
            <>
              <IonRow className={styles.searchBar}>
                <IonCol size="12">
                  <IonSearchbar
                    placeholder="Buscar por nombre"
                    value={searchText}
                    onIonChange={handleChange}
                  ></IonSearchbar>
                </IonCol>
              </IonRow>
              <ClubsList
                clubs={filteredClubs}
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

export default ClubsSegment;
