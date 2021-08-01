import { COLLECTIONS } from "constants/collections";
import firebase from "firebase/app";
import { auth, firestore } from "./client";

export async function newNotification(
  receiverId: string,
  notification: string,
  title: string
) {
  await firestore.collection(COLLECTIONS.NOTIFICATIONS).add({
    receiverId,
    title,
    notification,
    isSeen: false,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  });
}

export const getUserNotifications = (
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >
) => {
  let id = auth.currentUser?.uid;
  return firestore
    .collection(COLLECTIONS.NOTIFICATIONS)
    .where("receiverId", "==", id)
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        const data = { id: doc.id, ...doc.data() };
        return data;
      });
      callback(newData);
    });
};
