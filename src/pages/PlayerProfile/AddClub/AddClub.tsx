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

import "./AddClub.css";
const AddClub: React.FC = () => {
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
            Añadir Club
          </IonTitle>
          <IonButton fill="clear" slot="end" color="tertiary">
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider color="primary">
          <div className="subtitulo">Información del Club y temporada</div>
        </IonItemDivider>
        <IonItem class="elemento">
          <IonInput placeholder="Ingrese el nombre del club"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput placeholder="Pais"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput placeholder="Año de temporada"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput placeholder="Categoria del jugador"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput placeholder="Nivel de la competencia"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput placeholder="Total partidos jugados"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput placeholder="Total de goles"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput placeholder="Total de asistencias"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput placeholder="Tarjetas amarillas"></IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput placeholder="Tarjetas Rojas"></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default AddClub;
