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
import { Player } from "types";
import firebase from "firebase";

interface PlayersListProps {
  players: firebase.firestore.DocumentData | undefined;
  disableInfinitiScroll: boolean;
  onSearchNext: ($event: CustomEvent<void>) => void;
}

export const PlayersList = ({
  players,
  disableInfinitiScroll,
  onSearchNext,
}: PlayersListProps) => {
  return (
    <>
      <IonList>
        {players &&
          players.map((player: Player, index: number) => {
            return (
              <IonItem key={index}>
                <IonAvatar slot="start">
                  <img src={player.avatarURL} />
                </IonAvatar>
                <IonLabel>
                  <IonText>{player.name}</IonText>
                  <br />
                  <IonNote>{player.pospri}</IonNote>
                </IonLabel>
                <IonButton
                  slot="end"
                  fill="clear"
                  size="small"
                  routerLink={`/tabs/perfil/${player.id}`}
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
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonList>
    </>
  );
};
