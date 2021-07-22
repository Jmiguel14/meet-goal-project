import { useEffect, useState } from "react";
import firebase from "firebase";
import { listtenAllCalls } from "firebase/callsList";

export const useCalls = () => {
  const [allCalls, setAllCalls] = useState<firebase.firestore.DocumentData>([]);
  useEffect(() => {
    const unsubscribe = listtenAllCalls(setAllCalls);
    return () => unsubscribe && unsubscribe();
  }, []);
  return allCalls;
};
