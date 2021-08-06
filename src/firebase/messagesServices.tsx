import { COLLECTIONS } from "constants/collections";
import { firestore } from "./client";
import firebase from "firebase/app";

export async function discoveringChatRoom(clubId: string, playerId: string) {
  let chatId;
  await firestore
    .collection(COLLECTIONS.CHATS)
    .where("playerId", "==", playerId)
    .where("clubId", "==", clubId)
    .get()
    .then(async (snapshot) => {
      let cont = 0;
      snapshot.docs.map((doc) => {
        if (doc.exists) {
          cont++;
          chatId = doc.id;
          console.log(chatId);
        }
      });
      if (cont === 0) {
        const Id = await newChatRoom(clubId, playerId);
        console.log(Id);
        chatId = Id;
      }
    });
  console.log(chatId);
  return chatId;
}

export async function newChatRoom(clubId: string, playerId: string) {
  let chatId: string = "";
  await firestore
    .collection(COLLECTIONS.CHATS)
    .add({
      clubId,
      playerId,
    })
    .then((docRef) => {
      chatId = docRef.id;
      console.log(chatId);
    })
    .catch((e) => {
      console.log(e);
    });
  return chatId;
}

export async function getChatMessages(
  chatId: string,
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >
) {
  return firestore
    .collection(COLLECTIONS.MESSAGES)
    .where("chatId", "==", chatId)
    .orderBy("createdAt", "asc")
    .onSnapshot((snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        const data = { id: doc.id, ...doc.data() };
        return data;
      });
      callback(newData);
    });
}

export async function newMessage(
  chatId: string,
  senderId: string,
  message: string
) {
  await firestore.collection(COLLECTIONS.MESSAGES).add({
    chatId,
    senderId,
    message,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  });
}
