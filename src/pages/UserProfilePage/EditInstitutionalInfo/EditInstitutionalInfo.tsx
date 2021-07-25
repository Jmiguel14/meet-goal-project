import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { SetInstitutionalData } from "firebase/client";
import { ERROR_MESSAGES } from "constants/errorMessages";
import { useHistory } from "react-router";
import { InstitutionalDataForm } from "types";
import { useAuth } from "contexts/AuthContext";

const schema = yup.object().shape({
  socialName: yup.string().required(ERROR_MESSAGES.REQUIRED),
  mail: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .email(ERROR_MESSAGES.EMAIL),
  country: yup.string().required(ERROR_MESSAGES.REQUIRED),
  city: yup.string().required(ERROR_MESSAGES.REQUIRED),
  foundation: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

export const EditInstitutionalInfo: React.FC = () => {
  const [present] = useIonToast();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const history = useHistory();
  const { currentUser } = useAuth();
  const initialValues = {
    socialName: "",
    mail: "",
    country: "",
    city: "",
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<InstitutionalDataForm>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (
    data: InstitutionalDataForm,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const { socialName, mail, city, country, phone, foundation } = data;
    if (
      await SetInstitutionalData(
        socialName,
        mail,
        city,
        country,
        phone,
        foundation
      )
    ) {
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
          <IonTitle color="primary" className={styles.title}>
            Ed. I. Institucional
          </IonTitle>
          <button
            type="submit"
            form="edit-institutional-info-form"
            slot="end"
            className={styles.save_institutional_info}
          >
            Guardar
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.back}>
        <IonItemDivider color="primary">
          <div className={styles.subtitle}>
            Edite aquí tu Información Institucional
          </div>
        </IonItemDivider>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="edit-institutional-info-form"
        >
          <IonItem className={styles.institutional_data}>
            <IonInput
              placeholder="Razón Social"
              type="text"
              clearInput={true}
              {...register("socialName")}
              onIonChange={() => {
                clearErrors("socialName");
              }}
            ></IonInput>
          </IonItem>
          {errors.socialName?.message && (
            <IonNote color="danger">{errors.socialName?.message}</IonNote>
          )}
          <IonItem className={styles.institutional_data}>
            <IonInput
              placeholder="Correo Electrónico"
              type="text"
              clearInput={true}
              {...register("mail")}
              onIonChange={() => {
                clearErrors("mail");
              }}
            ></IonInput>
          </IonItem>
          {errors.mail?.message && (
            <IonNote color="danger">{errors.mail?.message}</IonNote>
          )}
          <IonItem className={styles.institutional_data}>
            <IonInput
              placeholder="País"
              type="text"
              clearInput={true}
              {...register("country")}
              onIonChange={() => {
                clearErrors("country");
              }}
            ></IonInput>
          </IonItem>

          {errors.country?.message && (
            <IonNote color="danger">{errors.country?.message}</IonNote>
          )}

          <IonItem className={styles.institutional_data}>
            <IonInput
              placeholder="Ciudad"
              type="text"
              clearInput={true}
              {...register("city")}
              onIonChange={() => {
                clearErrors("city");
              }}
            ></IonInput>
          </IonItem>
          {errors.city?.message && (
            <IonNote color="danger">{errors.city?.message}</IonNote>
          )}

          <IonItem className={styles.institutional_data}>
            <IonInput
              placeholder="Teléfono"
              type="text"
              clearInput={true}
              {...register("phone")}
              onIonChange={() => {
                clearErrors("phone");
              }}
            ></IonInput>
          </IonItem>
          {errors.phone?.message && (
            <IonNote color="danger">{errors.phone?.message}</IonNote>
          )}

          <IonItem className={styles.institutional_data}>
            <IonLabel>F. de Fundación (Mes/Día/Año)</IonLabel>
            <IonDatetime
              itemType="text"
              displayFormat="MMM/DD/YY"
              monthShortNames="ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC"
              {...register("foundation")}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditInstitutionalInfo;
