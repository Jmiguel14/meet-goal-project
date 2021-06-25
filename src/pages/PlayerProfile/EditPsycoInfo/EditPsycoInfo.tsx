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
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";

import "./EditPsycoInfo.css";
const EditPsycoInfo: React.FC = () => {
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
            Param. Psicológicos
          </IonTitle>
          <IonButton fill="clear" slot="end" color="tertiary">
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding-vertical">
        <IonItemDivider color="primary">
          <div className="subtitulo">Selecciona tu Carácter</div>
        </IonItemDivider>
        <IonItem class="elemento">
          <IonLabel>Carácter</IonLabel>
          <IonSelect okText="Listo" cancelText="Cerrar" slot="end">
            <IonSelectOption value="flematico">Flemático</IonSelectOption>
            <IonSelectOption value="colerico">Colérico</IonSelectOption>
            <IonSelectOption value="seunguineo">Senguíneo</IonSelectOption>
            <IonSelectOption value="apatico">Apático</IonSelectOption>
            <IonSelectOption value="apasionado">Apasionado</IonSelectOption>
            <IonSelectOption value="sentimental">Sentimental</IonSelectOption>
            <IonSelectOption value="nervioso">Nervioso</IonSelectOption>
            <IonSelectOption value="amorfo">Amorfo</IonSelectOption>
            <IonSelectOption value="inseguro">Inseguro</IonSelectOption>
            <IonSelectOption value="obsesivo">Obsesivo</IonSelectOption>
            <IonSelectOption value="sensible">Sensible</IonSelectOption>
          </IonSelect>
        </IonItem>
        <br />
        <IonItemDivider color="primary">
          <div className="subtitulo">Parametros de Personalidad</div>
        </IonItemDivider>
        <div className="notas">
          <IonNote class="nota">E:Extrovertido - I: Introvertido</IonNote>
          <br />
          <IonNote class="nota">N:Intuitivo - S: Sensitivo</IonNote>
          <br />
          <IonNote class="nota">T:Pensador - F:Sentimental</IonNote>
          <br />
          <IonNote class="nota">J:Juicioso - P: Perceptivo</IonNote>
          <br />
        </div>
        <IonItem class="elemento">
          <IonLabel>Personalidad</IonLabel>
          <IonSelect okText="Listo" cancelText="Cerrar" slot="end">
            <IonSelectOption value="ESTJ">ESTJ</IonSelectOption>
            <IonSelectOption value="ESTP">ESTP</IonSelectOption>
            <IonSelectOption value="ESFJ">ESFJ</IonSelectOption>
            <IonSelectOption value="ESFP">ESFP</IonSelectOption>
            <IonSelectOption value="ISTJ">ISTJ</IonSelectOption>
            <IonSelectOption value="ISTP">ISTP</IonSelectOption>
            <IonSelectOption value="ISFJ">ISFJ</IonSelectOption>
            <IonSelectOption value="ISFP">ISFP</IonSelectOption>
            <IonSelectOption value="ENTJ">ENTJ</IonSelectOption>
            <IonSelectOption value="ENTP">ENTP</IonSelectOption>
            <IonSelectOption value="ENFJ">ENFJ</IonSelectOption>
            <IonSelectOption value="ENFP">ENFP</IonSelectOption>
            <IonSelectOption value="INTJ">INTJ</IonSelectOption>
            <IonSelectOption value="INTP">INTP</IonSelectOption>
            <IonSelectOption value="INFJ">INFJ</IonSelectOption>
            <IonSelectOption value="INFP">INFP</IonSelectOption>
          </IonSelect>
        </IonItem>
        <br />
        <IonItemDivider color="primary">
          <div className="subtitulo">Selecciona tu Actitud</div>
        </IonItemDivider>
        <IonItem class="elemento">
          <IonLabel>Actitud</IonLabel>
          <IonSelect okText="Listo" cancelText="Cerrar" slot="end">
            <IonSelectOption value="positiva">POSITIVA</IonSelectOption>
            <IonSelectOption value="derrotista">DERROTISTA</IonSelectOption>
            <IonSelectOption value="pasiva">PASIVA</IonSelectOption>
            <IonSelectOption value="altruista">ALTRUISTA</IonSelectOption>
            <IonSelectOption value="neutra">NEUTRA</IonSelectOption>
            <IonSelectOption value="agresiva">AGRESIVA</IonSelectOption>
            <IonSelectOption value="empatica">EMPÁTICA</IonSelectOption>
            <IonSelectOption value="flexible">FLEXIBLE</IonSelectOption>
            <IonSelectOption value="inflexible">INFLEXIBLE</IonSelectOption>
            <IonSelectOption value="moralista">MORALISTA</IonSelectOption>
            <IonSelectOption value="nihilista">NIHILISTA</IonSelectOption>
            <IonSelectOption value="suspicaz">SUSPICAZ</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default EditPsycoInfo;
