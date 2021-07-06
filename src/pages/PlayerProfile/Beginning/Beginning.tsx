import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { EditPersonalValues } from "firebase/client";
import { warningSharp } from "ionicons/icons";
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
  const [present] = useIonToast();
  const [checked, setChecked] = useState(false);
  const [check, setCheck] = useState(true);

  var values: string[] = [];
  function setAttributesValues(value: string) {
    if (values.length <= 2) {
      values.push(value);
      setCheck(true);
      console.log(check);
      console.log(values);
    } else {
      setCheck(false);
      values = [];
    }
  }
  const onSubmit = async () => {
    if (await EditPersonalValues(values[0], values[1], values[2])) {
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
            Valores
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
      <IonContent fullscreen>
        <IonItemDivider color="primary">
          <div className="subtitulo">Selecciona tus valores</div>
        </IonItemDivider>
        <IonItemDivider color="medium">
          <div className="advertencia">
            <IonIcon icon={warningSharp} size="small"></IonIcon>
            {" " + "Seleccione solo 3 valores"}
          </div>
        </IonItemDivider>
        <IonList className="atributos">
          {checkboxList.map(({ val, isChecked }, i) => (
            <IonItem key={i}>
              <IonLabel>{val}</IonLabel>
              <IonCheckbox
                slot="end"
                value={val}
                checked={isChecked}
                onIonChange={(e) => setAttributesValues(e.detail.value!)}
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Beginning;
