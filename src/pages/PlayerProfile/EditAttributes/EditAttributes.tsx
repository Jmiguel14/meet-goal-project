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
import { checkboxList } from "constants/collectionsForms";
import { EditTacticalAttributes } from "firebase/client";
import { warningSharp } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import styles from "./styles.module.css";

const EditAttributes: React.FC = () => {
  const [present] = useIonToast();
  const [check, setCheck] = useState(true);
  const history = useHistory();

  var values: string[] = [];
  function setAttributesValues(value: string) {
    if (values.length <= 3) {
      values.push(value);
      setCheck(true);
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
        color: "success",
      });
      history.push("/tabs/perfil-jugador");
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
              defaultHref="/tabs/perfil-jugador"
              className={styles.icon_back}
            />
          </IonButtons>
          <IonTitle color="primary" className={styles.title}>
            Atributos
          </IonTitle>
          <button
            slot="end"
            className={styles.save_attribute_info}
            onClick={onSubmit}
          >
            Guardar
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider color="primary">
          <div className={styles.subtitle}>Atributos</div>
        </IonItemDivider>
        <IonItemDivider color="medium">
          <div className={styles.message}>
            <IonIcon icon={warningSharp} size="small"></IonIcon>
            {" " + "Seleccione solo 4 atributos"}
          </div>
        </IonItemDivider>
        <IonList className={styles.attributes}>
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
