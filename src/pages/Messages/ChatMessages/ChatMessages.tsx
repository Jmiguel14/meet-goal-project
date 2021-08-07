import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import styles from "./styles.module.css";
import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import {
  getAChatRoomData,
  getChatMessages,
  getUserChatData,
  newMessage,
} from "firebase/messagesServices";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "contexts/AuthContext";
import { Avatar } from "components/Avatar";
import SendMessage from "components/SendMessage/SendMessage";

const ChatMessages = () => {
  const { id } = useParams<{ id?: string }>();
  const { currentUser } = useAuth();
  const [messagesList, setMessagesList] =
    useState<firebase.firestore.DocumentData>();

  const [chatRoomData, setChatRoomData] =
    useState<firebase.firestore.DocumentData>();

  const [senderData, setSenderData] =
    useState<firebase.firestore.DocumentData>();

  const [receiverData, setReceiverData] =
    useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    getChatMessages(id!, (data) => {
      setMessagesList(data);
    });
  }, [id]);

  useEffect(() => {
    getAChatRoomData(id!, (data) => {
      setChatRoomData(data);
    });
  }, []);

  useEffect(() => {
    getUserChatData(currentUser.uid, setSenderData);
  }, [currentUser]);

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

  console.log("chatRoomData", chatRoomData);
  console.log("senderData", senderData?.id);
  console.log("receiverData", receiverData?.id);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="regresar" className={styles.back}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>
          <div className={styles.message_container}>
            {messagesList?.map((message: any, index: number) => (
              <IonCard
                id="message"
                key={index}
                className={
                  message.senderId === currentUser.uid
                    ? styles.message_box_sender
                    : styles.message_box_receiver
                }
              >
                <div className={styles.message_text_container}>
                  <IonRow>
                    <IonCol size="auto">
                      <IonAvatar className={styles.avatar}>
                        <img
                          src={
                            message?.senderId === currentUser.uid
                              ? `${senderData?.avatarURL}`
                              : `${receiverData?.avatarURL}`
                          }
                        ></img>
                      </IonAvatar>
                    </IonCol>
                    <IonCol>
                      <IonLabel className={styles.userName_message}>
                        {message?.senderId === currentUser.uid
                          ? senderData?.name
                          : receiverData?.name}
                      </IonLabel>
                    </IonCol>
                  </IonRow>
                  <div>
                    <IonLabel className={styles.message_text}>
                      {message.message}
                    </IonLabel>
                  </div>
                </div>
              </IonCard>
            ))}
          </div>
          <SendMessage chatRoomId={id}></SendMessage>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ChatMessages;
