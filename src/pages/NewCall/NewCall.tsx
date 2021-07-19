import {
  IonButton,
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
import { useAuth } from "contexts/AuthContext";
import {
  arrowBack,
  calendarClearOutline,
  calendarOutline,
} from "ionicons/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { NewCallDataForm } from "types";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ERROR_MESSAGES } from "constants/errorMessages";
import { addNewClubCall } from "firebase/callServices";

const schema = yup.object().shape({
  ageRequired: yup.string().required(ERROR_MESSAGES.REQUIRED),
  posRequired: yup.string().required(ERROR_MESSAGES.REQUIRED),
  startDate: yup.string().required(ERROR_MESSAGES.REQUIRED),
  endDate: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

const NewCall: React.FC = () => {
  const [present] = useIonToast();
  const [selectedDateStart, setSelectedDateStart] = useState<string>("");
  const [selectedDateEnd, setSelectedDateEnd] = useState<string>("");
  const [text, setText] = useState<string>("");
  const { currentUser } = useAuth();
  const history = useHistory();

  const initialValues = {
    ageRequired: "",
    posRequired: "",
    startDate: "",
    endDate: "",
    extraDetails: "",
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<NewCallDataForm>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (
    data: NewCallDataForm,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const { ageRequired, posRequired, startDate, endDate, extraDetails } = data;
    if (
      await addNewClubCall(
        currentUser.uid,
        ageRequired,
        posRequired,
        startDate,
        endDate,
        extraDetails
      )
    ) {
      present({
        message: "Se agrego su convocatoria correctamente",
        duration: 1000,
        position: "top",
        color: "success",
      });
      setSelectedDateEnd("");
      setSelectedDateStart("");
      history.push("/tabs/convocatorias-creadas");
    } else {
      present({
        message: "Error al crear la convocatoria",
        duration: 1000,
        position: "top",
        color: "danger",
      });
    }
    e?.target.reset();
  };
  function backHome() {
    history.push("/tabs/convocatorias-creadas");
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className={styles.back}>
          <IonButtons slot="start">
            <IonButton
              fill="clear"
              className={styles.icon_back}
              onClick={backHome}
            >
              <IonIcon icon={arrowBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle color="primary" className={styles.title}>
            Nueva Convocatoria
          </IonTitle>
          <button
            type="submit"
            form="add-new-call-form"
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
        <form onSubmit={handleSubmit(onSubmit)} id="add-new-call-form">
          <IonCol>
            <IonRow className={styles.container_calls_data}>
              <IonItem className={styles.calls_field}>
                <IonLabel>Edad requerida</IonLabel>
                <IonSelect
                  okText="Okay"
                  cancelText="Cerrar"
                  slot="end"
                  {...register("ageRequired")}
                  onIonChange={() => {
                    clearErrors("ageRequired");
                  }}
                >
                  <IonSelectOption value="Prebenjamines">
                    (5-8 años) Prebenjamines
                  </IonSelectOption>
                  <IonSelectOption value="Benjamines">
                    {" "}
                    (8-10 años) Benjamines
                  </IonSelectOption>
                  <IonSelectOption value="Sub 10">
                    (10-12 años) Sub 12
                  </IonSelectOption>
                  <IonSelectOption value="Sub 12">
                    (12-13 años) Sub 14
                  </IonSelectOption>
                  <IonSelectOption value="Sub 14">
                    (14-15 años) Sub 16
                  </IonSelectOption>
                  <IonSelectOption value="Sub 16">
                    (16-18 años) Sub 18
                  </IonSelectOption>
                  <IonSelectOption value="Sub 18">
                    (19-23 años) Senior
                  </IonSelectOption>
                  <IonSelectOption value="Senior">
                    (+20) Absoluta
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
                >
                  <IonSelectOption value="POR">Portero</IonSelectOption>
                  <IonSelectOption value="CAI">Carrilero Izq.</IonSelectOption>
                  <IonSelectOption value="CAD">Carrilero Der.</IonSelectOption>
                  <IonSelectOption value="LI">
                    Lateral Izquierdo
                  </IonSelectOption>
                  <IonSelectOption value="LD">Lateral Derecho</IonSelectOption>
                  <IonSelectOption value="DFC">Defensa Central</IonSelectOption>
                  <IonSelectOption value="MCD">
                    Medio Centro Def.
                  </IonSelectOption>
                  <IonSelectOption value="MC">Medio Centro</IonSelectOption>
                  <IonSelectOption value="MCO">
                    Medio Centro Of.
                  </IonSelectOption>
                  <IonSelectOption value="MI">Medio Izquierdo</IonSelectOption>
                  <IonSelectOption value="MD">Medio Derecho</IonSelectOption>
                  <IonSelectOption value="SD">
                    Segundo Delantero
                  </IonSelectOption>
                  <IonSelectOption value="DC">Centro Delantero</IonSelectOption>
                  <IonSelectOption value="EI">Ext. Izquierdo</IonSelectOption>
                  <IonSelectOption value="ED">Ext.Derecho</IonSelectOption>
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
                    className={styles.selection}
                    placeholder="Fecha Inicial"
                    itemType="text"
                    displayFormat="DD/MMM/YYYY"
                    monthShortNames="ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC"
                    {...register("startDate")}
                    onIonChange={(e) => setSelectedDateStart(e.detail.value!)}
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
                    className={styles.selection}
                    placeholder="Fecha Final"
                    itemType="text"
                    displayFormat="DD/MMM/YYYY"
                    monthShortNames="ENE, FEB, MAR, ABR, MAY, JUN, JUL, AGO, SEP, OCT, NOV, DIC"
                    {...register("endDate")}
                    onIonChange={(e) => setSelectedDateEnd(e.detail.value!)}
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
                  value={text}
                  {...register("extraDetails")}
                  onIonChange={(e) => setText(e.detail.value!)}
                ></IonTextarea>
              </IonItem>
            </IonRow>
          </IonCol>
        </form>
      </IonContent>
    </IonPage>
  );
};
export default NewCall;