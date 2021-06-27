import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import MeetGoal from "icons/MeetGoal";
import Carousel from "components/Carousel/Carousel";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow className="logo">
            <IonCol size="auto">
              <MeetGoal width={150} height={150} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="auto">
              <Carousel />
            </IonCol>
          </IonRow>
          <IonRow className="row">
            <IonCol size="11">
              <IonButton
                className="button"
                strong={true}
                expand="block"
                routerLink={"registrarse"}
              >
                Registrarse
              </IonButton>
            </IonCol>
            <IonCol size="11">
              <IonButton
                className="login-button"
                expand="block"
                fill="outline"
                strong={true}
                routerLink='iniciar-sesion'
              >
                Iniciar Sesión
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
