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
  birth: yup.string().required(ERROR_MESSAGES.REQUIRED),
  contract: yup.string().required(ERROR_MESSAGES.REQUIRED),
  marketTransfer: yup.string().matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, {
    message: ERROR_MESSAGES.MATCH_WITH_TEXT,
    excludeEmptyString: true,
  }),
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
              type="number"
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
              cancelText="Cancelar"
              doneText="Hecho"
              itemType="text"
              displayFormat="MMM/DD/YYYY"
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
              okText="Ok"
              cancelText="Cerrar"
              {...register("contract")}
              onIonChange={() => {
                clearErrors("contract");
              }}
            >
              <IonSelectOption value="Libre">Libre</IonSelectOption>
              <IonSelectOption value="Préstamo">Préstamo</IonSelectOption>
              <IonSelectOption value="Contratado">Contratado</IonSelectOption>
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
          {errors.marketTransfer?.message && (
            <IonNote color="danger">{errors.marketTransfer?.message}</IonNote>
          )}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditPersonalInfo;
