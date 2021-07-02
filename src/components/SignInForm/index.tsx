import React from "react";
import {
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonNote,
  IonInput,
} from "@ionic/react";
import "./styles.css";

interface ISignInForm {
  register: any;
  handleSubmit: any;
  clearErrors: any;
  errors: any;
}

export const SignInForm: React.FC<ISignInForm> = ({
  register,
  handleSubmit,
  clearErrors,
  errors,
}) => {
  return (
    <form onSubmit={handleSubmit} id="sign-in-form">
      <IonRow>
        <IonCol size="12">
          <IonItem>
            <IonLabel color="medium" position="floating">
              Correo
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
        <IonCol size="12">
          <IonItem>
            <IonLabel color="medium" position="floating">
              Contraseña
            </IonLabel>
            <IonInput
              type="password"
              {...register("password", { pattern: /^[A-Za-z]+$/i })}
              onIonChange={() => {
                clearErrors("password");
              }}
            />
          </IonItem>
          {errors.password && (
            <IonNote color="danger">{errors.password?.message}</IonNote>
          )}
        </IonCol>
      </IonRow>
    </form>
  );
};
