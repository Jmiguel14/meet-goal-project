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
import { EditPsycoParameters } from "firebase/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styles from "./styles.module.css";

export interface VForm {
  character: string;
  personality: string;
  attitude: string;
}
const EditPsycoInfo: React.FC = () => {
  const [present] = useIonToast();
  const history = useHistory();
  const { reset, handleSubmit, register } = useForm();

  const onSubmit = async (
    data: VForm,
    e: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => {
    const { character, personality, attitude } = data;
    if (await EditPsycoParameters(character, personality, attitude)) {
      present({
        message: "Se actualizó la información exitosamente",
        duration: 1000,
        position: "top",
        color: "success",
      });
    }
    reset();
    history.push("/tabs/perfil-jugador");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light" className={styles.acts}>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/tabs/perfil-jugador"
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
              value=""
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
              value=""
            >
              <IonSelectOption value="ESTJ">ESTJ</IonSelectOption>
              <IonSelectOption value="ESTP">ESTP</IonSelectOption>
              <IonSelectOption value="ESFJ">ESFJ</IonSelectOption>
              <IonSelectOption value="ESFP">ESFP</IonSelectOption>
              <IonSelectOption value="ISTJ">ISTJ</IonSelectOption>
              <IonSelectOption value="ISTP">ISTP</IonSelectOption>
              <IonSelectOption value="ISFJ">ISFJ</IonSelectOption>
              <IonSelectOption value="ISFP">ISFP</IonSelectOption>
              <IonSelectOption value="ENTJ">ENTJ</IonSelectOption>
              <IonSelectOption value="ENTP">ENTP</IonSelectOption>
              <IonSelectOption value="ENFJ">ENFJ</IonSelectOption>
              <IonSelectOption value="ENFP">ENFP</IonSelectOption>
              <IonSelectOption value="INTJ">INTJ</IonSelectOption>
              <IonSelectOption value="INTP">INTP</IonSelectOption>
              <IonSelectOption value="INFJ">INFJ</IonSelectOption>
              <IonSelectOption value="INFP">INFP</IonSelectOption>
            </IonSelect>
          </IonItem>
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
              value=""
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
        </form>
      </IonContent>
    </IonPage>
  );
};

export default EditPsycoInfo;
