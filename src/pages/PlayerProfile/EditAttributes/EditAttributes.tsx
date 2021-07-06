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

import "./EditAttributes.css";
const checkboxList = [
  { val: "Fuerza", isChecked: false },
  { val: "Entradas precisas", isChecked: false },
  { val: "Capitán", isChecked: false },
  { val: "Marcaje", isChecked: false },
  { val: "Ritmo", isChecked: false },
  { val: "Centros", isChecked: false },
  { val: "Reacción", isChecked: false },
  { val: "Destructor", isChecked: false },
  { val: "Interceptor", isChecked: false },
  { val: "Pases largos", isChecked: false },
  { val: "Todocampista", isChecked: false },
  { val: "Regateador", isChecked: false },
  { val: "Control del balón", isChecked: false },
  { val: "Tiro lejano", isChecked: false },
  { val: "Contraataques", isChecked: false },
  { val: "Ofensivo", isChecked: false },
  { val: "Velocidad", isChecked: false },
  { val: "Agilidad", isChecked: false },
  { val: "Tiros", isChecked: false },
  { val: "Finalización", isChecked: false },
  { val: "Segundo Delantero", isChecked: false },
  { val: "Referencia", isChecked: false },
];
const EditAttributes: React.FC = () => {
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
            Atributos
          </IonTitle>
          <IonButton fill="clear" slot="end" color="tertiary">
            Guardar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider color="primary">
          <div className="subtitulo">Atributos</div>
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

export default EditAttributes;
