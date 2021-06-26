import {
  IonButton,
  IonCard,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { footstepsOutline, medalOutline, pencilOutline } from "ionicons/icons";
import "./TacticalInfo.css";

interface ContainerProps {}

const TacticalInfo: React.FC<ContainerProps> = () => {
  return (
    <>
      <IonCard>
        <IonItem className="titulo">
          <IonLabel>Posicion principal</IonLabel>
          <IonButton fill="clear" routerLink="/editar-info-tactica-jugador">
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem className="elemento">
          <IonIcon icon={footstepsOutline} slot="start"></IonIcon>
          <IonText>Posicion secundaria</IonText>
        </IonItem>
        <IonItem className="elemento">
          <IonIcon icon={medalOutline} slot="start"></IonIcon>
          <IonText>Logros</IonText>
        </IonItem>
      </IonCard>
      <IonCard>
        <IonItem className="titulo">
          <IonLabel>Atributos</IonLabel>
          <IonButton fill="clear" routerLink="/editar-info-atributos-jugador">
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
