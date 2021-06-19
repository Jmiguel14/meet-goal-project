import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonNote,
} from "@ionic/react";
import MeetGoal from "icons/MeetGoal";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { register } from "serviceWorkerRegistration";
import "./styles.css";

enum userTypeEnum {
  club = "Club",
  jugador = "Jugador",
  academia = "Académia",
  tecnico = "Técnico",
}

interface IFormInput {
  userType: userTypeEnum;
  name: string;
  phone: number;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
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
  } = useForm<IFormInput>({ defaultValues: initialValues });

  const { onChange, ...rest } = register("name");

  //useEffect(() => {
  //  setError("name", {
  //      type: "focus",
  //      message: "Dont Forget Your Username Should Be Cool!"
  //    });
  //}, [setError])

  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data, null, 2));
    //setData(data);
    console.log(data);
  };

  const registerUser = (data: any) => {
    console.log("creating a new user account with", data);
  };

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
                  {...register("userType", { required: true })}
                  onIonChange={(e) => {
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
                <IonNote color="danger">Este campo es requerido</IonNote>
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
                  {...register("name", { required: true })}
                  onIonChange={(e) => {
                    clearErrors("name");
                  }}
                />
              </IonItem>
              {errors.name && (
                <IonNote color="danger">Este campo es requerido</IonNote>
              )}
            </IonCol>
            <IonCol size="12">
              <IonItem>
                <IonLabel color="medium" position="floating">
                  Teléfono
                </IonLabel>
                <IonInput
                  type="tel"
                  clearInput={true}
                  {...register("phone", { required: true })}
                  onIonChange={(e) => {
                    clearErrors("phone");
                  }}
                />
              </IonItem>
              {errors.phone && (
                <IonNote color="danger">Este campo es requerido</IonNote>
              )}
            </IonCol>
            <IonCol size="12">
              <IonItem>
                <IonLabel color="medium" position="floating">
                  Correo
                </IonLabel>
                <IonInput
                  type="email"
                  clearInput={true}
                  {...register("email", { required: true })}
                  onIonChange={(e) => {
                    clearErrors("email");
                  }}
                />
              </IonItem>
              {errors.email && (
                <IonNote color="danger">Este campo es requerido</IonNote>
              )}
            </IonCol>
            <IonCol size="12">
              <IonItem>
                <IonLabel color="medium" position="floating">
                  Contraseña
                </IonLabel>
                <IonInput
                  type="password"
                  {...register("password", { required: true })}
                  onIonChange={(e) => {
                    clearErrors('password')
                  }}
                />
              </IonItem>
              {errors.password && (
                <IonNote color="danger">Este campo es requerido</IonNote>
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
      </IonContent>
    </IonPage>
  );
};
