import { COLLECTIONS } from "constants/collections";
import { firestore } from "./client";
import firebase from "firebase/app";
import { USER_TYPES } from "constants/userTypes";

export const getNewsData = (
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >
) => {
  return firestore
    .collection(COLLECTIONS.NEWS)
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        const data = { id: doc.id, ...doc.data() };
        return data;
      });
      callback(newData);
    });
};
