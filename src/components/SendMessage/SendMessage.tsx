import {
  IonIcon,
  IonInput,
  IonRow,
  IonTextarea,
  useIonToast,
} from "@ionic/react";
import { useAuth } from "contexts/AuthContext";
import { newMessage } from "firebase/messagesServices";
import { sendSharp } from "ionicons/icons";
import React, { useState } from "react";
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
  const [activeInput, setActiveInput] = useState(true);

  const { register, handleSubmit, setValue } = useForm({});

  const onSubmit = async (
    data: any,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    e?.preventDefault();
    const { message } = data;
    try {
      if (message !== "") {
        await newMessage(chatRoomId!, currentUser.uid, message);
        setValue("message", "");
        setActiveInput(true);
      } else {
        present({
          message: "Escriba un mensaje para poder enviarlo",
          duration: 3000,
          position: "top",
          color: "danger",
        });
      }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input_container} slot="bottom">
          <IonRow>
            <IonTextarea
              typeof="text"
              className={styles.message_input}
              disabled={activeInput}
              placeholder="Escriba el mensaje"
              {...register("message")}
              onClick={(e) => {
                setActiveInput(false);
              }}
            ></IonTextarea>
            <button
              className={styles.send_button}
              type="submit"
              disabled={activeInput}
            >
              <IonIcon icon={sendSharp} size="small"></IonIcon>
            </button>
          </IonRow>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
