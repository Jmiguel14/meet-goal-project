import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { Player } from "types";
import firebase from "firebase";

interface PlayersListProps {
  players: firebase.firestore.DocumentData;
  disableInfinitiScroll: boolean;
  onSearchNext: ($event: CustomEvent<void>) => void;
}

export const PlayersList = ({
  players,
  disableInfinitiScroll,
  onSearchNext,
}: PlayersListProps) => {
  return (
    <IonList>
      {console.log(players)}
      {players &&
        players.map((player: Player, index: number) => {
          return (
            <IonItem key={index}>
              <IonLabel>{player.name}</IonLabel>
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
