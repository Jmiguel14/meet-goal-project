import { COLLECTIONS } from "constants/collections";
import firebase from "firebase/app";
import { auth, firestore } from "./client";

export async function newNotification(
  receiverId: string,
  notification: string
) {
  await firestore.collection(COLLECTIONS.NOTIFICATIONS).add({
    receiverId,
    notification,
    isSeen: false,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  });
}
