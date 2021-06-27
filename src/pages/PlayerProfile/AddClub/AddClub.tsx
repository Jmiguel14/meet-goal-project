import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./AddClub.css";
const AddClub: React.FC = () => {
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
          <IonTitle color="primary" className="titulo">
            Añadir Club
          </IonTitle>
          <IonButton fill="clear" slot="end" color="tertiary">
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class="nuevo-club">
        <IonItemDivider color="primary">
          <div className="subtitulo">Información del Club y temporada</div>
        </IonItemDivider>
        <IonItem className="campo-club">
          <IonInput placeholder="Ingrese el nombre del club"></IonInput>
        </IonItem>
        <IonItem className="campo-club">
          <IonInput placeholder="Pais"></IonInput>
        </IonItem>
        <IonItem className="campo-club">
          <IonInput placeholder="Año de temporada"></IonInput>
        </IonItem>
        <IonItem className="campo-club">
          <IonInput placeholder="Categoria del jugador"></IonInput>
        </IonItem>
        <IonItem className="campo-club">
          <IonInput placeholder="Nivel de la competencia"></IonInput>
        </IonItem>
        <IonItem className="campo-club">
          <IonInput placeholder="Total partidos jugados"></IonInput>
        </IonItem>
        <IonItem className="campo-club">
          <IonInput placeholder="Total de goles"></IonInput>
        </IonItem>
        <IonItem className="campo-club">
          <IonInput placeholder="Total de asistencias"></IonInput>
        </IonItem>
        <IonItem className="campo-club">
          <IonInput placeholder="Tarjetas amarillas"></IonInput>
        </IonItem>
        <IonItem className="campo-club">
          <IonInput placeholder="Tarjetas Rojas"></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default AddClub;
