import {
  IonBackButton,
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
import { ERROR_MESSAGES } from "constants/errorMessages";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { SportsGoalsDataForm } from "types";
import { EditSportsGoalsData } from "firebase/client";
import { useAuth } from "contexts/AuthContext";

const schema = yup.object().shape({
  totalWins: yup
    .number()
    .typeError(ERROR_MESSAGES.REQUIRED)
    .required(ERROR_MESSAGES.REQUIRED),
  maxNacGoal: yup.string().required(ERROR_MESSAGES.REQUIRED),
  maxIntGoal: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

export const EditSportsGoalsInfo: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const { currentUser, data } = useAuth();

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<SportsGoalsDataForm>({ resolver: yupResolver(schema) });

  useEffect(() => {
    setValue("totalWins", data?.totalWins);
    setValue("maxNacGoal", data?.maxNacGoal);
    setValue("maxIntGoal", data?.maxIntGoal);
  }, [data]);

  const onSubmit = async (data: SportsGoalsDataForm) => {
    const { totalWins, maxNacGoal, maxIntGoal } = data;
    try {
      await EditSportsGoalsData(totalWins, maxNacGoal, maxIntGoal);
      present({
        message: "Se agrego el club a tu experiencia",
        duration: 1000,
        position: "top",
        color: "success",
      });
      history.goBack();
    } catch {
      present({
        message: "Error al agregar la información intentelo nuevamente...",
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
      <IonContent fullscreen class={styles.back}>
        <IonItemDivider color="primary">
          <div className={styles.divisor}>Edite aquí sus logros deportivos</div>
        </IonItemDivider>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="edit-sports-goals-info-form"
        >
          <IonItem className={styles.goals_data}>
            <IonInput
              type="number"
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
