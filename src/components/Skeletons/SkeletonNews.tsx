import React from "react";
import {
  IonAvatar,
  IonCard,
  IonCol,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonSkeletonText,
  IonText,
} from "@ionic/react";

export const SkeletonNews = () => {
  return (
    <>
      <IonItem lines="none">
        <IonAvatar slot="start">
          <IonSkeletonText animated />
        </IonAvatar>
        <IonLabel>
          <h3>
            <IonSkeletonText animated style={{ width: "100%" }} />
          </h3>
        </IonLabel>
        <IonAvatar slot="end">
          <IonSkeletonText animated />
        </IonAvatar>
      </IonItem>
      <IonList>
        <IonCard>
          <IonItem>
            <IonLabel>
              <h3>
                <IonSkeletonText animated style={{ width: "50%" }} />
              </h3>
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
        </IonCard>
        <IonCard>
          <IonItem>
            <IonLabel>
              <h3>
                <IonSkeletonText animated style={{ width: "50%" }} />
              </h3>
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
        </IonCard>
        <IonCard>
          <IonItem>
            <IonLabel>
              <h3>
                <IonSkeletonText animated style={{ width: "50%" }} />
              </h3>
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
        </IonCard>
        <IonCard>
          <IonItem>
            <IonLabel>
              <h3>
                <IonSkeletonText animated style={{ width: "50%" }} />
              </h3>
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
        </IonCard>
        <IonCard>
          <IonItem>
            <IonLabel>
              <h3>
                <IonSkeletonText animated style={{ width: "50%" }} />
              </h3>
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
        </IonCard>
        <IonCard>
          <IonItem>
            <IonLabel>
              <h3>
                <IonSkeletonText animated style={{ width: "50%" }} />
              </h3>
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
        </IonCard>
      </IonList>
    </>
  );
};
