import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { getChatMessages, newMessage } from "firebase/messagesServices";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "contexts/AuthContext";

const ChatMessages = () => {
  const { id } = useParams<{ id?: string }>();
  const { currentUser } = useAuth();
  const [present] = useIonToast();
  const [messagesList, setMessagesList] =
    useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    getChatMessages(id!, (data) => {
      setMessagesList(data);
    });
  }, [id]);

  const { register, handleSubmit, setValue } = useForm({});

  const onSubmit = async (
    data: any,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const { message } = data;
    try {
      await newMessage(id!, currentUser.uid, message);
      setValue("message", "");
    } catch (e) {
      present({
        message: "Error al enviar el mensaje...",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    }
  };
  console.log(id);

  console.log(messagesList);
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
      <IonContent fullscreen className={styles.back}>
        {messagesList?.map((message: any, index: number) => (
          <IonCard
            key={index}
            className={
              message.senderId === currentUser.uid
                ? styles.message_box_sender
                : styles.message_box_receiver
            }
          >
            <IonLabel>{message.message}</IonLabel>
          </IonCard>
        ))}
        <div className={styles.input_container}>
          <form onSubmit={handleSubmit(onSubmit)} id="send-message-form">
            <IonRow>
              <IonInput
                type="text"
                className={styles.message_input}
                placeholder="Escriba el mensaje"
                clearInput={true}
                {...register("message")}
              ></IonInput>
              <button className={styles.send_button} form="send-message-form">
                Enviar
              </button>
            </IonRow>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ChatMessages;
