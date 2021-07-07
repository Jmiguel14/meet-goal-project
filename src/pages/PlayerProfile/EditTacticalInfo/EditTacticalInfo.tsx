import {
  IonBackButton,
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
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styles from "./styles.module.css";

export interface VIForm {
  pospri: string;
  possec: string;
  goals: string;
}

const EditTacticalInfo: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const { reset, handleSubmit, register } = useForm();

  const onSubmit = async (
    data: VIForm,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const { pospri, possec, goals } = data;
    if (await EditPositionData(pospri, possec, goals)) {
      present({
        message: "Se actualizó la información exitosamente",
        duration: 1000,
        position: "top",
        color: "primary",
      });
    }
    e?.target.reset();
    history.push("/tabs/perfil-jugador");
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
            Editar I. Táctica
          </IonTitle>
          <button
            type="submit"
            form="edit-tactical-info-form"
            slot="end"
            className={styles.save_tactical_info}
          >
            Guardar
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.tactical_data}>
        <IonItemDivider color="primary">
          <div className={styles.subtitle}>Editar tu Información Táctica</div>
        </IonItemDivider>
        <form onSubmit={handleSubmit(onSubmit)} id="edit-tactical-info-form">
          <IonItem className={styles.tactical_field}>
            <IonLabel>Posición Principal</IonLabel>
            <IonSelect
              okText="Listo"
              cancelText="Cerrar"
              slot="end"
              value=""
              {...register("pospri")}
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
          <IonItem className={styles.tactical_field}>
            <IonLabel>Posición Secundaria</IonLabel>
            <IonSelect
              okText="Listo"
              cancelText="Cerrar"
              slot="end"
              value=""
              {...register("possec")}
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
          <IonItem className={styles.tactical_field}>
            <IonInput placeholder="Logros" {...register("goals")}></IonInput>
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditTacticalInfo;
