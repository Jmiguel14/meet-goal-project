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
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useAuth } from "contexts/AuthContext";
import { EditPositionData } from "firebase/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { TacticalDataForm } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./styles.module.css";
import { ERROR_MESSAGES } from "constants/errorMessages";
import { useEffect } from "react";
import { PLAYER_POSITIONS } from "constants/playerPositions";

const schema = yup.object().shape({
  pospri: yup.string().required(ERROR_MESSAGES.REQUIRED),
  goals: yup.string().matches(/^[A-Za-z0-9!@#$%_\-^&*]+/, {
    message: ERROR_MESSAGES.MATCH_WITH_TEXT,
    excludeEmptyString: true,
  }),
});

const PLAYER_POSITIONS_OPTIONS = [
  { value: PLAYER_POSITIONS.goalkeeper },
  { value: PLAYER_POSITIONS.leftWingBack },
  { value: PLAYER_POSITIONS.rightWingBack },
  { value: PLAYER_POSITIONS.leftBack },
  { value: PLAYER_POSITIONS.rightBack },
  { value: PLAYER_POSITIONS.centreBack },
  { value: PLAYER_POSITIONS.centralDefensiveMidfielder },
  { value: PLAYER_POSITIONS.centralMidfielder },
  { value: PLAYER_POSITIONS.centralAttakingMidfielder },
  { value: PLAYER_POSITIONS.leftMidfielder },
  { value: PLAYER_POSITIONS.rightMidfielder },
  { value: PLAYER_POSITIONS.outsideLeft },
  { value: PLAYER_POSITIONS.outsideRight },
  { value: PLAYER_POSITIONS.centralStriker },
  { value: PLAYER_POSITIONS.rightStriker },
];

const EditTacticalInfo: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const { currentUser, data } = useAuth();
  const {
    setValue,
    clearErrors,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("pospri", data?.pospri);
    setValue("possec", data?.possec);
    setValue("goals", data?.goals);
  }, [data]);

  const onSubmit = async (data: TacticalDataForm) => {
    const { pospri } = data;
    const possec = data.possec === undefined ? "" : data.possec;
    const goals = data.goals === undefined ? "" : data.goals;
    try {
      await EditPositionData(pospri, possec, goals);
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
            Editar I. Táctica
          </IonTitle>
          <button
            type="submit"
            form="edit-tactical-info-form"
            slot="end"
            className={styles.save_tactical_info}
          >
            Guardar
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.tactical_data}>
        <IonItemDivider color="primary">
          <div className={styles.subtitle}>Editar tu Información Táctica</div>
        </IonItemDivider>
        <form onSubmit={handleSubmit(onSubmit)} id="edit-tactical-info-form">
          <IonItem className={styles.tactical_field}>
            <IonLabel>Posición Principal</IonLabel>
            <IonSelect
              okText="Listo"
              cancelText="Cerrar"
              slot="end"
              {...register("pospri")}
              onIonChange={() => {
                clearErrors("pospri");
              }}
            >
              {PLAYER_POSITIONS_OPTIONS.map((position, index) => {
                return (
                  <IonSelectOption key={index} value={position.value}>
                    {position.value}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
          {errors.pospri?.message && (
            <IonNote color="danger">{errors.pospri?.message}</IonNote>
          )}

          <IonItem className={styles.tactical_field}>
            <IonLabel>Posición Secundaria</IonLabel>
            <IonSelect
              okText="Listo"
              cancelText="Cerrar"
              slot="end"
              {...register("possec")}
            >
              {PLAYER_POSITIONS_OPTIONS.map((position, index) => {
                return (
                  <IonSelectOption key={index} value={position.value}>
                    {position.value}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>

          <IonItem className={styles.tactical_field}>
            <IonLabel color="medium" position="floating">
              Logros
            </IonLabel>
            <IonInput {...register("goals")}></IonInput>
          </IonItem>
          {errors.goals?.message && (
            <IonNote color="danger">{errors.goals?.message}</IonNote>
          )}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditTacticalInfo;
