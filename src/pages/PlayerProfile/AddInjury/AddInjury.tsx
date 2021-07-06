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
  useIonToast,
} from "@ionic/react";
import { AddInjuryExperienced } from "firebase/client";
import { useState } from "react";

import "./AddInjury.css";
const AddInjury: React.FC = () => {
  const [present] = useIonToast();
  const [injuryName, setInjuryName] = useState("");
  const [recoveryTime, setRecoveryTime] = useState("");
  const [checked, setChecked] = useState(false);

  const onSubmit = async (e: any) => {
    if (await AddInjuryExperienced(injuryName, recoveryTime, checked)) {
      present({
        message: "Se ha registrado la inforamción ha tu historial médico",
        duration: 1000,
        position: "top",
        color: "primary",
      });
    }
    e.target.reset();
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
            Añadir Lesión
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
      <IonContent fullscreen className="nueva-lesion">
        <IonItemDivider color="primary">
          <div className="subtitulo">Detalles de la lesión</div>
        </IonItemDivider>
        <IonItem className="campo-lesion">
          <IonInput
            placeholder="Nombre de la lesión"
            onIonChange={(e: any) => setInjuryName(e.currentTarget.value)}
          ></IonInput>
        </IonItem>
        <IonItem className="campo-lesion">
          <IonInput
            placeholder="Tiempo de recuperación"
            onIonChange={(e: any) => setRecoveryTime(e.currentTarget.value)}
          ></IonInput>
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
