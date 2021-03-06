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
import React, { useEffect } from "react";
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
  socialName: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, ERROR_MESSAGES.MATCH_NAME)
    .min(3, ERROR_MESSAGES.MIN_NAME_LENGTH)
    .max(30, ERROR_MESSAGES.MAX_NAME_LENGTH),
  country: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, ERROR_MESSAGES.MATCH_NAME)
    .min(3, ERROR_MESSAGES.MIN_NAME_LENGTH)
    .max(30, ERROR_MESSAGES.MAX_NAME_LENGTH),
  city: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, ERROR_MESSAGES.MATCH_NAME)
    .min(3, ERROR_MESSAGES.MIN_NAME_LENGTH)
    .max(30, ERROR_MESSAGES.MAX_NAME_LENGTH),
  phone: yup
    .number()
    .typeError(ERROR_MESSAGES.NUMBER)
    .positive(ERROR_MESSAGES.POSITIVE)
    .required(ERROR_MESSAGES.REQUIRED)
    .max(1000000000, ERROR_MESSAGES.MIN_MAX_PHONE)
    .min(100000000, ERROR_MESSAGES.MIN_MAX_PHONE),
  foundation: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

export const EditInstitutionalInfo: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const { currentUser, data } = useAuth();

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<InstitutionalDataForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("socialName", data?.socialName);
    setValue("country", data?.country);
    setValue("city", data?.city);
    setValue("phone", data?.phone);
    setValue("foundation", data?.foundation);
  }, [data]);

  const onSubmit = async (data: InstitutionalDataForm) => {
    const { socialName, city, country, phone, foundation } = data;
    try {
      await SetInstitutionalData(socialName, city, country, phone, foundation);
      present({
        message: "Se actualiz?? la informaci??n exitosamente",
        duration: 3000,
        position: "top",
        color: "success",
      });
      history.goBack();
    } catch {
      present({
        message: "Error al actualizar la informaci??n. Intentelo nuevamente...",
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
      <IonContent className={styles.back}>
        <IonItemDivider color="primary">
          <div className={styles.subtitle}>
            Edite aqu?? tu Informaci??n Institucional
          </div>
        </IonItemDivider>
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="edit-institutional-info-form"
        >
          <IonItem className={styles.institutional_data}>
            <IonInput
              placeholder="Raz??n Social"
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
              placeholder="Pa??s"
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
              placeholder="Tel??fono"
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
            <IonLabel>F. de Fundaci??n (Mes/D??a/A??o)</IonLabel>
            <IonDatetime
              cancelText="Cancelar"
              doneText="Hecho"
              itemType="text"
              displayFormat="MMM/DD/YYYY"
              monthShortNames="ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC"
              {...register("foundation")}
              onIonChange={() => {
                clearErrors("foundation");
              }}
            ></IonDatetime>
          </IonItem>
          {errors.foundation?.message && (
            <IonNote color="danger">{errors.foundation?.message}</IonNote>
          )}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditInstitutionalInfo;
