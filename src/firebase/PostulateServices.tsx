import { COLLECTIONS } from "constants/collections";
import firebase from "firebase/app";
import PlayerDashboard from "pages/Dashboard/Dashboard";
import { Player } from "types";
import { auth, firestore } from "./client";
export const getPlayerData = (
  id: string | undefined,
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >
) => {
  return firestore
    .collection(COLLECTIONS.USERS)
    .doc(id)
    .onSnapshot((doc) => {
      const data = { id: doc.id, ...doc.data() };
      callback(data);
    });
};

export const getPostulatedsData = (
  id: [],
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData>
  >
) => {
  return firestore
    .collection(COLLECTIONS.USERS)
    .where(firebase.firestore.FieldPath.documentId(), "in", id)
    .onSnapshot((snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        const data = { id: doc.id, ...doc.data() };
        return data;
      });
      callback(newData);
    });
};
