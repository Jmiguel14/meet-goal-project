import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import styles from "./styles.module.css";
import { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import {
  getAChatRoomData,
  getChatMessages,
  getUserChatData,
} from "firebase/messagesServices";
import { useParams } from "react-router";
import { useAuth } from "contexts/AuthContext";
import SendMessage from "components/SendMessage/SendMessage";
import { arrowBack } from "ionicons/icons";

const ChatMessages = () => {
  const { id } = useParams<{ id?: string }>();
  const scroll = useRef<HTMLDivElement>(null);
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
    let unMounted = false;
    if (!unMounted) {
      getChatMessages(id!, (data) => {
        setMessagesList(data);
      });
    }
    scroll.current?.scrollIntoView({ behavior: "smooth" });
    return () => {
      unMounted = true;
    };
  }, [id]);

  useEffect(() => {
    let unMounted = false;
    if (!unMounted) {
      getAChatRoomData(id!, (data) => {
        setChatRoomData(data);
      });
    }
    return () => {
      unMounted = true;
    };
  }, [id]);

  useEffect(() => {
    let unMounted = false;
    if (!unMounted) {
      senderData();
    }
    async function senderData() {
      await getUserChatData(currentUser.uid, setSenderData);
    }
    return () => {
      unMounted = true;
    };
  }, [currentUser]);

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
  }, [chatRoomData, currentUser]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="regresar" className={styles.back}>
          <IonButtons slot="start">
            <IonButton routerLink="/tabs/chats">
              <IonIcon icon={arrowBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Chat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollEvents={true} onIonScrollEnd={() => {}}>
        <IonList>
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
        </IonList>
        <div ref={scroll} className={styles.messages}></div>
      </IonContent>
      <SendMessage chatRoomId={id} scroll={scroll}></SendMessage>
    </IonPage>
  );
};

export default ChatMessages;
