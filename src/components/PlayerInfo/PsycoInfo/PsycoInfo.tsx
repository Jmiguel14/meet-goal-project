import {
  IonButton,
  IonCard,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import {
  happyOutline,
  heartCircleOutline,
  pencilOutline,
  thumbsUpOutline,
} from "ionicons/icons";
import "./PsycoInfo.css";
import AttitudeIcon from "icons/attitudeIcon.png";
import PersonalityIcon from "icons/personalityIcon.png";
import CharacterIcon from "icons/characterIcon.png";

interface ContainerProps {}

const PsycoInfo: React.FC<ContainerProps> = () => {
  return (
    <>
      <IonCard className="datos-psicologicos">
        <IonItem className="titulo">
          <IonLabel>Parámetros Psicológicos</IonLabel>
          <IonButton fill="clear" routerLink="/editar-info-psicologica-jugador">
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={CharacterIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>Caracter</IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={PersonalityIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>Personalidad</IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonImg
            src={AttitudeIcon}
            slot="start"
            className="ion-padding-vertical"
          ></IonImg>
          <IonText>Actitud</IonText>
        </IonItem>
      </IonCard>
      <IonCard className="datos-psicologicos">
        <IonItem className="titulo">
          <IonLabel>Valores</IonLabel>
          <IonButton fill="clear" routerLink="/editar-valores-jugador">
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem className="elemento">
          <IonText>Valor1</IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonText>Valor2</IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonText>Valor3</IonText>
        </IonItem>
      </IonCard>
    </>
  );
};

export default PsycoInfo;
