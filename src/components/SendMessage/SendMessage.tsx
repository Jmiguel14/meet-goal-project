import {
  IonCol,
  IonIcon,
  IonRow,
  IonTextarea,
  useIonToast,
} from "@ionic/react";
import { useAuth } from "contexts/AuthContext";
import { newMessage } from "firebase/messagesServices";
import { sendSharp } from "ionicons/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { ERROR_MESSAGES } from "constants/errorMessages";

export interface props {
  chatRoomId: string | undefined;
  scroll: any;
}

const schema = yup.object().shape({
  message: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, ERROR_MESSAGES.MATCH_WITH_TEXT),
});

const SendMessage = (props: props) => {
  const { chatRoomId, scroll } = props;
  const { currentUser } = useAuth();
  const [present] = useIonToast();
  const [activeInput, setActiveInput] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
            <IonCol>
              <IonTextarea
                typeof="text"
                autoGrow={true}
                className={styles.text_container}
                disabled={activeInput}
                placeholder="Escriba el mensaje"
                spellcheck={true}
                {...register("message")}
                onClick={(e) => {
                  setActiveInput(false);
                }}
                onIonChange={(e) => {
                  clearErrors("message");
                }}
                wrap="hard"
              ></IonTextarea>
            </IonCol>
            {errors.message?.message &&
              present({
                message: errors.message.message,
                duration: 1500,
                position: "top",
                color: "danger",
              })}
            <IonCol className={styles.button_container} size="2">
              <button
                className={styles.send_button}
                type="submit"
                disabled={activeInput}
              >
                <IonIcon icon={sendSharp} size="small"></IonIcon>
              </button>
            </IonCol>
          </IonRow>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
