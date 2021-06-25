import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";

import "./AddInjury.css";
const AddInjury: React.FC = () => {
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
          <IonTitle color="primary" class="titulo">
            Añadir Lesión
          </IonTitle>
          <IonButton fill="clear" slot="end" color="tertiary">
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider color="primary">
          <div className="subtitulo">Detalles de la lesión</div>
        </IonItemDivider>
        <IonItem class="elemento">
          <IonInput placeholder="Nombre de la lesión"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput placeholder="Tiempo de recuperación"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput placeholder="Proceso quirúrgico"></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default AddInjury;
