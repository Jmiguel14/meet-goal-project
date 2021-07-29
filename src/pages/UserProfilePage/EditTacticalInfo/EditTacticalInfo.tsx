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

const schema = yup.object().shape({
  pospri: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

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
              <IonSelectOption value="Portero">Portero</IonSelectOption>
              <IonSelectOption value="Carrilero Izquierdo">
                Carrilero Izq.
              </IonSelectOption>
              <IonSelectOption value="Carrilero Derecho">
                Carrilero Der.
              </IonSelectOption>
              <IonSelectOption value="Lateral Izquierdo">
                Lateral Izquierdo
              </IonSelectOption>
              <IonSelectOption value="Lateral Derecho">
                Lateral Derecho
              </IonSelectOption>
              <IonSelectOption value="Defensa Central">
                Defensa Central
              </IonSelectOption>
              <IonSelectOption value="Medio Centro Defensivo">
                Medio Centro Def.
              </IonSelectOption>
              <IonSelectOption value="Medio Centro">
                Medio Centro
              </IonSelectOption>
              <IonSelectOption value="Medio Centro Ofensivo">
                Medio Centro Of.
              </IonSelectOption>
              <IonSelectOption value="Medio Izquierdo">
                Medio Izquierdo
              </IonSelectOption>
              <IonSelectOption value="Medio Derecho">
                Medio Derecho
              </IonSelectOption>
              <IonSelectOption value="Segundo Delantero">
                Segundo Delantero
              </IonSelectOption>
              <IonSelectOption value="Centro Delantero">
                Centro Delantero
              </IonSelectOption>
              <IonSelectOption value="Extremo Izquierdo">
                Ext. Izquierdo
              </IonSelectOption>
              <IonSelectOption value="Extremo Derecho">
                Ext.Derecho
              </IonSelectOption>
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
              <IonSelectOption value="POR">Portero</IonSelectOption>
              <IonSelectOption value="CAI">Carrilero Izq.</IonSelectOption>
              <IonSelectOption value="CAD">Carrilero Der.</IonSelectOption>
              <IonSelectOption value="LI">Lateral Izquierdo</IonSelectOption>
              <IonSelectOption value="LD">Lateral Derecho</IonSelectOption>
              <IonSelectOption value="DFC">Defensa Central</IonSelectOption>
              <IonSelectOption value="MCD">Medio Centro Def.</IonSelectOption>
              <IonSelectOption value="MC">Medio Centro</IonSelectOption>
              <IonSelectOption value="MCO">Medio Centro Of.</IonSelectOption>
              <IonSelectOption value="MI">Medio Izquierdo</IonSelectOption>
              <IonSelectOption value="MD">Medio Derecho</IonSelectOption>
              <IonSelectOption value="SD">Segundo Delantero</IonSelectOption>
              <IonSelectOption value="DC">Centro Delantero</IonSelectOption>
              <IonSelectOption value="EI">Ext. Izquierdo</IonSelectOption>
              <IonSelectOption value="ED">Ext.Derecho</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem className={styles.tactical_field}>
            <IonLabel color="medium" position="floating">
              Logros
            </IonLabel>
            <IonInput {...register("goals")}></IonInput>
          </IonItem>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditTacticalInfo;
