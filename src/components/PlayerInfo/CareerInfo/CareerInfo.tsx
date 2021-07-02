import {
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import {
  addCircleOutline,
  barChartOutline,
  speedometerOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import "./CareerInfo.css";
import firebase from "firebase/app";
import { useAuth } from "contexts/AuthContext";
import { getUserDoc } from "firebase/client";
interface ContainerProps {}

const CareerInfo: React.FC<ContainerProps> = () => {
  const [datos, setDatos] = useState<
    firebase.firestore.DocumentData | undefined
  >();

  const { currentUser } = useAuth();

  useEffect(() => {
    getUserDoc(currentUser.uid).then((doc) => {
      if (doc.exists) {
        setDatos(doc.data()?.clubs);
      }
    });
  }, []);
  return (
    <>
      <IonButton
        shape="round"
        expand="block"
        className="ion-padding-horizontal"
        routerLink="/tabs/agregar-experiencia"
      >
        <IonIcon icon={addCircleOutline}></IonIcon>
        Agregar club a tu experiencia
      </IonButton>
      {datos === undefined ? (
        <>
          <div className="container-message">
            <IonLabel className="message-not-found">
              Registra aqui todos los clubes en los cuales has jugado
            </IonLabel>
          </div>
        </>
      ) : (
        datos?.map((club: any) => (
          <IonCard className="caja" key={club?.clubName}>
            <IonItem className="titulo">
              <IonLabel>{club.clubName}</IonLabel>
            </IonItem>
            <IonItem className="elemento">
              <IonText>{club.countryClub + "-" + club.season}</IonText>
            </IonItem>
            <IonCard className="elemento">
              <IonItem>
                <IonIcon icon={barChartOutline} slot="start"></IonIcon>
                <IonText>{club.subPlayer}</IonText>
              </IonItem>
              <IonItem>
                <IonIcon icon={speedometerOutline} slot="start"></IonIcon>
                <IonText>{club.catTournament}</IonText>
              </IonItem>
            </IonCard>
          </IonCard>
        ))
      )}
    </>
  );
};

export default CareerInfo;
