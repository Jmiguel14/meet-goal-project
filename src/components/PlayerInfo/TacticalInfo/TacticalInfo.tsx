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
        <IonItem class="titulo">
          <IonLabel>Posicion principal</IonLabel>
          <IonButton fill="clear" href="/editar-info-tactica-jugador">
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem class="elemento">
          <IonIcon icon={footstepsOutline} slot="start"></IonIcon>
          <IonText>Posicion secundaria</IonText>
        </IonItem>
        <IonItem class="elemento">
          <IonIcon icon={medalOutline} slot="start"></IonIcon>
          <IonText>Logros</IonText>
        </IonItem>
      </IonCard>
      <IonCard>
        <IonItem class="titulo">
          <IonLabel>Atributos</IonLabel>
          <IonButton fill="clear" href="/editar-info-atributos-jugador">
            <IonIcon icon={pencilOutline} />
          </IonButton>
        </IonItem>
        <IonItem class="elemento">
          <IonInput disabled={true}>Atributo 1</IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput disabled={true}>Atributo 2</IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput disabled={true}>Atributo 3</IonInput>
        </IonItem>
        <IonItem class="elemento">
          <IonInput disabled={true}>Atributo 4</IonInput>
        </IonItem>
      </IonCard>
    </>
  );
};

export default TacticalInfo;
