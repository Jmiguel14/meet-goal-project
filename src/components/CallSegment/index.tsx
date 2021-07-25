import { useEffect, useState } from "react";
import firebase from "firebase";
import {
  listtenFirstCallsBatch,
  listtenNextCallsBatch,
} from "firebase/callsList";
import { useCalls } from "hooks/useCalls";
import { NewCallDataForm } from "types";
import { toTitleCase } from "utils/toTitleCase";
import { SearchbarChangeEventDetail } from "@ionic/core";
import { IonCol, IonRow, IonSearchbar } from "@ionic/react";
import { SkeletonList } from "components/Skeletons/SkeletonList";
import styles from "./styles.module.css";
import { CallsList } from "components/CallsList";

const CallsSegment = () => {
  const [calls, setCalls] = useState<firebase.firestore.DocumentData>();
  const [lastKey, setLastKey] = useState<
    firebase.firestore.Timestamp | undefined
  >();
  const [disableInfinitiScroll, setDisableInfinitiScroll] =
    useState<boolean>(false);

  const [searchText, setSearchText] = useState<string | undefined>("");
  const [oldCalls, setOldCalls] = useState<firebase.firestore.DocumentData>([]);
  const [filteredCalls, setFilteredCalls] = useState<
    firebase.firestore.DocumentData | undefined
  >([]);

  useEffect(() => {
    const unsubscribe = listtenFirstCallsBatch(setCalls, setLastKey);
    return () => unsubscribe && unsubscribe();
  }, []);

  function searchNext($event: CustomEvent<void>) {
    listtenNextCallsBatch(
      (newCalls) => {
        setCalls(calls?.concat(newCalls));
      },
      setLastKey,
      lastKey
    );

    ($event.target as HTMLIonInfiniteScrollElement).complete();
  }

  const allCalls = useCalls();

  useEffect(() => {
    if (calls?.length === allCalls.length) {
      setDisableInfinitiScroll(true);
    } else {
      setDisableInfinitiScroll(false);
    }
  }, [calls]);

  useEffect(() => {
    const oldCalls = allCalls.map((call: NewCallDataForm) => {
      const { posRequired, ageRequired } = call;
      const lowerCaseageRequired = ageRequired.toLowerCase();
      const lowerCaseposRequired = posRequired.toLowerCase();
      return {
        ...call,
        ageRequired: lowerCaseageRequired,
        posRequired: lowerCaseposRequired,
      };
    });
    setOldCalls(oldCalls);
  }, [allCalls]);

  useEffect(() => {
    if (searchText !== "") {
      let newList = [];
      newList = oldCalls.filter(
        (call: NewCallDataForm) =>
          call.ageRequired?.includes(searchText?.toLowerCase()!) ||
          call.posRequired?.includes(searchText?.toLowerCase()!)
      );
      const newListMapped = newList.map((list: NewCallDataForm) => {
        const { posRequired, ageRequired } = list;
        const ageRequiredToTitleCase = toTitleCase(ageRequired);
        const posRequiredToTitleCase = toTitleCase(posRequired);
        return {
          ...list,
          ageRequired: ageRequiredToTitleCase,
          posRequired: posRequiredToTitleCase,
        };
      });
      setFilteredCalls(newListMapped);
    } else {
      setFilteredCalls(calls);
    }
  }, [searchText, oldCalls, calls]);

  const handleChange = (e: CustomEvent<SearchbarChangeEventDetail>) => {
    const searchValue = e.detail.value;
    setSearchText(searchValue);
  };

  return (
    <>
      <IonRow>
        <IonCol>
          {calls ? (
            <>
              <IonRow className={styles.searchBar}>
                <IonCol size="12">
                  <IonSearchbar
                    placeholder="Buscar por posición requerida"
                    value={searchText}
                    onIonChange={handleChange}
                  ></IonSearchbar>
                </IonCol>
              </IonRow>
              <CallsList
                calls={filteredCalls}
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

export default CallsSegment;
