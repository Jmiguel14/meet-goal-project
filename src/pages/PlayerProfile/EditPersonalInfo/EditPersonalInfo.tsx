import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import "./EditPersonalInfo.css";

const EditPersonalInfo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    "2012-12-15T13:47:20.789"
  );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light" className="acciones">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/perfil-jugador"
              className="icon-back"
            />
          </IonButtons>
          <IonTitle color="primary" className="ion-padding titulo">
            Editar I. Personal
          </IonTitle>
          <IonButton fill="clear" slot="end" color="tertiary">
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="fondo">
        <IonItemDivider color="primary">
          <div className="subtitulo">Edita aquí tu Información Personal</div>
        </IonItemDivider>
        <IonItem className="dato-personal">
          <IonInput placeholder="Correo Electrónico"></IonInput>
        </IonItem>
        <IonItem className="dato-personal">
          <IonInput placeholder="País"></IonInput>
        </IonItem>
        <IonItem className="dato-personal">
          <IonInput placeholder="Ciudad"></IonInput>
        </IonItem>
        <IonItem className="dato-personal">
          <IonLabel>F. Nacimiento (Mes/Día/Año)</IonLabel>
          <IonDatetime
            displayFormat="MMM/DD/YY"
            monthShortNames="JAN, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DEC"
            onIonChange={(e) => setSelectedDate(e.detail.value!)}
          ></IonDatetime>
        </IonItem>
        <IonItem className="dato-personal">
          <IonInput placeholder="Estado Contractual"></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default EditPersonalInfo;
