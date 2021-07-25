import {
  IonButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonText,
} from "@ionic/react";
import { NewCallDataForm } from "types";
import firebase from "firebase";

interface CallsListProps {
  calls: firebase.firestore.DocumentData | undefined;
  disableInfinitiScroll: boolean;
  onSearchNext: ($event: CustomEvent<void>) => void;
}

export const CallsList = ({
  calls,
  disableInfinitiScroll,
  onSearchNext,
}: CallsListProps) => {
  return (
    <IonList>
      {calls &&
        calls.map((call: NewCallDataForm, index: number) => {
          return (
            <IonItem key={index}>
              <IonLabel>
                <IonText>{call.posRequired}</IonText>
                <br />
                <IonNote>{call.ageRequired}</IonNote>
              </IonLabel>
              <IonButton slot="end" fill="clear" size="small" routerLink={`/tabs/convocatoria/${call.id}`}>
                Ver
              </IonButton>
            </IonItem>
          );
        })}
      <IonInfiniteScroll
        disabled={disableInfinitiScroll}
        onIonInfinite={(e: CustomEvent<void>) => onSearchNext(e)}
      >
        <IonInfiniteScrollContent loadingText="Loading..."></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonList>
  );
};
