import React, { useState } from "react";
import {
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonNote,
  IonInput,
  IonRouterLink,
  IonIcon,
} from "@ionic/react";
import "./styles.css";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showIconPassword, setShowIconPassword] = useState(false);
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
            <IonRow style={{ width: "100%" }}>
              <IonCol size="10">
                <IonInput
                  type={showPassword ? "text" : "password"}
                  {...register("password", { pattern: /^[A-Za-z]+$/i })}
                  onIonChange={(e) => {
                    clearErrors("password");
                    e.detail.value === ""
                      ? setShowIconPassword(false)
                      : setShowIconPassword(true);
                  }}
                ></IonInput>
              </IonCol>
              <IonCol size="2">
                {showIconPassword ? (
                  <IonIcon
                    size="large"
                    color="primary"
                    name={eyeOutline}
                    src={showPassword ? eyeOutline : eyeOffOutline}
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                    }}
                  ></IonIcon>
                ) : (
                  <></>
                )}
              </IonCol>
            </IonRow>
          </IonItem>
          {errors.password && (
            <IonNote color="danger">{errors.password?.message}</IonNote>
          )}
        </IonCol>
      </IonRow>
      <IonRow className="forgot-password">
        <IonCol size="auto">
          <IonRouterLink routerLink="/restablecer-contrasena">
            <IonNote color="primary">¿Olvidó su contraseña?</IonNote>
          </IonRouterLink>
        </IonCol>
      </IonRow>
    </form>
  );
};
