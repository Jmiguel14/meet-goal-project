import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  IonRow,
  IonCol,
  IonLabel,
  IonItem,
  IonNote,
  IonInput,
  IonFooter,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import './styles.css'

export interface IForm {
  email: string;
  password: string;
}

const ERROR_MESSAGES = {
  required: "Este campo es requerido",
  positive: "Debe ser un número positivo",
  email: "Email no válido",
  number: "Debe especificar un número",
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required(ERROR_MESSAGES.required)
    .email(ERROR_MESSAGES.email),
  password: yup.string().required(ERROR_MESSAGES.required),
});

interface ISignInForm {
    onSubmit: (data: any) => Promise<void>
}

export const SignInForm: React.FC<ISignInForm> = ({ onSubmit }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonRow>
        <IonCol size="12">
          <IonItem>
            <IonLabel color="medium" position="floating">
              Correo
            </IonLabel>
            <IonInput
              clearInput={true}
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
        <IonFooter>
          <IonToolbar color='light'>
            <IonRow className='ion-justify-content-end'>
              <IonCol size='auto'>
                <IonButton type='submit'>
                  Iniciar sesión
                </IonButton>
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonFooter>
      </IonRow>
    </form>
  );
};
