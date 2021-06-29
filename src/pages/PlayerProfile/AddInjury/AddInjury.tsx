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
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";

import "./AddInjury.css";
const AddInjury: React.FC = () => {
  const [checked, setChecked] = useState(false);
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
            Añadir Lesión
          </IonTitle>
          <IonButton fill="clear" slot="end" color="tertiary">
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="nueva-lesion">
        <IonItemDivider color="primary">
          <div className="subtitulo">Detalles de la lesión</div>
        </IonItemDivider>
        <IonItem className="campo-lesion">
          <IonInput placeholder="Nombre de la lesión"></IonInput>
        </IonItem>
        <IonItem className="campo-lesion">
          <IonInput placeholder="Tiempo de recuperación"></IonInput>
        </IonItem>
        <IonItem className="campo-lesion">
          <IonLabel color="medium">Proceso Quirúrgico</IonLabel>
          <IonToggle
            checked={checked}
            onIonChange={(e) => setChecked(e.detail.checked)}
          />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default AddInjury;
