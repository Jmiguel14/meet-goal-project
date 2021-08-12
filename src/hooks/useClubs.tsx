import { useEffect, useState } from "react";
import firebase from "firebase";
import { listtenAllClubs } from "firebase/clubsList";

export const useClubs = () => {
  const [allClubs, setAllClubs] = useState<firebase.firestore.DocumentData>([]);
  useEffect(() => {
    const unsubscribe = listtenAllClubs(setAllClubs);
    return () => unsubscribe && unsubscribe();
  }, []);

  return allClubs;
};
