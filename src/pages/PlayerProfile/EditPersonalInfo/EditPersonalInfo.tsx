import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBackCircleOutline, arrowBackOutline } from "ionicons/icons";
import { useState } from "react";
import "./EditPersonalInfo.css";

const EditPersonalInfo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    "2012-12-15T13:47:20.789"
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light" class="acciones">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/perfil-jugador"
              className="icon-back"
            />
          </IonButtons>
          <IonTitle color="primary" className="ion-padding" class="titulo">
            Editar I. Personal
          </IonTitle>
          <IonButton fill="clear" slot="end" color="tertiary">
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem class="elemento">
          <IonInput>Correo Electrónico</IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput>País</IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput>Ciudad</IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonLabel>F. Nacimiento (Mes/Día/Año)</IonLabel>
          <IonDatetime
            displayFormat="MMM/DD/YY"
            monthShortNames="JAN, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DEC"
            onIonChange={(e) => setSelectedDate(e.detail.value!)}
          ></IonDatetime>
        </IonItem>
        <IonItem class="elemento">
          <IonInput>Estado Contractual</IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default EditPersonalInfo;
