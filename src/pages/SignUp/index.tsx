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
import { SignUpForm } from "components/SignUpForm";
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

export const SignUp: React.FC = () => {
  const { signUp, currentUser, createUserDocument } = useAuth();
  const [dataUser, setDataUser] = useState<any>(null);
  const [reset, setReset] = useState(false);
  const [present] = useIonToast();

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    try {
      await signUp(email, password);
      setDataUser(data);
      setReset(true);
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
        <SignUpForm onSubmit={onSubmit} isReset={reset} />
      </IonContent>
    </IonPage>
  );
};
