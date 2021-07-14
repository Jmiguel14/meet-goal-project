import {
  IonButton,
  IonCard,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import styles from "./styles.module.css";
import React from "react";
import MailIcon from "icons/emailIcon.png";
import BirthdayIcon from "icons/birthdayIcon.png";
import BusinessName from "icons/businessName.png";
import TelephoneIcon from "icons/telephoneIcon.png";
import { useAuth } from "contexts/AuthContext";
interface ContainerProps {}

const InstitutionalInfo: React.FC<ContainerProps> = () => {
  const { data } = useAuth();
  function converterDate() {
    let birth = data?.foundation.split("T");
    return birth[0];
  }
  return (
    <>
      <IonCard className={styles.boxes}>
        <IonItem>
          <IonImg
            src={BusinessName}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonLabel position="stacked">
            <h1 className={styles.info}>
              {data?.socialName !== undefined
                ? data?.socialName
                : "Razón Social"}
            </h1>
          </IonLabel>
          <IonText className={styles.text}>Razón Social</IonText>
        </IonItem>
      </IonCard>
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
              {data?.foundation !== undefined
                ? converterDate()
                : "F. de Fundación"}
            </h1>
          </IonLabel>
          <IonText className={styles.text}>Fecha de Fundación</IonText>
        </IonItem>
      </IonCard>
      <IonButton
        size="default"
        shape="round"
        expand="full"
        className="ion-padding-horizontal"
        routerLink="/tabs/editar-info-institutional-club"
      >
        Editar
      </IonButton>
    </>
  );
};

export default InstitutionalInfo;
