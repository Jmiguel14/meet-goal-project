import {
  IonButton,
  IonCard,
  IonIcon,
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

interface ContainerProps {}

const PsycoInfo: React.FC<ContainerProps> = () => {
  return (
    <>
      <IonCard>
        <IonItem class="titulo">
          <IonLabel>Parametros psicologicos</IonLabel>
          <IonButton fill="clear" routerLink="/editar-info-psicologica-jugador">
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem class="elemento">
          <IonIcon icon={happyOutline} slot="start"></IonIcon>
          <IonText>Caracter</IonText>
        </IonItem>
        <IonItem class="elemento">
          <IonIcon icon={heartCircleOutline} slot="start"></IonIcon>
          <IonText>Personalidad</IonText>
        </IonItem>
        <IonItem class="elemento">
          <IonIcon icon={thumbsUpOutline} slot="start"></IonIcon>
          <IonText>Actitud</IonText>
        </IonItem>
      </IonCard>
      <IonCard>
        <IonItem class="titulo">
          <IonLabel>Valores</IonLabel>
          <IonButton fill="clear" routerLink="/editar-valores-jugador">
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem class="elemento">
          <IonText>Valor1</IonText>
        </IonItem>
        <IonItem class="elemento">
          <IonText>Valor2</IonText>
        </IonItem>
        <IonItem class="elemento">
          <IonText>Valor3</IonText>
        </IonItem>
      </IonCard>
    </>
  );
};

export default PsycoInfo;
