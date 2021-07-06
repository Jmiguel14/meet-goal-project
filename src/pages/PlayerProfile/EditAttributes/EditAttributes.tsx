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
import { EditTacticalAttributes } from "firebase/client";
import { warningSharp } from "ionicons/icons";
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
  const [present] = useIonToast();
  const [check, setCheck] = useState(true);

  var values: string[] = [];
  function setAttributesValues(value: string) {
    if (values.length <= 3) {
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
    if (
      await EditTacticalAttributes(values[0], values[1], values[2], values[3])
    ) {
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
            Atributos
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
          <div className="subtitulo">Atributos</div>
        </IonItemDivider>
        <IonItemDivider color="medium">
          <div className="mensaje">
            <IonIcon icon={warningSharp} size="small"></IonIcon>
            {" " + "Seleccione solo 4 atributos"}
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

export default EditAttributes;
