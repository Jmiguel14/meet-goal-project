import {
  IonAvatar,
  IonButton,
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import {} from "ionicons/icons";
import "./AvatarPlayer.css";

interface ContainerProps {}

const AvatarPlayer: React.FC<ContainerProps> = () => {
  return (
    <>
      <IonItem lines="none" class="portaAvatar">
        <IonAvatar class="avatar">
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonAvatar>
      </IonItem>
    </>
  );
};

export default AvatarPlayer;
