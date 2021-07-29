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

export async function selectPostulant(
  callId: string,
  playerId: string,
  isSelected: boolean
) {
  try {
    const res = await firestore.collection(COLLECTIONS.CALLS).doc(callId);
    res.get().then((doc) => {
      if (doc.exists) {
        const changeSelected = !isSelected;
        res.update({
          postulatedPlayers: firebase.firestore.FieldValue.arrayRemove({
            playerId,
            isSelected: changeSelected,
          }),
        });
      }
      res.update({
        postulatedPlayers: firebase.firestore.FieldValue.arrayUnion({
          playerId,
          isSelected,
        }),
      });
    });
    return true;
  } catch (error) {
    return false;
  }
}
