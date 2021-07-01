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

export enum userTypeEnum {
  club = "Club",
  jugador = "Jugador",
  academia = "Académia",
  tecnico = "Técnico",
}

export interface IForm {
  userType: userTypeEnum;
  name: string;
  phone: number;
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
  userType: yup.string().required(ERROR_MESSAGES.required),
  name: yup.string().required(ERROR_MESSAGES.required),
  phone: yup
    .number()
    .typeError(ERROR_MESSAGES.number)
    .positive(ERROR_MESSAGES.positive)
    .required(ERROR_MESSAGES.required),
  email: yup
    .string()
    .required(ERROR_MESSAGES.required)
    .email(ERROR_MESSAGES.email),
  password: yup.string().required(ERROR_MESSAGES.required),
});

export const SignUp: React.FC = () => {
  const { signUp, currentUser, createUserDocument } = useAuth();
  const [dataUser, setDataUser] = useState<any>(null);
  const [present] = useIonToast();
  const history = useHistory()

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    if(currentUser) return present({
      message: 'Ya tiene una sesión activa',
      duration: 3000,
      position: 'top',
      color:'danger'
    })
    
    try {
      await signUp(email, password);
      setDataUser(data);
      history.push('/tabs/inicio-jugador')
      reset()
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
      createUserDocument(currentUser, { name, phone, userType });
    }
  }, [currentUser, dataUser]);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="light">
            <IonButtons slot="start" className='back-button'>
              <IonBackButton defaultHref="/"/>
            </IonButtons>
            <IonRow className='icon'>
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
        <SignUpForm register={register} handleSubmit={handleSubmit(onSubmit)} clearErrors={clearErrors} errors={errors}/>
      </IonContent>
    </IonPage>
  );
};
