import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonToolbar,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonNote,
  useIonToast,
  IonLoading,
} from "@ionic/react";
import MeetGoal from "icons/MeetGoal";
import PasswordResetIcon from "icons/PasswordResetIcon";
import styles from "./styles.module.css";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "contexts/AuthContext";

interface IForm {
  email: string;
}

const ERROR_MESSAGES = {
  required: "Este campo es requerido",
  email: "Email no válido",
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required(ERROR_MESSAGES.required)
    .email(ERROR_MESSAGES.email),
});

const PasswordReset: React.FC = () => {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [present] = useIonToast();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any, e: any) => {
    try {
      setLoading(true);
      const { email } = data;
      await resetPassword(email);
      e.target.reset();
      history.push("/verificar-email-enviado");
    } catch {
      present({
        message: "Ocurrió un error al restablecer contraseña",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    }
    setLoading(false);
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="light">
            <IonButtons slot="start" className={styles.back_button}>
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonRow className="ion-justify-content-center">
              <IonCol size="auto">
                <MeetGoal width={40} height={40} />
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonHeader>
        <IonRow className={styles.icon}>
          <IonCol size="auto">
            <PasswordResetIcon width="350" height="200" />
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="auto" className={styles.forgot_password_text}>
            <IonLabel position="fixed">Restablece tu contraseña</IonLabel>
          </IonCol>
        </IonRow>
        <IonRow className={styles.reset_note}>
          <IonCol size="9">
            <div>
              Ingresa tu correo y te enviaremos un enlace para que restablescas
              tu contraseña
            </div>
          </IonCol>
        </IonRow>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel color="medium" position="floating">
                  Email
                </IonLabel>
                <IonInput
                  {...register("email")}
                  onIonChange={() => {
                    clearErrors("email");
                  }}
                />
              </IonItem>
              {errors.email && (
                <IonNote color="danger">{errors.email?.message}</IonNote>
              )}
            </IonCol>
          </IonRow>
          <IonRow className={styles.reset_password_button}>
            <IonCol size="auto">
              <IonButton type="submit">Restablecer contraseña</IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
      <IonLoading isOpen={loading} />
    </IonPage>
  );
};

export default PasswordReset;
