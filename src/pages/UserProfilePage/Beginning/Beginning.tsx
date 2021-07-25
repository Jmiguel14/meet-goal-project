import {
  IonBackButton,
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
import { useAuth } from "contexts/AuthContext";
import { EditPersonalValues } from "firebase/client";
import { warningSharp } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import styles from "./styles.module.css";

export const valuesList = [
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
  const [check, setCheck] = useState(true);
  const history = useHistory();
  const { currentUser } = useAuth();

  var values: string[] = [];
  function setAttributesValues(value: string) {
    if (values.length <= 2) {
      values.push(value);
      setCheck(true);
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
        color: "success",
      });
      history.goBack();
    } else {
      present({
        message: "Error al actualizar la información. Intentelo nuevamente...",
        duration: 1000,
        position: "top",
        color: "danger",
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light" className={styles.acts}>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={`/tabs/perfil/${currentUser.uid}`}
              className={styles.icon_back}
            />
          </IonButtons>
          <IonTitle color="primary" className={styles.title}>
            Valores
          </IonTitle>
          <button
            className={styles.save_values_info}
            slot="end"
            onClick={onSubmit}
          >
            Guardar
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider color="primary">
          <div className={styles.subtitle}>Selecciona tus valores</div>
        </IonItemDivider>
        <IonItemDivider color="medium">
          <div className={styles.warning}>
            <IonIcon icon={warningSharp} size="small"></IonIcon>
            {" " + "Seleccione solo 3 valores"}
          </div>
        </IonItemDivider>
        <IonList className={styles.atribute}>
          {valuesList.map(({ val, isChecked }, i) => (
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
