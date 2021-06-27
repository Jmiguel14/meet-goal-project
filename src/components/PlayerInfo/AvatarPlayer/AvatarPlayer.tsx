import { IonAvatar, IonImg, IonItem } from "@ionic/react";
import {} from "ionicons/icons";
import "./AvatarPlayer.css";

interface ContainerProps {}

const AvatarPlayer: React.FC<ContainerProps> = () => {
  return (
    <>
      <div className="imagenes">
        <IonImg
          className="portada"
          src="https://i.pinimg.com/originals/b5/7b/09/b57b09183ff3815986c2130808af06c1.jpg"
        ></IonImg>
        <div className="contenedor">
          <IonAvatar className="avatar">
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
          </IonAvatar>
        </div>
      </div>
    </>
  );
};

export default AvatarPlayer;
