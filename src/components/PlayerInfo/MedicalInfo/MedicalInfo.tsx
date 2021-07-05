import {
  IonButton,
  IonCard,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { addCircleOutline, medkitOutline, timeOutline } from "ionicons/icons";
import "./MedicalInfo.css";
import SurgeryIcon from "icons/SurgeryIcon.png";
import RecoveryTimeIcon from "icons/recoveryTimeIcon.png";
import { useEffect, useState } from "react";
import { useAuth } from "contexts/AuthContext";
import { getUserDoc } from "firebase/client";
import firebase from "firebase/app";

interface ContainerProps {}

const MedicalInfo: React.FC<ContainerProps> = () => {
  const [datos, setDatos] = useState<
    firebase.firestore.DocumentData | undefined
  >();

  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setDatos);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);
  return (
    <>
      <IonButton
        shape="round"
        expand="block"
        className="ion-padding-horizontal"
        routerLink="/tabs/agregar-lesiones-jugador"
      >
        <IonIcon icon={addCircleOutline}></IonIcon>
        Agregar informes médicos
      </IonButton>
      {datos?.injuries === undefined ? (
        <>
          <div className="container-message">
            <IonLabel className="message-not-found">
              Registra aquí todos las lesiones experimentadas
            </IonLabel>
          </div>
        </>
      ) : (
        datos?.injuries.map((injury: any) => (
          <IonCard className="datos-medicos" key={injury.injuryName}>
            <IonItem className="titulo">
              <IonLabel>{injury.injuryName}</IonLabel>
            </IonItem>
            <IonItem className="elemento">
              <IonImg
                src={RecoveryTimeIcon}
                slot="start"
                className="ion-padding-vertical"
              ></IonImg>
              <IonText>{injury.recoveryTime}</IonText>
            </IonItem>
            <IonItem className="elemento">
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
