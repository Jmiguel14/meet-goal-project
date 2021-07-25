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
import styles from "./styles.module.css";
import { useAuth } from "contexts/AuthContext";
import { useParams } from "react-router";

const CareerInfo = () => {
  const { data, currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();

  return (
    <>
      {currentUser.uid === id ? (
        <IonButton
          shape="round"
          expand="block"
          className="ion-padding-horizontal"
          routerLink="/tabs/agregar-experiencia"
        >
          <IonIcon icon={addCircleOutline}></IonIcon>
          Agregar club a tu experiencia
        </IonButton>
      ) : (
        ""
      )}
      {data?.clubs === undefined ? (
        <>
          <div className={styles.container_message}>
            <IonLabel className={styles.message_not_found}>
              Sin clubes registrados
            </IonLabel>
          </div>
        </>
      ) : (
        data?.clubs.map((club: any) => (
          <IonCard className={styles.box} key={club?.clubName}>
            <IonItem className={styles.title}>
              <IonLabel>{club.clubName}</IonLabel>
            </IonItem>
            <IonItem className={styles.element}>
              <IonText>{club.countryClub + "-" + club.season}</IonText>
            </IonItem>
            <IonCard className={styles.element}>
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
