import { IonAvatar } from "@ionic/react";
import React from "react";

interface IAvatar {
  src: string;
  className?: string;
}

export const Avatar: React.FC<IAvatar> = ({ src, className }) => {
  return (
    <IonAvatar className={className}>
      <img src={src}></img>
    </IonAvatar>
  );
};
