import { IonAvatar, IonImg, IonCol, IonRow } from "@ionic/react";
import "./PhotoUser.css";
import { useAuth } from "contexts/AuthContext";

export const PhotoUser: React.FC = () => {
  const { data } = useAuth();
  return (
    <>
      <IonRow className="profile-photos">
        <IonCol className="imagenes">
          <IonCol className="portada">
            <IonImg src={data?.coverURL}></IonImg>
          </IonCol>
          <IonCol className="contenedor">
            <IonAvatar className="avatar">
              <img src={data?.avatarURL} />
            </IonAvatar>
          </IonCol>
        </IonCol>
      </IonRow>
    </>
  );
};

export default PhotoUser;
