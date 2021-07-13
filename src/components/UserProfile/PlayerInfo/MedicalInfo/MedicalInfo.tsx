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
import { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { getUserDoc } from "firebase/client";
import firebase from "firebase/app";

interface ContainerProps {}

const MedicalInfo: React.FC<ContainerProps> = () => {
  const [data, setData] = useState<
    firebase.firestore.DocumentData | undefined
  >();

  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setData);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);
  return (
    <>
      <IonButton
        shape="round"
        expand="block"
        className={styles.ion_padding_horizontal}
        routerLink="/tabs/agregar-lesiones-jugador"
      >
        <IonIcon icon={addCircleOutline}></IonIcon>
        Agregar informes médicos
      </IonButton>
      {data?.injuries === undefined ? (
        <>
          <div className={styles.container_message}>
            <IonLabel className={styles.message_not_found}>
              Registra aquí todos las lesiones experimentadas
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
