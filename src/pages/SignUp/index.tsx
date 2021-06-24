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
  IonItem,
  IonSelect,
  IonSelectOption,
  IonNote,
  IonInput,
  IonButton,
  IonToast,
} from "@ionic/react";
import MeetGoal from "icons/MeetGoal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./styles.css";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";

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
  const [hasError, setHasError] = useState(false);
  const { signUp, currentUser, createUserDocument } = useAuth();
  const [dataUser, setDataUser] = useState<any>(null);
  console.log(currentUser);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    try {
      setHasError(false);
      await signUp(email, password);
      setDataUser(data);
      reset(undefined);
    } catch {
      setHasError(true);
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
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" className="icon-back" />
            </IonButtons>
            <IonRow>
              <IonCol size="auto" className="icon-header">
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel color="medium">Tipo de usuario</IonLabel>
                <IonSelect
                  okText="Okay"
                  cancelText="Cerrar"
                  {...register("userType")}
                  onIonChange={() => {
                    clearErrors("userType");
                  }}
                >
                  <IonSelectOption value="Jugador">Jugador</IonSelectOption>
                  <IonSelectOption value="Club">Club</IonSelectOption>
                  <IonSelectOption value="Académia">Académia</IonSelectOption>
                  <IonSelectOption value="Técnico">Técnico</IonSelectOption>
                </IonSelect>
              </IonItem>
              {errors.userType && (
                <IonNote color="danger">{errors.userType?.message}</IonNote>
              )}
            </IonCol>
            <IonCol size="12">
              <IonItem>
                <IonLabel color="medium" position="floating">
                  Nombre
                </IonLabel>
                <IonInput
                  type="text"
                  clearInput={true}
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
                  clearInput={true}
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
          </IonRow>
          <IonRow className="sign-up-button">
            <IonCol size="11">
              <IonButton type="submit" expand="block">
                Registrarse
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
        <IonToast
          isOpen={hasError}
          message="No se pudo crear la cuenta"
          position="top"
          duration={3000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};
