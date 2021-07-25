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
  injuryName: yup.string().required(ERROR_MESSAGES.REQUIRED),
  recoveryTime: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

const AddInjury: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const { currentUser } = useAuth();

  const initialValues = {
    injuryName: "",
    recoveryTime: "",
    surgery: false,
  };

  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<InjuryDataForm>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (
    data: InjuryDataForm,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const { injuryName, recoveryTime, surgery } = data;
    if (await AddInjuryExperienced(injuryName, recoveryTime, surgery)) {
      present({
        message: "Se ha registrado la inforamción ha tu historial médico",
        duration: 1000,
        position: "top",
        color: "success",
      });
      history.goBack();
    } else {
      present({
        message: "Error al agregar la información. Intentelo nuevamente...",
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
            ></IonInput>
          </IonItem>
          {errors.recoveryTime && (
            <IonNote color="danger">{errors.recoveryTime?.message}</IonNote>
          )}
          <IonItem className={styles.injury_field}>
            <IonLabel color="medium">Proceso Quirúrgico</IonLabel>
            <IonToggle
              checked={checked}
              {...register("surgery")}
              onIonChange={(e) => setChecked(e.detail.checked)}
            />
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddInjury;
