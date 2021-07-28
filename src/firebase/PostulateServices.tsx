import { COLLECTIONS } from "constants/collections";
import firebase from "firebase/app";
import { firestore } from "./client";

export const getPlayersPostulationData = (
  playersId: [],
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData>
  >
) => {
  return firestore
    .collection(COLLECTIONS.USERS)
    .where(firebase.firestore.FieldPath.documentId(), "in", playersId)
    .onSnapshot((snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        const data = { id: doc.id, ...doc.data() };
        return data;
      });
      callback(newData);
    });
};
