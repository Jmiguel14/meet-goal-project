import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React from "react";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { EditSportsGoalsData } from "firebase/client";
import { ERROR_MESSAGES } from "constants/errorMessages";
import { useHistory } from "react-router";
import { SportsGoalsDataForm } from "types";

const schema = yup.object().shape({
  totalWins: yup.string().required(ERROR_MESSAGES.REQUIRED),
  maxNacGoal: yup.string().required(ERROR_MESSAGES.REQUIRED),
  maxIntgoal: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

export const EditSportsGoalsInfo: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const initialValues = {
    maxNacGoal: "",
    maxIntGoal: "",
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<SportsGoalsDataForm>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (
    data: SportsGoalsDataForm,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    console.log(data);
    const { totalWins, maxNacGoal, maxIntGoal } = data;
    if (await EditSportsGoalsData(totalWins, maxNacGoal, maxIntGoal)) {
      present({
        message: "Se actualizó la información exitosamente",
        duration: 1000,
        position: "top",
        color: "success",
      });
      history.push("/tabs/perfil");
    } else {
      present({
        message: "Error al actualizar la información. Intentelo nuevamente...",
        duration: 1000,
        position: "top",
        color: "danger",
      });
    }
    e?.target.reset();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light" className={styles.acts}>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/tabs/perfil"
              className={styles.icon_back}
            />
          </IonButtons>
          <IonTitle color="primary" className={styles.title}>
            Ed. L. Deportivos
          </IonTitle>
          <button
            type="submit"
            form="edit-sports-goals-info-form"
            slot="end"
            className={styles.save_goals_info}
          >
            Guardar
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.back}>
        <IonItemDivider color="primary">
          <div className={styles.subtitle}>
            Agregue aquí su logros deportivos
          </div>
        </IonItemDivider>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="edit-sports-goals-info-form"
        >
          <IonItem className={styles.goals_data}>
            <IonInput
              placeholder="Logros totales obtenidos"
              clearInput={true}
              {...register("totalWins")}
              onIonChange={() => {
                clearErrors("totalWins");
              }}
            ></IonInput>
          </IonItem>
          {errors.totalWins?.message && (
            <IonNote color="danger">{errors.totalWins?.message}</IonNote>
          )}
          <IonItem className={styles.goals_data}>
            <IonInput
              placeholder="Máximo logro nacionalmente"
              type="text"
              clearInput={true}
              {...register("maxNacGoal")}
              onIonChange={() => {
                clearErrors("maxNacGoal");
              }}
            ></IonInput>
          </IonItem>
          {errors.maxNacGoal?.message && (
            <IonNote color="danger">{errors.maxNacGoal?.message}</IonNote>
          )}
          <IonItem className={styles.goals_data}>
            <IonInput
              placeholder="Máximo logros internacionalmente"
              type="text"
              clearInput={true}
              {...register("maxIntGoal")}
              onIonChange={() => {
                clearErrors("maxIntGoal");
              }}
            ></IonInput>
          </IonItem>
          {errors.maxIntGoal?.message && (
            <IonNote color="danger">{errors.maxIntGoal?.message}</IonNote>
          )}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditSportsGoalsInfo;
