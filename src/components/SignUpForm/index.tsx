import {
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonNote,
  IonInput,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { USER_TYPES } from "constants/userTypes";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import { useState } from "react";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormClearErrors,
  DeepMap,
  FieldError,
} from "react-hook-form";
import { SignupFormInputs } from "types";

interface SignUpFormProps {
  register: UseFormRegister<SignupFormInputs>;
  handleSubmit: UseFormHandleSubmit<SignupFormInputs>;
  clearErrors: UseFormClearErrors<SignupFormInputs>;
  errors: DeepMap<SignupFormInputs, FieldError>;
  onHandleSubmit: (
    data: SignupFormInputs,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}
export const SignUpForm = ({
  register,
  handleSubmit,
  clearErrors,
  errors,
  onHandleSubmit,
}: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showIconPassword, setShowIconPassword] = useState(false);
  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <IonRow>
        <IonCol size="12">
          <IonItem>
            <IonLabel color="medium">Tipo de usuario</IonLabel>
            <IonSelect
              okText="Ok"
              cancelText="Cerrar"
              {...register("userType")}
              onIonChange={() => {
                clearErrors("userType");
              }}
            >
              <IonSelectOption value={USER_TYPES.PLAYER}>
                Jugador
              </IonSelectOption>
              <IonSelectOption value={USER_TYPES.CLUB}>Club</IonSelectOption>
              <IonSelectOption value={USER_TYPES.ACADEMY}>
                Académia
              </IonSelectOption>
              <IonSelectOption value={USER_TYPES.TECHNICIAN}>
                Técnico
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          {errors.userType && (
            <IonNote color="danger">{errors.userType?.message}</IonNote>
          )}
        </IonCol>
        <IonCol size="12">
          <IonItem>
            <IonLabel color="medium" position="floating">
              Nombre completo
            </IonLabel>
            <IonInput
              type="text"
              {...register("name")}
              onIonChange={() => {
                clearErrors("name");
              }}
            />
          </IonItem>
          {errors.name?.message && (
            <IonNote color="danger">{errors.name?.message}</IonNote>
          )}
        </IonCol>
        <IonCol size="12">
          <IonItem>
            <IonLabel color="medium" position="floating">
              Teléfono
            </IonLabel>
            <IonInput
              type="number"
              {...register("phone")}
              onIonChange={() => {
                clearErrors("phone");
              }}
            />
          </IonItem>
          {errors.phone?.message && (
            <IonNote color="danger">{errors.phone?.message}</IonNote>
          )}
        </IonCol>
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
      <IonRow className="sign-up-button">
        <IonCol size="11">
          <IonButton type="submit" expand="block">
            Registrarse
          </IonButton>
        </IonCol>
      </IonRow>
    </form>
  );
};
