import {
  IonAvatar,
  IonCard,
  IonItem,
  IonLabel,
  IonSkeletonText,
} from "@ionic/react";
import React from "react";

const SkeletonChatRoom = () => {
  return (
    <>
      <IonCard>
        <IonAvatar slot="start">
          <IonSkeletonText animated />
        </IonAvatar>
        <IonItem>
          <IonLabel>
            <h3>
              <IonSkeletonText animated style={{ width: "50%" }} />
            </h3>
            <p>
              <IonSkeletonText animated style={{ width: "80%" }} />
            </p>
          </IonLabel>
        </IonItem>
        <IonAvatar slot="end">
          <IonSkeletonText animated />
        </IonAvatar>
      </IonCard>
    </>
  );
};

export default SkeletonChatRoom;
