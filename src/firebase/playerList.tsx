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
      .where("userType", "==", USER_TYPES.JUGADOR)
      .orderBy("createAt", "desc")
      .limit(15)
      .onSnapshot((snapshot) => {
        let lastKey = {} as firebase.firestore.Timestamp;
        const newData = snapshot.docs.map((doc) => {
          const data = doc.data();
          const { createAt } = data;
          lastKey = createAt;
          return data;
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
      .where("userType", "==", USER_TYPES.JUGADOR)
      .orderBy("createAt", "desc")
      .startAfter(key)
      .limit(15)
      .onSnapshot((snapshot) => {
        let lastKey = {} as firebase.firestore.Timestamp | undefined;
        const newData = snapshot.docs.map((doc) => {
          const data = doc.data();
          const { createAt } = data;
          lastKey = createAt;
          return data;
        });
        callback(newData);
        handleLastKey(lastKey);
      });
  };
  
  export const listtenAllPlayers = (callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData>
  >) => {
    return firestore
      .collection(COLLECTIONS.USERS)
      .where("userType", "==", USER_TYPES.JUGADOR)
      .onSnapshot((snapshot) => {
        const newData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return data;
        });
        callback(newData)
      });
  }