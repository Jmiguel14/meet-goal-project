import { COLLECTIONS } from "constants/collections";
import { USER_TYPES } from "constants/userTypes";
import { firestore } from "firebase/client";
import { useEffect, useState } from "react";
import firebase from "firebase";
import { listtenAllPlayers } from "firebase/playerList";

export const usePlayers = () => {
  const [allPlayers, setAllPlayers] = useState<firebase.firestore.DocumentData>(
    []
  );
  useEffect(() => {
    const unsubscribe = listtenAllPlayers(setAllPlayers);
    return () => unsubscribe && unsubscribe();
  }, []);

  return allPlayers;
};
