import { IonInput, IonRow, useIonToast } from "@ionic/react";
import { useAuth } from "contexts/AuthContext";
import { newMessage } from "firebase/messagesServices";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

export interface props {
  chatRoomId: string | undefined;
  scroll: any;
}

const SendMessage = (props: props) => {
  const { chatRoomId, scroll } = props;
  const { currentUser } = useAuth();
  const [present] = useIonToast();

  const { register, handleSubmit, setValue } = useForm({});

  const onSubmit = async (
    data: any,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault();
    const { message } = data;
    try {
      await newMessage(chatRoomId!, currentUser.uid, message);
      setValue("message", "");
    } catch (e) {
      present({
        message: "Error al enviar el mensaje...",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    }
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} id="send-message-form">
        <div className={styles.input_container} slot="bottom">
          <IonRow>
            <IonInput
              type="text"
              className={styles.message_input}
              placeholder="Escriba el mensaje"
              clearInput={true}
              {...register("message")}
            ></IonInput>
            <button
              className={styles.send_button}
              type="submit"
              form="send-message-form"
            >
              Enviar
            </button>
          </IonRow>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
