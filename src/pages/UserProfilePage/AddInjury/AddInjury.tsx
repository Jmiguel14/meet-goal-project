import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonNote,
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
import { ERROR_MESSAGES } from "constants/errorMessages";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InjuryDataForm } from "types";
import { useAuth } from "contexts/AuthContext";

const schema = yup.object().shape({
  injuryName: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, ERROR_MESSAGES.MATCH_NAME),
  recoveryTime: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, ERROR_MESSAGES.MATCH_NAME),
});

const AddInjury: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const [isChecked, setIsChecked] = useState(false);
  const { currentUser } = useAuth();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<InjuryDataForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: InjuryDataForm) => {
    const { injuryName, recoveryTime } = data;
    const surgery = isChecked;
    try {
      await AddInjuryExperienced(injuryName, recoveryTime, surgery);
      present({
        message: "Se ha registrado la información ha tu historial médico",
        duration: 3000,
        position: "top",
        color: "success",
      });
      history.goBack();
    } catch {
      present({
        message: "Error al agregar la información. Intentelo nuevamente...",
        duration: 3000,
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
              onIonChange={() => {
                clearErrors("injuryName");
              }}
            ></IonInput>
          </IonItem>
          {errors.injuryName && (
            <IonNote color="danger">{errors.injuryName?.message}</IonNote>
          )}
          <IonItem className={styles.injury_field}>
            <IonInput
              type="text"
              placeholder="Tiempo de recuperación"
              clearInput={true}
              {...register("recoveryTime")}
              onIonChange={() => {
                clearErrors("recoveryTime");
              }}
            ></IonInput>
          </IonItem>
          {errors.recoveryTime && (
            <IonNote color="danger">{errors.recoveryTime?.message}</IonNote>
          )}
          <IonItem className={styles.injury_field}>
            <IonLabel color="medium">Proceso Quirúrgico</IonLabel>
            <IonToggle
              checked={isChecked}
              {...register("surgery")}
              onIonChange={(e) => {
                const isChecked = e.detail.checked;
                setIsChecked(isChecked);
              }}
            />
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddInjury;
