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
} from "@ionic/react";
import React from "react";
import MeetGoal from "icons/MeetGoal";
import "./styles.css";
import { SignInForm } from "components/SignInForm";
import Login from "icons/Login";
import { useAuth } from "contexts/AuthContext";
import { useHistory } from "react-router";

export const SignIn: React.FC = () => {
  const {login} = useAuth()
  const history = useHistory()
  const [present] = useIonToast()
  
  const onSubmit = async (data: any) => {
    const { email, password } = data;
    
    try {
      await login(email, password);
      history.push('/tabs/inicio-jugador')
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
    <>
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
                      <IonRouterLink routerLink='/registrarse'>
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
          <IonRow className='ion-justify-content-center'>
            <IonCol size='auto'>
            <Login width='350' height='200'/>
            </IonCol>
          </IonRow>
          <SignInForm onSubmit={onSubmit}/>
        </IonContent>
      </IonPage>
    </>
  );
};
