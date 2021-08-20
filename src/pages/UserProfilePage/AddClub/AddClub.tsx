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
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { ERROR_MESSAGES } from "constants/errorMessages";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import React from "react";
import { AddClubExperience } from "firebase/client";
import { useHistory } from "react-router";
import { ClubDataForm } from "types";
import { useAuth } from "contexts/AuthContext";

const schema = yup.object().shape({
  clubName: yup.string().required(ERROR_MESSAGES.REQUIRED),
  country: yup.string().required(ERROR_MESSAGES.REQUIRED),
  season: yup
    .number()
    .typeError(ERROR_MESSAGES.NUMBER)
    .positive(ERROR_MESSAGES.POSITIVE)
    .required(ERROR_MESSAGES.REQUIRED),
  subPlayer: yup.string().required(ERROR_MESSAGES.REQUIRED),
  catTournament: yup.string().required(ERROR_MESSAGES.REQUIRED),
  PJ: yup
    .number()
    .typeError(ERROR_MESSAGES.REQUIRED)
    .positive(ERROR_MESSAGES.POSITIVE)
    .required(ERROR_MESSAGES.REQUIRED),
  G: yup
    .number()
    .typeError(ERROR_MESSAGES.NUMBER)
    .positive(ERROR_MESSAGES.POSITIVE)
    .required(ERROR_MESSAGES.REQUIRED),
  A: yup
    .number()
    .typeError(ERROR_MESSAGES.NUMBER)
    .positive(ERROR_MESSAGES.POSITIVE)
    .required(ERROR_MESSAGES.REQUIRED),
  TA: yup
    .number()
    .typeError(ERROR_MESSAGES.NUMBER)
    .positive(ERROR_MESSAGES.POSITIVE)
    .required(ERROR_MESSAGES.REQUIRED),
  TR: yup
    .number()
    .typeError(ERROR_MESSAGES.NUMBER)
    .positive(ERROR_MESSAGES.POSITIVE)
    .required(ERROR_MESSAGES.REQUIRED),
});

export const AddClub: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<ClubDataForm>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: ClubDataForm) => {
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
    try {
      await AddClubExperience(
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
      );
      present({
        message: "Se agregó un club a tu experiencia",
        duration: 3000,
        position: "top",
        color: "success",
      });
      history.goBack();
    } catch {
      present({
        message: "Error al agregar la información intentelo nuevamente...",
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
            Añadir Club
          </IonTitle>
          <button
            type="submit"
            form="add-club-info-form"
            slot="end"
            className={styles.save_club_info}
          >
            Guardar
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class={styles.new_club}>
        <IonItemDivider color="primary">
          <div className={styles.divisor}>Información del Club y temporada</div>
        </IonItemDivider>
        <form onSubmit={handleSubmit(onSubmit)} id="add-club-info-form">
          <IonItem className={styles.club_field}>
            <IonLabel color="medium" position="floating">
              Ingrese el nombre del club
            </IonLabel>
            <IonInput
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
          <IonItem className={styles.club_field}>
            <IonLabel color="medium" position="floating">
              País del club
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
          <IonItem className={styles.club_field}>
            <IonLabel color="medium" position="floating">
              Año de temporada
            </IonLabel>
            <IonInput
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
          <IonItem className={styles.club_field}>
            <IonLabel color="medium" position="floating">
              Categoría del jugador
            </IonLabel>
            <IonInput
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
          <IonItem className={styles.club_field}>
            <IonLabel color="medium" position="floating">
              Nivel de la competencia
            </IonLabel>
            <IonInput
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
          <IonItem className={styles.club_field}>
            <IonLabel color="medium" position="floating">
              Total partidos jugados
            </IonLabel>
            <IonInput
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
          <IonItem className={styles.club_field}>
            <IonLabel color="medium" position="floating">
              Total de goles
            </IonLabel>
            <IonInput
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
          <IonItem className={styles.club_field}>
            <IonLabel color="medium" position="floating">
              Total de asistencias
            </IonLabel>
            <IonInput
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
          <IonItem className={styles.club_field}>
            <IonLabel color="medium" position="floating">
              Tarjetas amarillas
            </IonLabel>
            <IonInput
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
          <IonItem className={styles.club_field}>
            <IonLabel color="medium" position="floating">
              Tarjetas Rojas
            </IonLabel>
            <IonInput
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
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddClub;
