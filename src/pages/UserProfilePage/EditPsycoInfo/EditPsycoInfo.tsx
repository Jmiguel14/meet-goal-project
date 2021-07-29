import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
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
import { EditPsycoParameters } from "firebase/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { PsycoDataForm } from "types";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ERROR_MESSAGES } from "constants/errorMessages";

const schema = yup.object().shape({
  character: yup.string().required(ERROR_MESSAGES.REQUIRED),
  personality: yup.object().required(ERROR_MESSAGES.REQUIRED),
  attitude: yup.string().required(ERROR_MESSAGES.REQUIRED),
});

const EditPsycoInfo: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const { currentUser } = useAuth();

  const { handleSubmit, register, clearErrors,
    setValue,
    formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (
    data: PsycoDataForm
  ) => {
    const { character, personality, attitude } = data;
    if (await EditPsycoParameters(character, personality, attitude)) {
      present({
        message: "Se actualizó la información exitosamente",
        duration: 1000,
        position: "top",
        color: "success",
      });
      history.goBack();
    } else {
      present({
        message: "Error al actualizar la información. Intentelo nuevamente...",
        duration: 1000,
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
            P. Psicológicos
          </IonTitle>
          <button
            type="submit"
            form="edit-psyco-info-form"
            slot="end"
            className={styles.save_psyco_info}
          >
            Guardar
          </button>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={styles.data_psyco}>
        <IonItemDivider color="primary">
          <div className={styles.subtitle}>Selecciona tu Carácter</div>
        </IonItemDivider>
        <form onSubmit={handleSubmit(onSubmit)} id="edit-psyco-info-form">
          <IonItem className={styles.psyco_field}>
            <IonLabel>Carácter</IonLabel>
            <IonSelect
              okText="Listo"
              cancelText="Cerrar"
              slot="end"
              {...register("character")}
              onIonChange={() => {
                clearErrors("character");
              }}
            >
              <IonSelectOption value="flematico">Flemático</IonSelectOption>
              <IonSelectOption value="colerico">Colérico</IonSelectOption>
              <IonSelectOption value="seunguineo">Senguíneo</IonSelectOption>
              <IonSelectOption value="apatico">Apático</IonSelectOption>
              <IonSelectOption value="apasionado">Apasionado</IonSelectOption>
              <IonSelectOption value="sentimental">Sentimental</IonSelectOption>
              <IonSelectOption value="nervioso">Nervioso</IonSelectOption>
              <IonSelectOption value="amorfo">Amorfo</IonSelectOption>
              <IonSelectOption value="inseguro">Inseguro</IonSelectOption>
              <IonSelectOption value="obsesivo">Obsesivo</IonSelectOption>
              <IonSelectOption value="sensible">Sensible</IonSelectOption>
            </IonSelect>
          </IonItem>
          {errors.character?.message && (
            <IonNote color="danger">{errors.character?.message}</IonNote>
          )}

          <IonItemDivider color="primary">
            <div className={styles.subtitle}>Parámetros de Personalidad</div>
          </IonItemDivider>
          <div className={styles.notes}>
            <IonNote className={styles.note}>
              E:Extrovertido - I: Introvertido
            </IonNote>
            <br />
            <IonNote className={styles.note}>
              N:Intuitivo - S: Sensitivo
            </IonNote>
            <br />
            <IonNote className={styles.note}>
              T:Pensador - F:Sentimental
            </IonNote>
            <br />
            <IonNote className={styles.note}>
              J:Juicioso - P: Perceptivo
            </IonNote>
            <br />
          </div>
          <IonItem className={styles.psyco_field}>
            <IonLabel>Personalidad</IonLabel>
            <IonSelect
              okText="Listo"
              cancelText="Cerrar"
              slot="end"
              {...register("personality")}
              onIonChange={() => {
                clearErrors("personality");
              }}
            >
              <IonSelectOption
                value={{
                  val: "ESTJ",
                  detail1: "Extrovertido",
                  detail2: "Sensitivo",
                  detail3: "Pensador",
                  detail4: "Jucioso",
                }}
              >
                ESTJ
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "ESTP",
                  detail1: "Extrovertido",
                  detail2: "Sensitivo",
                  detail3: "Pensador",
                  detail4: "Perceptivo",
                }}
              >
                ESTP
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "ESFJ",
                  detail1: "Extrovertido",
                  detail2: "Sensitivo",
                  detail3: "Sentimental",
                  detail4: "Juicioso",
                }}
              >
                ESFJ
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "ESFP",
                  detail1: "Extrovertido",
                  detail2: "Sensitivo",
                  detail3: "Sentimental",
                  detail4: "Perceptivo",
                }}
              >
                ESFP
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "ISTJ",
                  detail1: "Introvertido",
                  detail2: "Sensitivo",
                  detail3: "Pensador",
                  detail4: "Juicioso",
                }}
              >
                ISTJ
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "ISTP",
                  detail1: "Introvertido",
                  detail2: "Sensitivo",
                  detail3: "Pensador",
                  detail4: "Perceptivo",
                }}
              >
                ISTP
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "ISFJ",
                  detail1: "Introvertido",
                  detail2: "Sensitivo",
                  detail3: "Sentimental",
                  detail4: "Juicioso",
                }}
              >
                ISFJ
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "ISFP",
                  detail1: "Introvertido",
                  detail2: "Sensitivo",
                  detail3: "Sentimental",
                  detail4: "Perceptivo",
                }}
              >
                ISFP
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "ENTJ",
                  detail1: "Extrovertido",
                  detail2: "Intuitivo",
                  detail3: "Pensador",
                  detail4: "Jucioso",
                }}
              >
                ENTJ
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "ENTP",
                  detail1: "Extrovertido",
                  detail2: "Intuitivo",
                  detail3: "Pensador",
                  detail4: "Perceptivo",
                }}
              >
                ENTP
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "ENFJ",
                  detail1: "Extrovertido",
                  detail2: "Intuitivo",
                  detail3: "Sentimental",
                  detail4: "Jucioso",
                }}
              >
                ENFJ
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "ENFP",
                  detail1: "Extrovertido",
                  detail2: "Intuitivo",
                  detail3: "Sentimental",
                  detail4: "Perceptivo",
                }}
              >
                ENFP
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "INTJ",
                  detail1: "Introvertido",
                  detail2: "Intuitivo",
                  detail3: "Pensador",
                  detail4: "Jucioso",
                }}
              >
                INTJ
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "INTP",
                  detail1: "Introvertido",
                  detail2: "Intuitivo",
                  detail3: "Pensador",
                  detail4: "Perceptivo",
                }}
              >
                INTP
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "INFJ",
                  detail1: "Introvertido",
                  detail2: "Intuitivo",
                  detail3: "Sentimental",
                  detail4: "Jucioso",
                }}
              >
                INFJ
              </IonSelectOption>
              <IonSelectOption
                value={{
                  val: "INFP",
                  detail1: "Introvertido",
                  detail2: "Intuitivo",
                  detail3: "Sentimental",
                  detail4: "PErceptivo",
                }}
              >
                INFP
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          {errors.personality?.message && (
            <IonNote color="danger">{errors.personality?.message}</IonNote>
          )}

          <IonItemDivider color="primary">
            <div className={styles.subtitle}>Selecciona tu Actitud</div>
          </IonItemDivider>
          <IonItem className={styles.psyco_field}>
            <IonLabel>Actitud</IonLabel>
            <IonSelect
              okText="Listo"
              cancelText="Cerrar"
              slot="end"
              {...register("attitude")}
              onIonChange={() => {
                clearErrors("attitude");
              }}
            >
              <IonSelectOption value="positiva">Positiva</IonSelectOption>
              <IonSelectOption value="derrotista">Derrotista</IonSelectOption>
              <IonSelectOption value="pasiva">Pasiva</IonSelectOption>
              <IonSelectOption value="altruista">Altruista</IonSelectOption>
              <IonSelectOption value="neutra">Neutra</IonSelectOption>
              <IonSelectOption value="agresiva">Agresiva</IonSelectOption>
              <IonSelectOption value="empatica">Empática</IonSelectOption>
              <IonSelectOption value="flexible">Flexible</IonSelectOption>
              <IonSelectOption value="inflexible">Inflexible</IonSelectOption>
              <IonSelectOption value="moralista">Moralista</IonSelectOption>
              <IonSelectOption value="nihilista">Nihilista</IonSelectOption>
              <IonSelectOption value="suspicaz">Suspicaz</IonSelectOption>
            </IonSelect>
          </IonItem>
          {errors.attitude?.message && (
            <IonNote color="danger">{errors.attitude?.message}</IonNote>
          )}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditPsycoInfo;
