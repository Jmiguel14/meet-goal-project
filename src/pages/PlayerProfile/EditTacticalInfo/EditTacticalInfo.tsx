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

import "./EditTacticalInfo.css";

const EditTacticalInfo: React.FC = () => {
  const [checked, setChecked] = useState(false);

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
            Editar I. Táctica
          </IonTitle>
          <IonButton fill="clear" slot="end" color="tertiary">
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding-vertical">
        <IonItem class="elemento">
          <IonLabel>Posición Principal</IonLabel>
          <IonSelect okText="Listo" cancelText="Cerrar" slot="end">
            <IonSelectOption value="POR">Portero</IonSelectOption>
            <IonSelectOption value="CAI">Carrilero Izq.</IonSelectOption>
            <IonSelectOption value="CAD">Carrilero Der.</IonSelectOption>
            <IonSelectOption value="LI">Lateral Izquierdo</IonSelectOption>
            <IonSelectOption value="LD">Lateral Derecho</IonSelectOption>
            <IonSelectOption value="DFC">Defensa Central</IonSelectOption>
            <IonSelectOption value="MCD">Medio Centro Def.</IonSelectOption>
            <IonSelectOption value="MC">Medio Centro</IonSelectOption>
            <IonSelectOption value="MCO">Medio Centro Of.</IonSelectOption>
            <IonSelectOption value="MI">Medio Izquierdo</IonSelectOption>
            <IonSelectOption value="MD">Medio Derecho</IonSelectOption>
            <IonSelectOption value="SD">Segundo Delantero</IonSelectOption>
            <IonSelectOption value="DC">Cnetro Delantero</IonSelectOption>
            <IonSelectOption value="EI">Ext. Izquierdo</IonSelectOption>
            <IonSelectOption value="ED">Ext.Derecho</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem class="elemento">
          <IonLabel>Posición Secundaria</IonLabel>
          <IonSelect okText="Listo" cancelText="Cerrar" slot="end">
            <IonSelectOption value="POR">Portero</IonSelectOption>
            <IonSelectOption value="CAI">Carrilero Izq.</IonSelectOption>
            <IonSelectOption value="CAD">Carrilero Der.</IonSelectOption>
            <IonSelectOption value="LI">Lateral Izquierdo</IonSelectOption>
            <IonSelectOption value="LD">Lateral Derecho</IonSelectOption>
            <IonSelectOption value="DFC">Defensa Central</IonSelectOption>
            <IonSelectOption value="MCD">Medio Centro Def.</IonSelectOption>
            <IonSelectOption value="MC">Medio Centro</IonSelectOption>
            <IonSelectOption value="MCO">Medio Centro Of.</IonSelectOption>
            <IonSelectOption value="MI">Medio Izquierdo</IonSelectOption>
            <IonSelectOption value="MD">Medio Derecho</IonSelectOption>
            <IonSelectOption value="SD">Segundo Delantero</IonSelectOption>
            <IonSelectOption value="DC">Cnetro Delantero</IonSelectOption>
            <IonSelectOption value="EI">Ext. Izquierdo</IonSelectOption>
            <IonSelectOption value="ED">Ext.Derecho</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem class="elemento">
          <IonInput placeholder="Logros"></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default EditTacticalInfo;
