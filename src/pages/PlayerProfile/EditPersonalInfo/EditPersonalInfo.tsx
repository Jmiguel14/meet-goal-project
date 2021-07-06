import {
  IonBackButton,
  IonButton,
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
import "./EditPersonalInfo.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { SetPersonalData } from "firebase/client";
import { contract } from "ionicons/icons";

export enum ContractTypeEnum {
  libre = "libre",
  prestamo = "prestamo",
  contratado = "contratado",
}

export interface IIForm {
  mail: string;
  country: string;
  city: string;
  phone: number;
  birth: string;
  contract: ContractTypeEnum;
  marketTransfer: string;
}

const ERROR_MESSAGES = {
  required: "Este campo es requerido",
  email: "Email no válido",
};

const schema = yup.object().shape({
  mail: yup
    .string()
    .required(ERROR_MESSAGES.required)
    .email(ERROR_MESSAGES.email),
  country: yup.string().required(ERROR_MESSAGES.required),
  city: yup.string().required(ERROR_MESSAGES.required),
  birth: yup.string().required(ERROR_MESSAGES.required),
  contract: yup.string().required(ERROR_MESSAGES.required),
});

export const EditPersonalInfo: React.FC = () => {
  const [present] = useIonToast();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const initialValues = {
    mail: "",
    country: "",
    city: "",
    birth: selectedDate,
    marketTransfer: "",
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<IIForm>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any, e: any) => {
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
        color: "primary",
      });
    }
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonPage>
        <IonHeader>
          <IonToolbar color="light" className="acciones">
            <IonButtons slot="start">
              <IonBackButton
                defaultHref="/tabs/perfil-jugador"
                className="icon-back"
              />
            </IonButtons>
            <IonTitle color="primary" className="ion-padding titulo">
              Editar I. Personal
            </IonTitle>
            <IonButton
              fill="clear"
              slot="end"
              color="tertiary"
              type="submit"
              routerLink="/tabs/perfil-jugador"
            >
              Guardar
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="fondo">
          <IonItemDivider color="primary">
            <div className="subtitulo">Edita aquí tu Información Personal</div>
          </IonItemDivider>

          <IonItem className="dato-personal">
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
          <IonItem className="dato-personal">
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

          <IonItem className="dato-personal">
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

          <IonItem className="dato-personal">
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

          <IonItem className="dato-personal">
            <IonLabel>F. Nacimiento (Mes/Día/Año)</IonLabel>
            <IonDatetime
              itemType="text"
              displayFormat="MMM/DD/YY"
              monthShortNames="ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC"
              {...register("birth")}
              onIonChange={(e) => setSelectedDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
          <IonItem className="dato-personal">
            <IonLabel color="medium">Estado Contractual</IonLabel>
            <IonSelect
              itemType="text"
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

          <IonItem className="dato-personal">
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
        </IonContent>
      </IonPage>{" "}
    </form>
  );
};

export default EditPersonalInfo;
