import {
  IonAvatar,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { useAuth } from "contexts/AuthContext";
import firebase from "firebase/app";
import {
  getAChatRoomData,
  getLastChatMessage,
  getUserChatData,
} from "firebase/messagesServices";
import { caretForward } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export interface props {
  id: string;
}

const ChatRoomDetails = (props: props) => {
  const { id } = props;
  const { currentUser } = useAuth();
  const [chatRoomData, setChatRoomData] =
    useState<firebase.firestore.DocumentData>();

  const [receiverData, setReceiverData] =
    useState<firebase.firestore.DocumentData>();

  const [lastMessage, setLastMessage] =
    useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    let unMounted = false;
    if (!unMounted) {
      getAChatRoomData(id!, (data) => {
        setChatRoomData(data);
      });
      return () => {
        unMounted = true;
      };
    }
  }, [id]);

  useEffect(() => {
    let unMounted = false;
    if (!unMounted) {
      if (chatRoomData?.clubId === currentUser.uid) {
        const receiverId = chatRoomData?.playerId;
        readReceiverData(receiverId);
      } else {
        if (chatRoomData?.playerId === currentUser.uid) {
          const receiverId = chatRoomData?.clubId;
          readReceiverData(receiverId);
        }
      }
    }
    async function readReceiverData(receiverId: string) {
      await getUserChatData(receiverId, setReceiverData);
    }
    return () => {
      unMounted = true;
    };
  }, [currentUser, chatRoomData]);

  useEffect(() => {
    getLastChatMessage(id!, (data) => {
      setLastMessage(data);
    });
  }, [id]);
  return (
    <>
      <Link to={`/tabs/chats/${id}`} className={styles.goChat}>
        <IonCard className={styles.message_details}>
          <IonItem>
            <IonAvatar slot="start">
              <img src={receiverData?.avatarURL}></img>
            </IonAvatar>
            <IonLabel position="stacked">
              <h1 className={styles.userName}>{receiverData?.name}</h1>
            </IonLabel>
            <IonText className={styles.message}>{lastMessage?.message}</IonText>
            <IonIcon slot="end" icon={caretForward} color="primary"></IonIcon>
          </IonItem>
        </IonCard>
      </Link>
    </>
  );
};

export default ChatRoomDetails;
