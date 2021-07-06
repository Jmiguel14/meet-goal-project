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

import "./AddClub.css";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { AddCubExperience } from "firebase/client";

export interface IIIForm {
  clubName: string;
  country: string;
  season: number;
  subPlayer: string;
  catTournament: string;
  PJ: number;
  G: number;
  A: number;
  TA: number;
  TR: number;
}

const ERROR_MESSAGES = {
  required: "Este campo es requerido",
  number: "Debe especificar un número",
  positive: "Debe ser un número positivo",
};

const schema = yup.object().shape({
  clubName: yup.string().required(ERROR_MESSAGES.required),
  country: yup.string().required(ERROR_MESSAGES.required),
  season: yup
    .number()
    .typeError(ERROR_MESSAGES.number)
    .positive(ERROR_MESSAGES.positive)
    .required(ERROR_MESSAGES.required),
  subPlayer: yup.string().required(ERROR_MESSAGES.required),
  catTournament: yup.string().required(ERROR_MESSAGES.required),
  PJ: yup
    .number()
    .typeError(ERROR_MESSAGES.number)
    .positive(ERROR_MESSAGES.positive)
    .required(ERROR_MESSAGES.required),
  G: yup
    .number()
    .typeError(ERROR_MESSAGES.number)
    .positive(ERROR_MESSAGES.positive)
    .required(ERROR_MESSAGES.required),
  A: yup
    .number()
    .typeError(ERROR_MESSAGES.number)
    .positive(ERROR_MESSAGES.positive)
    .required(ERROR_MESSAGES.required),
  TA: yup
    .number()
    .typeError(ERROR_MESSAGES.number)
    .positive(ERROR_MESSAGES.positive)
    .required(ERROR_MESSAGES.required),
  TR: yup
    .number()
    .typeError(ERROR_MESSAGES.number)
    .positive(ERROR_MESSAGES.positive)
    .required(ERROR_MESSAGES.required),
});

export const AddClub: React.FC = () => {
  const initialValues = {
    clubName: "",
    country: "",
    season: 0,
    subPlayer: "",
    catTournament: "",
    PJ: 0,
    G: 0,
    A: 0,
    TA: 0,
    TR: 0,
  };
  const [dataClub, setDataClub] = useState<any>(null);
  const [present] = useIonToast();
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<IIIForm>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any, e: any) => {
    const {
      clubName,
      country,
      season,
      subPlayer,
      catTournament,
      PJ,
      G,
      A,
      TA,
      TR,
    } = data;
    if (
      await AddCubExperience(
        clubName,
        country,
        season,
        subPlayer,
        catTournament,
        PJ,
        G,
        A,
        TA,
        TR
      )
    ) {
      present({
        message: "Se agrego el club a tu experiencia",
        duration: 1000,
        position: "top",
        color: "primary",
      });
    }
    console.log("data", data);
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
            <IonTitle color="primary" className="titulo">
              Añadir Club
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
        <IonContent fullscreen class="nuevo-club">
          <IonItemDivider color="primary">
            <div className="divisor">Información del Club y temporada</div>
          </IonItemDivider>
          <IonItem className="campo-club">
            <IonInput
              placeholder="Ingrese el nombre del club"
              type="text"
              clearInput={true}
              {...register("clubName")}
              onIonChange={() => {
                clearErrors("clubName");
              }}
            ></IonInput>
          </IonItem>
          {errors.clubName?.message && (
            <IonNote color="danger">{errors.clubName?.message}</IonNote>
          )}
          <IonItem className="campo-club">
            <IonInput
              placeholder="País del club"
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
          <IonItem className="campo-club">
            <IonInput
              placeholder="Año de temporada"
              type="number"
              clearInput={true}
              {...register("season")}
              onIonChange={() => {
                clearErrors("season");
              }}
            ></IonInput>
          </IonItem>
          {errors.season?.message && (
            <IonNote color="danger">{errors.season?.message}</IonNote>
          )}
          <IonItem className="campo-club">
            <IonInput
              placeholder="Categoria del jugador"
              type="text"
              clearInput={true}
              {...register("subPlayer")}
              onIonChange={() => {
                clearErrors("subPlayer");
              }}
            ></IonInput>
          </IonItem>
          {errors.subPlayer?.message && (
            <IonNote color="danger">{errors.subPlayer?.message}</IonNote>
          )}
          <IonItem className="campo-club">
            <IonInput
              placeholder="Nivel de la competencia"
              type="text"
              clearInput={true}
              {...register("catTournament")}
              onIonChange={() => {
                clearErrors("catTournament");
              }}
            ></IonInput>
          </IonItem>
          {errors.catTournament?.message && (
            <IonNote color="danger">{errors.catTournament?.message}</IonNote>
          )}
          <IonItem className="campo-club">
            <IonInput
              placeholder="Total partidos jugados"
              type="number"
              clearInput={true}
              {...register("PJ")}
              onIonChange={() => {
                clearErrors("PJ");
              }}
            ></IonInput>
          </IonItem>
          {errors.PJ?.message && (
            <IonNote color="danger">{errors.PJ?.message}</IonNote>
          )}
          <IonItem className="campo-club">
            <IonInput
              placeholder="Total de goles"
              type="number"
              clearInput={true}
              {...register("G")}
              onIonChange={() => {
                clearErrors("G");
              }}
            ></IonInput>
          </IonItem>
          {errors.G?.message && (
            <IonNote color="danger">{errors.G?.message}</IonNote>
          )}
          <IonItem className="campo-club">
            <IonInput
              placeholder="Total de asistencias"
              type="number"
              clearInput={true}
              {...register("A")}
              onIonChange={() => {
                clearErrors("A");
              }}
            ></IonInput>
          </IonItem>
          {errors.A?.message && (
            <IonNote color="danger">{errors.A?.message}</IonNote>
          )}
          <IonItem className="campo-club">
            <IonInput
              placeholder="Tarjetas amarillas"
              type="number"
              clearInput={true}
              {...register("TA")}
              onIonChange={() => {
                clearErrors("TA");
              }}
            ></IonInput>
          </IonItem>
          {errors.TA?.message && (
            <IonNote color="danger">{errors.TA?.message}</IonNote>
          )}
          <IonItem className="campo-club">
            <IonInput
              placeholder="Tarjetas Rojas"
              type="number"
              clearInput={true}
              {...register("TR")}
              onIonChange={() => {
                clearErrors("TR");
              }}
            ></IonInput>
          </IonItem>
          {errors.TR?.message && (
            <IonNote color="danger">{errors.TR?.message}</IonNote>
          )}
        </IonContent>
      </IonPage>
    </form>
  );
};

export default AddClub;
