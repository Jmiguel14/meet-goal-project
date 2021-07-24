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
import React, { useState } from "react";
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
  mail: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .email(ERROR_MESSAGES.EMAIL),
  country: yup.string().required(ERROR_MESSAGES.REQUIRED),
  city: yup.string().required(ERROR_MESSAGES.REQUIRED),
  birth: yup.string().required(ERROR_MESSAGES.REQUIRED),
  contract: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

export const EditPersonalInfo: React.FC = () => {
  const [present] = useIonToast();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const history = useHistory();
  const {currentUser} = useAuth()
  const initialValues = {
    mail: "",
    country: "",
    city: "",
    contract: "",
    marketTransfer: "",
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<PersonalDataForm>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (
    data: PersonalDataForm,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const { mail, phone, country, city, birth, contract, marketTransfer } =
      data;
    if (
      await SetPersonalData(
        mail,
        country,
        city,
        birth,
        contract,
        phone,
        marketTransfer
      )
    ) {
      present({
        message: "Se actualizó la información exitosamente",
        duration: 1000,
        position: "top",
        color: "success",
      });
      history.push(`/tabs/perfil/${currentUser.uid}`);
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
          <IonItem className={styles.personal_data}>
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

          <IonItem className={styles.personal_data}>
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

          <IonItem className={styles.personal_data}>
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

          <IonItem className={styles.personal_data}>
            <IonLabel>F. Nacimiento (Mes/Día/Año)</IonLabel>
            <IonDatetime
              itemType="text"
              displayFormat="MMM/DD/YY"
              monthShortNames="ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC"
              {...register("birth")}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
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
            <IonInput
              placeholder="Pega aquí tu link de MarketTransfer"
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
