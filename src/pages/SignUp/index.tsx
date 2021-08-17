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
  name: yup.string().required(ERROR_MESSAGES.REQUIRED),
  phone: yup
    .number()
    .typeError(ERROR_MESSAGES.NUMBER)
    .positive(ERROR_MESSAGES.POSITIVE)
    .required(ERROR_MESSAGES.REQUIRED),
  email: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .email(ERROR_MESSAGES.EMAIL),
  password: yup.string().required(ERROR_MESSAGES.REQUIRED),
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

    try {
      signUp(email, password);
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
        createUserDocument({ name, phone, userType }) &&
        history.push(Routes.DASHBOARD);
    }
  }, [dataUser, currentUser]);

  return (
    <IonPage>
      <IonContent>
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
