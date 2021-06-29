import {
  IonButton,
  IonCard,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { footstepsOutline, medalOutline, pencilOutline } from "ionicons/icons";
import "./TacticalInfo.css";
import MedalIcon from "icons/medalIcon.png";
import PlayerIcon from "icons/playerIcon.png";

interface ContainerProps {}

const TacticalInfo: React.FC<ContainerProps> = () => {
  return (
    <>
      <IonCard className="datos-posicionales">
        <IonItem className="titulo">
          <IonLabel>Posición principal</IonLabel>
          <IonButton
            fill="clear"
            routerLink="/tabs/editar-info-tactica-jugador"
          >
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={PlayerIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>Posicion secundaria</IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={MedalIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>Logros</IonText>
        </IonItem>
      </IonCard>
      <IonCard className="datos-tacticos">
        <IonItem className="titulo">
          <IonLabel>Atributos</IonLabel>
          <IonButton
            fill="clear"
            routerLink="/tabs/editar-info-atributos-jugador"
          >
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem className="elemento">
          <IonInput disabled={true}>Atributo 1</IonInput>
        </IonItem>
        <IonItem className="elemento">
          <IonInput disabled={true}>Atributo 2</IonInput>
        </IonItem>
        <IonItem className="elemento">
          <IonInput disabled={true}>Atributo 3</IonInput>
        </IonItem>
        <IonItem className="elemento">
          <IonInput disabled={true}>Atributo 4</IonInput>
        </IonItem>
      </IonCard>
    </>
  );
};

export default TacticalInfo;
