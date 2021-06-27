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
} from "@ionic/react";
import React from "react";
import MeetGoal from "icons/MeetGoal";
import "./styles.css";

export const SignIn: React.FC = () => {
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
        </IonContent>
      </IonPage>
    </>
  );
};
