import {
  IonButton,
  IonCard,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import styles from "./styles.module.css";
import SurgeryIcon from "icons/SurgeryIcon.png";
import RecoveryTimeIcon from "icons/recoveryTimeIcon.png";
import { useAuth } from "contexts/AuthContext";
import { useParams } from "react-router";

interface ContainerProps {}

const MedicalInfo = () => {
  const { data, currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();
  return (
    <>
      {currentUser.uid === id ? (
        <IonButton
          shape="round"
          expand="block"
          className={styles.ion_padding_horizontal}
          routerLink="/tabs/agregar-lesiones-jugador"
        >
          <IonIcon icon={addCircleOutline}></IonIcon>
          Agregar informes médicos
        </IonButton>
      ) : (
        ""
      )}
      {data?.injuries === undefined ? (
        <>
          <div className={styles.container_message}>
            <IonLabel className={styles.message_not_found}>
              Sin registros médicos registrados
            </IonLabel>
          </div>
        </>
      ) : (
        data?.injuries.map((injury: any) => (
          <IonCard className={styles.medical_data} key={injury.injuryName}>
            <IonItem className={styles.title}>
              <IonLabel>{injury.injuryName}</IonLabel>
            </IonItem>
            <IonItem className={styles.element}>
              <IonImg
                src={RecoveryTimeIcon}
                slot="start"
                className="ion-padding-vertical"
              ></IonImg>
              <IonText>{injury.recoveryTime}</IonText>
            </IonItem>
            <IonItem className={styles.element}>
              <IonImg
                src={SurgeryIcon}
                slot="start"
                className="ion-padding-vertical"
              ></IonImg>
              <IonText>
                {injury?.surgery === true
                  ? "Lesión con cirugía"
                  : "Lesión sin cirugía"}
              </IonText>
            </IonItem>
          </IonCard>
        ))
      )}
    </>
  );
};

export default MedicalInfo;
