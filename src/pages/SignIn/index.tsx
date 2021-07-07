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
  IonRouterLink,
  useIonToast,
  IonFooter,
} from "@ionic/react";
import React from "react";
import MeetGoal from "icons/MeetGoal";
import "./styles.css";
import { SignInForm } from "components/SignInForm";
import Login from "icons/Login";
import { useAuth } from "contexts/AuthContext";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SigninFormInputs } from "types";
import { ERROR_MESSAGES } from "constants/errorMessages";

const schema = yup.object().shape({
  email: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .email(ERROR_MESSAGES.EMAIL),
  password: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

const SignIn: React.FC = () => {
  const { login } = useAuth();
  const history = useHistory();
  const [present] = useIonToast();

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<SigninFormInputs>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (
    data: SigninFormInputs,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const { email, password } = data;

    try {
      await login(email, password);
      history.push("/tabs/inicio-jugador");
      e?.target.reset();
    } catch {
      present({
        message: "Ocurrió un error al iniciar sesión",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="light">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" className="icon-back" />
            </IonButtons>
            <IonRow className="header-icon">
              <IonCol size="auto">
                <MeetGoal width={40} height={40} />
              </IonCol>
              <IonCol size="auto">
                <IonRouterLink routerLink="/registrarse">
                  <IonLabel color="primary">Regístrate</IonLabel>
                </IonRouterLink>
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonHeader>
        <IonRow className="ion-justify-content-start">
          <IonCol size="11" className="sign-in-text">
            <IonLabel position="fixed">Iniciar sesión en Meet Goal</IonLabel>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="auto">
            <Login width="350" height="200" />
          </IonCol>
        </IonRow>
        <SignInForm
          handleSubmit={handleSubmit(onSubmit)}
          register={register}
          clearErrors={clearErrors}
          errors={errors}
        />
      </IonContent>
      <IonFooter>
        <IonToolbar color="light">
          <IonRow className="ion-justify-content-end">
            <IonCol size="auto" className="ion-align-items-center">
              <button
                type="submit"
                form="sign-in-form"
                className="signin-button"
              >
                Iniciar sesión
              </button>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default SignIn;
