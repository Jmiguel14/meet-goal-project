import { IonAvatar } from "@ionic/react";
import React from "react";

interface IAvatar {
  src: string;
}

export const Avatar: React.FC<IAvatar> = ({ src }) => {
  return (
    <IonAvatar>
      <img src={src}></img>
    </IonAvatar>
  );
};
