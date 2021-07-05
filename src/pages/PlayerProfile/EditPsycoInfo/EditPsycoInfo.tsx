import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { EditPsycoParameters } from "firebase/client";
import { useState } from "react";

import "./EditPsycoInfo.css";
const EditPsycoInfo: React.FC = () => {
  const [character, setCharacter] = useState<string>("");
  const [personality, setPersonality] = useState<string>("");
  const [attitude, setAttitude] = useState<string>("");

  const onSubmit = async () => {
    await EditPsycoParameters(character, personality, attitude);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light" className="acciones">
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/tabs/perfil-jugador"
              className="icon-back"
            />
          </IonButtons>
          <IonTitle color="primary" className="titulo">
            Param. Psicológicos
          </IonTitle>
          <IonButton
            fill="clear"
            slot="end"
            color="tertiary"
            onClick={onSubmit}
            routerLink="/tabs/perfil-jugador"
          >
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="datos-psyco">
        <IonItemDivider color="primary">
          <div className="subtitulo">Selecciona tu Carácter</div>
        </IonItemDivider>
        <IonItem className="campo-psyco">
          <IonLabel>Carácter</IonLabel>
          <IonSelect
            okText="Listo"
            cancelText="Cerrar"
            slot="end"
            onIonChange={(e: any) => setCharacter(e.currentTarget.value)}
          >
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
        <IonItemDivider color="primary">
          <div className="subtitulo">Parametros de Personalidad</div>
        </IonItemDivider>
        <div className="notas">
          <IonNote className="nota">E:Extrovertido - I: Introvertido</IonNote>
          <br />
          <IonNote className="nota">N:Intuitivo - S: Sensitivo</IonNote>
          <br />
          <IonNote className="nota">T:Pensador - F:Sentimental</IonNote>
          <br />
          <IonNote className="nota">J:Juicioso - P: Perceptivo</IonNote>
          <br />
        </div>
        <IonItem className="campo-psyco">
          <IonLabel>Personalidad</IonLabel>
          <IonSelect
            okText="Listo"
            cancelText="Cerrar"
            slot="end"
            onIonChange={(e: any) => setPersonality(e.currentTarget.value)}
          >
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
        <IonItemDivider color="primary">
          <div className="subtitulo">Selecciona tu Actitud</div>
        </IonItemDivider>
        <IonItem className="campo-psyco">
          <IonLabel>Actitud</IonLabel>
          <IonSelect
            okText="Listo"
            cancelText="Cerrar"
            slot="end"
            onIonChange={(e: any) => setAttitude(e.currentTarget.value)}
          >
            <IonSelectOption value="positiva">Positiva</IonSelectOption>
            <IonSelectOption value="derrotista">Derrotista</IonSelectOption>
            <IonSelectOption value="pasiva">Pasiva</IonSelectOption>
            <IonSelectOption value="altruista">Altruista</IonSelectOption>
            <IonSelectOption value="neutra">Neutra</IonSelectOption>
            <IonSelectOption value="agresiva">Agresiva</IonSelectOption>
            <IonSelectOption value="empatica">Empática</IonSelectOption>
            <IonSelectOption value="flexible">Flexible</IonSelectOption>
            <IonSelectOption value="inflexible">Inflexible</IonSelectOption>
            <IonSelectOption value="moralista">Moralista</IonSelectOption>
            <IonSelectOption value="nihilista">Nihilista</IonSelectOption>
            <IonSelectOption value="suspicaz">Suspicaz</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default EditPsycoInfo;
