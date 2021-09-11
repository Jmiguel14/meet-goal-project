import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonNote,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { calendarClearOutline, calendarOutline } from "ionicons/icons";
import styles from "./styles.module.css";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { getACallData, saveCallChanges } from "firebase/callServices";
import { useForm } from "react-hook-form";
import { NewCallDataForm } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ERROR_MESSAGES } from "constants/errorMessages";

const schema = yup.object().shape({
  startDate: yup.string().required(ERROR_MESSAGES.REQUIRED),
  endDate: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

const EditCall: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [present] = useIonToast();
  const history = useHistory();
  const [callData, setCallData] = useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    const unsubscribe = getACallData(id, (data) => {
      setCallData(data);
    });
    return () => unsubscribe && unsubscribe();
  }, [id]);

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<NewCallDataForm>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (callData) {
      const parseStartDate = new Date(
        callData.startDate.seconds * 1000
      ).toISOString();
      const parseEndDate = new Date(
        callData.endDate.seconds * 1000
      ).toISOString();
      setValue("startDate", parseStartDate);
      setValue("endDate", parseEndDate);
      setValue("ageRequired", callData.ageRequired);
      setValue("posRequired", callData.posRequired);
      callData.extraDetails === undefined
        ? setValue("extraDetails", "")
        : setValue("extraDetails", callData.extraDetails);
    }
  }, [callData]);

  const onSubmit = async (data: NewCallDataForm) => {
    const { startDate, endDate, extraDetails } = data;
    try {
      await saveCallChanges(id, startDate, endDate, extraDetails);
      present({
        message: "La convocatoria fue editada correctamente",
        duration: 3000,
        position: "top",
        color: "success",
      });
      history.goBack();
    } catch {
      present({
        message: "Error al editar la convocatoria",
        duration: 3000,
        position: "top",
        color: "danger",
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles.back}>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref={`/tabs/convocatoria/${id}`}
              className={styles.icon_back}
            />
          </IonButtons>
          <IonRow className={styles.title}>
            <IonCol size="auto">
              <IonTitle>Editar Convocatoria</IonTitle>
            </IonCol>
          </IonRow>
          <button
            type="submit"
            form="edit-call-form"
            slot="end"
            className={styles.save_new_call}
          >
            Guardar
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.back}>
        <IonItemDivider color="primary">
          <div className={styles.title_divider}>
            Detalles requeridos de la convocatoria
          </div>
        </IonItemDivider>
        <form onSubmit={handleSubmit(onSubmit)} id="edit-call-form">
          <IonCol>
            <IonRow className={styles.container_calls_data}>
              <IonItem className={styles.calls_field}>
                <IonLabel>Edad requerida</IonLabel>
                <IonSelect
                  okText="Ok"
                  cancelText="Cerrar"
                  slot="end"
                  {...register("ageRequired")}
                  onIonChange={(e) => {
                    clearErrors("ageRequired");
                  }}
                  disabled={true}
                >
                  <IonSelectOption value="Prebenjamines">
                    (5-8 años) Prebenjamines
                  </IonSelectOption>
                  <IonSelectOption value="Benjamines">
                    {" "}
                    (8-10 años) Benjamines
                  </IonSelectOption>
                  <IonSelectOption value="Sub 12">
                    (10-12 años) Sub 12
                  </IonSelectOption>
                  <IonSelectOption value="Sub 14">
                    (12-13 años) Sub 14
                  </IonSelectOption>
                  <IonSelectOption value="Sub 16">
                    (14-15 años) Sub 16
                  </IonSelectOption>
                  <IonSelectOption value="Sub 18">
                    (16-18 años) Sub 18
                  </IonSelectOption>
                  <IonSelectOption value="Senior">
                    (19-23 años) Senior
                  </IonSelectOption>
                  <IonSelectOption value="Absoluta">
                    (+23) Absoluta
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
              {errors.ageRequired?.message && (
                <IonNote color="danger">{errors.ageRequired?.message}</IonNote>
              )}
            </IonRow>
            <IonRow className={styles.container_calls_data}>
              <IonItem className={styles.calls_field}>
                <IonLabel>Posición Requerida</IonLabel>
                <IonSelect
                  okText="Listo"
                  cancelText="Cerrar"
                  slot="end"
                  {...register("posRequired")}
                  onIonChange={() => {
                    clearErrors("posRequired");
                  }}
                  disabled={true}
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
              {errors.posRequired?.message && (
                <IonNote color="danger">{errors.posRequired?.message}</IonNote>
              )}
            </IonRow>
            <IonRow className={styles.container_calls_data}>
              <IonCol>
                <IonItem className={styles.calls_field}>
                  <IonIcon icon={calendarClearOutline} size="small"></IonIcon>
                  <IonDatetime
                    cancelText="Cancelar"
                    doneText="Hecho"
                    className={styles.selection}
                    placeholder="Fecha Inicial"
                    itemType="text"
                    displayFormat="DD/MMM/YYYY"
                    monthShortNames="ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC"
                    {...register("startDate")}
                    onIonChange={() => {
                      clearErrors("startDate");
                    }}
                  ></IonDatetime>
                </IonItem>
                {errors.startDate?.message && (
                  <IonNote color="danger">{errors.startDate?.message}</IonNote>
                )}
              </IonCol>
              <IonCol>
                <IonItem className={styles.calls_field}>
                  <IonIcon icon={calendarOutline} size="small"></IonIcon>
                  <IonDatetime
                    cancelText='Cancelar'
                    doneText='Hecho'
                    className={styles.selection}
                    placeholder="Fecha Final"
                    itemType="text"
                    displayFormat="DD/MMM/YYYY"
                    monthShortNames="ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC"
                    {...register("endDate")}
                    onIonChange={() => {
                      clearErrors("endDate");
                    }}
                  ></IonDatetime>
                </IonItem>
                {errors.endDate?.message && (
                  <IonNote color="danger">{errors.endDate?.message}</IonNote>
                )}
              </IonCol>
            </IonRow>
            <IonRow className={styles.container_calls_data}>
              <IonItemDivider color="primary">
                <div className={styles.title_divider}>
                  Detalles extras de la convocatoria
                </div>
              </IonItemDivider>
              <IonItem className={styles.calls_field}>
                <IonTextarea
                  className={styles.extra}
                  placeholder="Describa aquí detalles extras de la convocatoria"
                  {...register("extraDetails")}
                ></IonTextarea>
              </IonItem>
            </IonRow>
          </IonCol>
        </form>
      </IonContent>
    </IonPage>
  );
};
export default EditCall;
