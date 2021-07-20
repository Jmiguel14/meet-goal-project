import { COLLECTIONS } from "constants/collections";
import firebase from "firebase/app";
import { auth, firestore } from "./client";

export async function addNewClubCall(
  clubId: string,
  ageRequired: string,
  posRequired: string,
  startDate: string,
  endDate: string,
  extraDetails: string
) {
  try {
    await firestore.collection(COLLECTIONS.CALLS).add({
      clubId,
      ageRequired,
      posRequired,
      startDate: firebase.firestore.Timestamp.fromDate(new Date(startDate)),
      endDate: firebase.firestore.Timestamp.fromDate(new Date(endDate)),
      extraDetails,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      postulatedPlayers: {},
    });
    return true;
  } catch (e) {
    return false;
  }
}
export const getCallsData = (
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >
) => {
  let id = auth.currentUser?.uid;
  return firestore
    .collection(COLLECTIONS.CALLS)
    .where("clubId", "==", id)
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        const data = { id: doc.id, ...doc.data() };
        return data;
      });
      callback(newData);
    });
};
export const getACallData = (
  id: string | undefined,
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >
) => {
  return firestore
    .collection(COLLECTIONS.CALLS)
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        callback(data);
      }
    });
};

export const getOwnCallData = (
  id: string | undefined,
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >
) => {
  return firestore
    .collection(COLLECTIONS.USERS)
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        callback(data);
      }
    });
};