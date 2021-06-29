import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";

import "./Beginning.css";
const checkboxList = [
  { val: "Juego Limpio", isChecked: false },
  { val: "Respeto", isChecked: false },
  { val: "Compañerismo", isChecked: false },
  { val: "Disciplina", isChecked: false },
  { val: "Asumir Frustraciones", isChecked: false },
  { val: "Esfuerzo", isChecked: false },
  { val: "Ssaber disfrutar", isChecked: false },
  { val: "Humildad", isChecked: false },
  { val: "Amistad", isChecked: false },
  { val: "Unidad y liderazgo", isChecked: false },
  { val: "Solidaridad", isChecked: false },
];
const Beginning: React.FC = () => {
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
            Valores
          </IonTitle>
          <IonButton fill="clear" slot="end" color="tertiary">
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider color="primary">
          <div className="subtitulo">Selecciona tus valores</div>
        </IonItemDivider>
        <IonList className="atributos">
          {checkboxList.map(({ val, isChecked }, i) => (
            <IonItem key={i}>
              <IonLabel>{val}</IonLabel>
              <IonCheckbox slot="end" value={val} checked={isChecked} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Beginning;
