import { COLLECTIONS } from "constants/collections";
import { auth, firestore } from "./client";
import firebase from "firebase/app";

export async function setPostulation(callId: string, playerId: string) {
  try {
    const res = await firestore.collection(COLLECTIONS.CALLS).doc(callId);
    res.get().then((doc) => {
      if (doc.exists) {
        if (typeof doc.data()?.postulatedPlayers === undefined) {
          res.update({
            poslutatedPlayers: [
              {
                playerId,
                isSelected: false,
              },
            ],
          });
          res.update({
            poslutatedPlayersId: [playerId],
          });
        } else {
          res.update({
            postulatedPlayers: firebase.firestore.FieldValue.arrayUnion({
              playerId,
              isSelected: false,
            }),
          });
          res.update({
            postulatedPlayersId:
              firebase.firestore.FieldValue.arrayUnion(playerId),
          });
        }
      }
    });
    return true;
  } catch (error) {
    return false;
  }
}

export const getMyCallsPostulated = (
  playerId: string,
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >
) => {
  return firestore
    .collection(COLLECTIONS.CALLS)
    .where("postulatedPlayersId", "array-contains", playerId)
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        const data = { id: doc.id, ...doc.data() };
        return data;
      });
      callback(newData);
    });
};
