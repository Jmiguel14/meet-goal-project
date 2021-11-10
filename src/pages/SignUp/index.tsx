import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonRow,
  IonCol,
  IonLabel,
  useIonToast,
} from "@ionic/react";
import MeetGoal from "icons/MeetGoal";
import { SignUpForm } from "components/SignUpForm/index";
import "./styles.css";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignupFormInputs } from "types";
import { ERROR_MESSAGES } from "constants/errorMessages";
import { Routes } from "constants/routes";

const schema = yup.object().shape({
  userType: yup.string().required(ERROR_MESSAGES.REQUIRED),
  name: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, ERROR_MESSAGES.MATCH_NAME)
    .min(5, ERROR_MESSAGES.MIN_NAME_LENGTH)
    .max(30, ERROR_MESSAGES.MAX_NAME_LENGTH),
  phone: yup
    .number()
    .typeError(ERROR_MESSAGES.NUMBER)
    .positive(ERROR_MESSAGES.POSITIVE)
    .required(ERROR_MESSAGES.REQUIRED)
    .max(1000000000, ERROR_MESSAGES.MIN_NAME_LENGTH)
    .min(100000000, ERROR_MESSAGES.MAX_NAME_LENGTH),
  email: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .email(ERROR_MESSAGES.EMAIL),
  password: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, ERROR_MESSAGES.MATCH_PASSWORD)
    .min(8, ERROR_MESSAGES.MIN_PASSWORD_LENGTH)
    .matches(/[a-z]/, ERROR_MESSAGES.MATCH_PASSWORD_LOWER_CASE)
    .matches(/[A-Z]/, ERROR_MESSAGES.MATCH_PASSWORD_CAPITAL)
    .matches(/[0-9]/, ERROR_MESSAGES.MATCH_PASSWORD_NUMBER)
    .matches(/[!@#$%^&*]/, ERROR_MESSAGES.MATCH_PASSWORD_SCH),
});

const SignUp: React.FC = () => {
  const { signUp, currentUser, createUserDocument } = useAuth();
  const [dataUser, setDataUser] = useState<SignupFormInputs | null>(null);
  const [present] = useIonToast();
  const history = useHistory();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (
    data: SignupFormInputs,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const { email, password } = data;
    if (currentUser)
      return present({
        message: "Ya tiene una sesión activa",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    console.log({ data });
    try {
      await signUp(email, password);
      setDataUser(data);
      e?.target.reset();
    } catch {
      present({
        message: "Ocurrió un error al crear la cuenta",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    }
  };

  useEffect(() => {
    if (dataUser) {
      const { name, phone, userType } = dataUser;
      currentUser &&
        createUserDocument({ name, phone, userType }).then(() =>
          history.push(Routes.DASHBOARD)
        );
    }
  }, [dataUser, currentUser]);

  useEffect(() => {
    setError("password", {
      message: ERROR_MESSAGES.PASSWORD,
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start" className="back-button">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonRow className="meet-goal-icon">
            <IonCol size="auto">
              <MeetGoal width={40} height={40} />
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow className="ion-justify-content-start">
          <IonCol size="7" className="sign-up-text">
            <IonLabel position="fixed">Crear una cuenta</IonLabel>
          </IonCol>
        </IonRow>
        <SignUpForm
          register={register}
          handleSubmit={handleSubmit}
          clearErrors={clearErrors}
          errors={errors}
          onHandleSubmit={onSubmit}
        />
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
