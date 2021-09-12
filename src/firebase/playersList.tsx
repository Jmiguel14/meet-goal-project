import { COLLECTIONS } from "constants/collections";
import { USER_TYPES } from "constants/userTypes";
import { firestore } from "./client";
import firebase from "firebase";

export const listtenFirstPlayersBatch = (
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData>
  >,
  handleLastKey: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | undefined>
  >
) => {
  return firestore
    .collection(COLLECTIONS.USERS)
    .where("userType", "==", USER_TYPES.PLAYER)
    .orderBy("createdAt", "desc")
    .limit(15)
    .onSnapshot((snapshot) => {
      let lastKey = {} as firebase.firestore.Timestamp;
      const newData = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;
        lastKey = createdAt;
        return {
          ...data,
          id,
        };
      });
      callback(newData);
      handleLastKey(lastKey);
    });
};

export const listtenNextPlayersBatch = (
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData>
  >,
  handleLastKey: React.Dispatch<
    React.SetStateAction<firebase.firestore.Timestamp | undefined>
  >,
  key: firebase.firestore.Timestamp | undefined
) => {
  return firestore
    .collection(COLLECTIONS.USERS)
    .where("userType", "==", USER_TYPES.PLAYER)
    .orderBy("createdAt", "desc")
    .startAfter(key)
    .limit(15)
    .onSnapshot((snapshot) => {
      let lastKey = {} as firebase.firestore.Timestamp | undefined;
      const newData = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;
        lastKey = createdAt;
        return {
          ...data,
          id,
        };
      });
      callback(newData);
      handleLastKey(lastKey);
    });
};

export const listtenAllPlayers = (
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData>
  >
) => {
  return firestore
    .collection(COLLECTIONS.USERS)
    .where("userType", "==", USER_TYPES.PLAYER)
    .onSnapshot((snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return {
          ...data,
          id,
        };
      });
      callback(newData);
    });
};
