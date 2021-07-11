import { IonAvatar, IonImg, IonCol, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import "./AvatarPlayer.css";
import firebase from "firebase/app";
import { useAuth } from "contexts/AuthContext";
import { getUserDoc } from "firebase/client";

export const AvatarPlayer: React.FC = () => {
  const [datos, setDatos] = useState<
    firebase.firestore.DocumentData | undefined
  >();

  const { currentUser } = useAuth();

  useEffect(() => {
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setDatos);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);
  return (
    <>
      <IonRow>
        <IonCol className="imagenes">
          <IonCol>
            <IonImg className="portada" src={datos?.coverURL}></IonImg>
          </IonCol>
          <IonCol className="contenedor">
            <IonAvatar className="avatar">
              <img src={datos?.avatarURL} />
            </IonAvatar>
          </IonCol>
        </IonCol>
      </IonRow>
    </>
  );
};

export default AvatarPlayer;
