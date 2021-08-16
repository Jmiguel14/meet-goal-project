import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  useIonToast,
  useIonActionSheet,
} from "@ionic/react";
import MeetGoal from "icons/MeetGoal";
import Carousel from "components/Carousel/Carousel";
import "./Home.css";
import { useHistory } from "react-router";
import { Routes } from "constants/routes";
import { loginWithGoogle } from "firebase/client";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import firebase from "firebase";
import { USER_TYPES } from "constants/userTypes";

const Home: React.FC = () => {
  const history = useHistory();
  const [userCredential, setUserCredential] =
    useState<firebase.auth.UserCredential>();
  const { createUserDocument } = useAuth();
  const [presentToast] = useIonToast();
  const [present, dismiss] = useIonActionSheet();
  const [userType, setUserType] = useState("");

  useEffect(() => {
    userCredential && createUserDocument(null, userCredential, userType);
  }, [userCredential]);

  useEffect(() => {
    const handleLoginWithGoogle = async () => {
      try {
        const userCredential = await loginWithGoogle();
        setUserCredential(userCredential);
        history.push(Routes.DASHBOARD);
      } catch (e) {
        presentToast({
          message: `Ocurrió un error al iniciar la sesión de tipo ${e}`,
          duration: 10000,
          position: "top",
          color: "danger",
        });
      }
    };
    userType && handleLoginWithGoogle();
  }, [userType]);

  const selectUserType = async () => {
    present({
      buttons: [
        {
          text: USER_TYPES.PLAYER,
          handler: () => setUserType(USER_TYPES.PLAYER),
        },
        {
          text: USER_TYPES.CLUB,
          handler: () => setUserType(USER_TYPES.CLUB),
        },
        {
          text: USER_TYPES.ACADEMY,
          handler: () => setUserType(USER_TYPES.ACADEMY),
        },
        {
          text: USER_TYPES.TECHNICIAN,
          handler: () => setUserType(USER_TYPES.TECHNICIAN),
        },
        {
          text: "Ya registrado",
          handler: () => setUserType("registrado"),
        },
        {
          text: "Cancelar",
          handler: () => dismiss(),
        },
      ],
      header: "Tipos de usuario",
    });
  };

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow className="logo">
            <IonCol size="auto">
              <MeetGoal width={150} height={150} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="auto">
              <Carousel />
            </IonCol>
          </IonRow>
          <IonRow className="row">
            <IonCol size="11">
              <IonButton
                className="button"
                strong={true}
                expand="block"
                onClick={selectUserType}
              >
                Iniciar sesión con google
              </IonButton>
            </IonCol>
            <IonCol size="11">
              <IonButton
                className="button"
                strong={true}
                expand="block"
                routerLink={"registrarse"}
              >
                Registrarse
              </IonButton>
            </IonCol>
            <IonCol size="11">
              <IonButton
                className="login-button"
                expand="block"
                fill="outline"
                strong={true}
                routerLink="iniciar-sesion"
              >
                Iniciar Sesión
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
