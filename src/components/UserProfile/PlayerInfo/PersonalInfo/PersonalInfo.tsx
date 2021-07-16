import {
  IonButton,
  IonCard,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import styles from "./styles.module.css";
import MailIcon from "icons/emailIcon.png";
import BirthdayIcon from "icons/birthdayIcon.png";
import ContractIcon from "icons/contractIcon.png";
import MarketIcon from "icons/marketIcon.png";
import TelephoneIcon from "icons/telephoneIcon.png";
import { useAuth } from "contexts/AuthContext";
interface ContainerProps {}

const PersonalInfo = () => {
  const { data } = useAuth();
  function converterDate() {
    let birth = data?.birth.split("T");
    return birth[0];
  }
  return (
    <>
      <IonCard className={styles.boxes}>
        <IonItem>
          <IonImg
            src={MailIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className={styles.info}>
              {data?.email !== undefined ? data?.email : "Correo"}
            </h1>
          </IonLabel>
          <IonText className={styles.text}>Correo</IonText>
        </IonItem>
      </IonCard>
      <IonCard className={styles.boxes}>
        <IonItem>
          <IonImg
            src={TelephoneIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className={styles.info}>
              {data?.phone !== undefined ? data?.phone : "Teléfono"}
            </h1>
          </IonLabel>
          <IonText className={styles.text}>Teléfono</IonText>
        </IonItem>
      </IonCard>
      <IonCard className={styles.boxes}>
        <IonItem>
          <IonImg
            src={BirthdayIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className={styles.info}>
              {data?.birth !== undefined ? converterDate() : "F. de Nacimiento"}
            </h1>
          </IonLabel>
          <IonText className={styles.text}>Fecha de Nacimiento</IonText>
        </IonItem>
      </IonCard>
      <IonCard className={styles.boxes}>
        <IonItem>
          <IonImg
            src={ContractIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className={styles.info}>
              {data?.contract !== undefined
                ? data?.contract
                : "Est. Contractual"}
            </h1>
          </IonLabel>
          <IonText className={styles.text}>Estado contractual</IonText>
        </IonItem>
      </IonCard>
      <IonCard className={styles.boxes}>
        <IonItem href={data?.marketTransfer}>
          <IonImg
            src={MarketIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className={styles.info}>MarketTransfer</h1>
          </IonLabel>
          <IonText className={styles.text}>Link MarketTransfer</IonText>
        </IonItem>
      </IonCard>
      <IonButton
        size="default"
        shape="round"
        expand="full"
        className="ion-padding-horizontal"
        routerLink="/tabs/editar-info-personal-jugador"
      >
        Editar
      </IonButton>
    </>
  );
};

export default PersonalInfo;
