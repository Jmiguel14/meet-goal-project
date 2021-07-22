import { useEffect, useState } from "react";
import firebase from "firebase";
import { listtenAllPlayers } from "firebase/playersList";

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
