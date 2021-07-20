import React from "react";
import {
  IonAvatar,
  IonCol,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSkeletonText,
  IonText,
} from "@ionic/react";

export const SkeletonList = () => {
  return (
    <>
      <IonRow className="ion-justify-content-center">
        <IonCol size="10">
          <IonText>
            <IonSkeletonText
              animated
              style={{ width: "100%", height: "100%" }}
            ></IonSkeletonText>
          </IonText>
        </IonCol>
      </IonRow>
      <IonList>
        <IonItem>
          <IonAvatar slot="start">
            <IonSkeletonText animated />
          </IonAvatar>
          <IonLabel>
            <h3>
              <IonSkeletonText animated style={{ width: "50%" }} />
            </h3>
            <p>
              <IonSkeletonText animated style={{ width: "80%" }} />
            </p>
            <p>
              <IonSkeletonText animated style={{ width: "60%" }} />
            </p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonAvatar slot="start">
            <IonSkeletonText animated />
          </IonAvatar>
          <IonLabel>
            <h3>
              <IonSkeletonText animated style={{ width: "50%" }} />
            </h3>
            <p>
              <IonSkeletonText animated style={{ width: "80%" }} />
            </p>
            <p>
              <IonSkeletonText animated style={{ width: "60%" }} />
            </p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonAvatar slot="start">
            <IonSkeletonText animated />
          </IonAvatar>
          <IonLabel>
            <h3>
              <IonSkeletonText animated style={{ width: "50%" }} />
            </h3>
            <p>
              <IonSkeletonText animated style={{ width: "80%" }} />
            </p>
            <p>
              <IonSkeletonText animated style={{ width: "60%" }} />
            </p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonAvatar slot="start">
            <IonSkeletonText animated />
          </IonAvatar>
          <IonLabel>
            <h3>
              <IonSkeletonText animated style={{ width: "50%" }} />
            </h3>
            <p>
              <IonSkeletonText animated style={{ width: "80%" }} />
            </p>
            <p>
              <IonSkeletonText animated style={{ width: "60%" }} />
            </p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonAvatar slot="start">
            <IonSkeletonText animated />
          </IonAvatar>
          <IonLabel>
            <h3>
              <IonSkeletonText animated style={{ width: "50%" }} />
            </h3>
            <p>
              <IonSkeletonText animated style={{ width: "80%" }} />
            </p>
            <p>
              <IonSkeletonText animated style={{ width: "60%" }} />
            </p>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonAvatar slot="start">
            <IonSkeletonText animated />
          </IonAvatar>
          <IonLabel>
            <h3>
              <IonSkeletonText animated style={{ width: "50%" }} />
            </h3>
            <p>
              <IonSkeletonText animated style={{ width: "80%" }} />
            </p>
            <p>
              <IonSkeletonText animated style={{ width: "60%" }} />
            </p>
          </IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};
