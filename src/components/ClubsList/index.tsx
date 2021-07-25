import {
  IonAvatar,
  IonButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonText,
} from "@ionic/react";
import { Club } from "types";
import firebase from "firebase";

interface ClubsListProps {
  clubs: firebase.firestore.DocumentData | undefined;
  disableInfinitiScroll: boolean;
  onSearchNext: ($event: CustomEvent<void>) => void;
}

export const ClubsList = ({
  clubs,
  disableInfinitiScroll,
  onSearchNext,
}: ClubsListProps) => {
  return (
    <IonList>
      {clubs &&
        clubs.map((club: Club, index: number) => {
          return (
            <IonItem key={index}>
              <IonAvatar slot="start">
                <img src={club.avatarURL} />
              </IonAvatar>
              <IonLabel>
                <IonText>{club.name}</IonText>
                <br />
                <IonNote>{club.businessName}</IonNote>
              </IonLabel>
              <IonButton
                slot="end"
                fill="clear"
                size="small"
                routerLink={`/tabs/perfil/${club.id}`}
              >
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
