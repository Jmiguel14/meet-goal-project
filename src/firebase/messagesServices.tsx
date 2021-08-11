import { COLLECTIONS } from "constants/collections";
import { firestore } from "./client";
import firebase from "firebase/app";
import { USER_TYPES } from "constants/userTypes";

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
        }
      });
      if (cont === 0) {
        const Id = await newChatRoom(clubId, playerId);
        chatId = Id;
      }
    });
  return chatId;
}

export async function newChatRoom(clubId: string, playerId: string) {
  let chatId: string = "";
  await firestore
    .collection(COLLECTIONS.CHATS)
    .add({
      clubId,
      playerId,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    })
    .then((docRef) => {
      chatId = docRef.id;
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

export async function getMyChatsRooms(
  userId: string,
  userType: string,
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >
) {
  if (userType === USER_TYPES.JUGADOR) {
    return firestore
      .collection(COLLECTIONS.CHATS)
      .where("playerId", "==", userId)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newData = snapshot.docs.map((doc) => {
          const data = { id: doc.id, ...doc.data() };
          return data;
        });
        callback(newData);
      });
  } else if (userType === USER_TYPES.CLUB) {
    return firestore
      .collection(COLLECTIONS.CHATS)
      .where("clubId", "==", userId)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newData = snapshot.docs.map((doc) => {
          const data = { id: doc.id, ...doc.data() };
          return data;
        });
        callback(newData);
      });
  }
}

export async function getUserChatData(
  id: string,
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >
) {
  return firestore
    .collection(COLLECTIONS.USERS)
    .doc(id)
    .onSnapshot((doc) => {
      const data = { id: doc.id, ...doc.data() };
      callback(data);
    });
}

export async function getAChatRoomData(
  chatRoomId: string,
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >
) {
  return firestore
    .collection(COLLECTIONS.CHATS)
    .doc(chatRoomId)
    .onSnapshot((doc) => {
      const data = { id: doc.id, ...doc.data() };
      callback(data);
    });
}

export async function getLastChatMessage(
  chatRoomId: string,
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >
) {
  return firestore
    .collection(COLLECTIONS.MESSAGES)
    .where("chatId", "==", chatRoomId)
    .orderBy("createdAt", "desc")
    .limit(1)
    .onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        callback(data);
      });
    });
}
