import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { EditPositionData } from "firebase/client";
import { useState } from "react";

import "./EditTacticalInfo.css";

const EditTacticalInfo: React.FC = () => {
  const [present] = useIonToast();
  const [pospri, setPospri] = useState<string>("");
  const [possec, setPossec] = useState<string>("");
  const [goals, setGoals] = useState<string>("");

  const onSubmit = async () => {
    if (await EditPositionData(pospri, possec, goals)) {
      present({
        message: "Se actualizó la información exitosamente",
        duration: 1000,
        position: "top",
        color: "primary",
      });
    }
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
            Editar I. Táctica
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
      <IonContent fullscreen className="datos-tacticos">
        <IonItemDivider color="primary">
          <div className="subtitulo">Editar tu Información Táctica</div>
        </IonItemDivider>
        <IonItem className="campo-tactico">
          <IonLabel>Posición Principal</IonLabel>
          <IonSelect
            okText="Listo"
            cancelText="Cerrar"
            slot="end"
            onIonChange={(e: any) => setPospri(e.currentTarget.value)}
          >
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
            <IonSelectOption value="DC">Centro Delantero</IonSelectOption>
            <IonSelectOption value="EI">Ext. Izquierdo</IonSelectOption>
            <IonSelectOption value="ED">Ext.Derecho</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem className="campo-tactico">
          <IonLabel>Posición Secundaria</IonLabel>
          <IonSelect
            okText="Listo"
            cancelText="Cerrar"
            slot="end"
            onIonChange={(e: any) => setPossec(e.currentTarget.value)}
          >
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
            <IonSelectOption value="DC">Centro Delantero</IonSelectOption>
            <IonSelectOption value="EI">Ext. Izquierdo</IonSelectOption>
            <IonSelectOption value="ED">Ext.Derecho</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem className="campo-tactico">
          <IonInput
            placeholder="Logros"
            onIonChange={(e: any) => setGoals(e.currentTarget.value)}
          ></IonInput>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default EditTacticalInfo;
