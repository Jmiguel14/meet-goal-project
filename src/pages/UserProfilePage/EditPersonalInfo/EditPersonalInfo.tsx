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
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useEffect } from "react";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { SetPersonalData } from "firebase/client";
import { ERROR_MESSAGES } from "constants/errorMessages";
import { useHistory } from "react-router";
import { PersonalDataForm } from "types";
import { useAuth } from "contexts/AuthContext";

const schema = yup.object().shape({
  country: yup.string().required(ERROR_MESSAGES.REQUIRED),
  city: yup.string().required(ERROR_MESSAGES.REQUIRED),
  birth: yup.string().required(ERROR_MESSAGES.REQUIRED),
  contract: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

export const EditPersonalInfo: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const { currentUser, data } = useAuth();

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<PersonalDataForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("phone", data?.phone);
    setValue("country", data?.country);
    setValue("city", data?.city);
    setValue("contract", data?.contract);
    setValue("marketTransfer", data?.marketTransfer);
    setValue("birth", data?.birth);
  }, [data]);

  const onSubmit = async (data: PersonalDataForm) => {
    const { phone, country, city, birth, contract } = data;
    console.log("data", data);
    const marketTransfer =
      data.marketTransfer === undefined ? "" : data.marketTransfer;
    try {
      await SetPersonalData(
        country,
        city,
        birth,
        contract,
        phone,
        marketTransfer
      );
      present({
        message: "Se actualizó la información exitosamente",
        duration: 3000,
        position: "top",
        color: "success",
      });
      history.goBack();
    } catch {
      present({
        message: "Error al actualizar la información. Intentelo nuevamente...",
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
            Editar I. Personal
          </IonTitle>
          <button
            type="submit"
            form="edit-personal-info-form"
            slot="end"
            className={styles.save_personal_info}
          >
            Guardar
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.back}>
        {console.log("render")}
        <IonItemDivider color="primary">
          <div className={styles.subtitle}>
            Edita aquí tu Información Personal
          </div>
        </IonItemDivider>
        <form onSubmit={handleSubmit(onSubmit)} id="edit-personal-info-form">
          <IonItem className={styles.personal_data}>
            <IonLabel color="medium" position="floating">
              País
            </IonLabel>
            <IonInput
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

          <IonItem className={styles.personal_data}>
            <IonLabel color="medium" position="floating">
              Ciudad
            </IonLabel>
            <IonInput
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

          <IonItem className={styles.personal_data}>
            <IonLabel color="medium" position="floating">
              Teléfono
            </IonLabel>
            <IonInput
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

          <IonItem className={styles.personal_data}>
            <IonLabel>F. Nacimiento (Mes/Día/Año)</IonLabel>
            <IonDatetime
              itemType="text"
              displayFormat="MMM/DD/YY"
              monthShortNames="ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC"
              {...register("birth")}
              onIonChange={() => {
                clearErrors("birth");
              }}
            ></IonDatetime>
          </IonItem>
          {errors.birth?.message && (
            <IonNote color="danger">{errors.birth?.message}</IonNote>
          )}

          <IonItem className={styles.personal_data}>
            <IonLabel color="medium">Estado Contractual</IonLabel>
            <IonSelect
              okText="okay"
              cancelText="Cerrar"
              {...register("contract")}
              onIonChange={() => {
                clearErrors("contract");
              }}
            >
              <IonSelectOption value="libre">Libre</IonSelectOption>
              <IonSelectOption value="prestamo">Préstamo</IonSelectOption>
              <IonSelectOption value="contratado">Contratado</IonSelectOption>
            </IonSelect>
          </IonItem>
          {errors.contract && (
            <IonNote color="danger">{errors.contract?.message}</IonNote>
          )}

          <IonItem className={styles.personal_data}>
            <IonLabel color="medium" position="floating">
              Enlace de Market Transfer
            </IonLabel>
            <IonInput
              type="text"
              clearInput={true}
              {...register("marketTransfer")}
              onIonChange={() => {
                clearErrors("marketTransfer");
              }}
            ></IonInput>
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditPersonalInfo;
