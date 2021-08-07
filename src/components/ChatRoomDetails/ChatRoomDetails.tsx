import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { getAChatRoomData, getUserChatData } from "firebase/messagesServices";
import { useAuth } from "contexts/AuthContext";
import { IonAvatar, IonCard, IonLabel } from "@ionic/react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    getAChatRoomData(id!, (data) => {
      setChatRoomData(data);
    });
  }, [id]);

  useEffect(() => {
    if (chatRoomData?.clubId === currentUser.uid) {
      const receiverId = chatRoomData?.playerId;
      readReceiverData(receiverId);
    } else {
      if (chatRoomData?.playerId === currentUser.uid) {
        const receiverId = chatRoomData?.clubId;
        readReceiverData(receiverId);
      }
    }
    async function readReceiverData(receiverId: string) {
      await getUserChatData(receiverId, setReceiverData);
    }
  }, [currentUser, chatRoomData]);
  return (
    <>
      <Link to={`/tabs/chats/${id}`}>
        <IonCard>
          <IonAvatar>
            <img src={receiverData?.avatarURL}></img>
          </IonAvatar>
          <IonLabel>{receiverData?.name}</IonLabel>
        </IonCard>
      </Link>
    </>
  );
};

export default ChatRoomDetails;
