import React from "react";
import {
  IonPage,
  IonContent,
  IonToolbar,
  IonHeader,
  IonRow,
  IonCol,
  IonLabel,
  IonButton,
} from "@ionic/react";
import MeetGoal from "icons/MeetGoal";
import CheckEmailIcon from "icons/CheckEmailIcon";
import "./styles.css";

const CheckEmail: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar color="light">
            <IonRow className="ion-justify-content-center">
              <IonCol size="auto">
                <MeetGoal width={40} height={40} />
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonHeader>
        <IonRow className="icon">
          <IonCol size="auto">
            <CheckEmailIcon width="350" height="200" />
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="auto" className="verify-email-text">
            <IonLabel position="fixed">Revisa tu correo!</IonLabel>
          </IonCol>
        </IonRow>
        <IonRow className="verify-note">
          <IonCol size="9">
            <div>
              Acabamos de enviarte un correo con todos los pasos necesarios para
              restablecer tu contraseña
            </div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center">
          <IonCol size="11">
            <IonButton
              routerLink="/home"
              expand="block"
              className="button"
              strong={true}
            >
              Regresar al inicio
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default CheckEmail;
