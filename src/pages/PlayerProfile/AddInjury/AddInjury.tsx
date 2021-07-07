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
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { AddInjuryExperienced } from "firebase/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styles from "./styles.module.css";

export interface IVForm {
  injuryName: string;
  recoveryTime: string;
  surgery: boolean;
}

const AddInjury: React.FC = () => {
  const [present] = useIonToast();
  const { register, reset, handleSubmit } = useForm();
  const history = useHistory();
  const [checked, setChecked] = useState(false);

  const onSubmit = async (
    data: IVForm,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const { injuryName, recoveryTime, surgery } = data;
    if (await AddInjuryExperienced(injuryName, recoveryTime, surgery)) {
      present({
        message: "Se ha registrado la inforamción ha tu historial médico",
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
          <IonTitle color="primary" className={styles.titles}>
            Añadir Lesión
          </IonTitle>
          <button
            type="submit"
            form="add-injury-info-form"
            slot="end"
            className={styles.save_injury_info}
          >
            Guardar
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.new_injury}>
        <IonItemDivider color="primary">
          <div className={styles.subtitle}>Detalles de la lesión</div>
        </IonItemDivider>
        <form onSubmit={handleSubmit(onSubmit)} id="add-injury-info-form">
          <IonItem className={styles.injury_field}>
            <IonInput
              type="text"
              placeholder="Nombre de la lesión"
              clearInput={true}
              {...register("injuryName")}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.injury_field}>
            <IonInput
              type="text"
              placeholder="Tiempo de recuperación"
              clearInput={true}
              {...register("recoveryTime")}
            ></IonInput>
          </IonItem>
          <IonItem className={styles.injury_field}>
            <IonLabel color="medium">Proceso Quirúrgico</IonLabel>
            <IonToggle
              checked={checked}
              onIonChange={(e) => setChecked(e.detail.checked)}
              {...register("surgery")}
            />
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddInjury;
