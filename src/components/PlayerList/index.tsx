import { IonItem, IonLabel, IonList } from "@ionic/react";
import { getPlayers } from "firebase/client";
import React, { useEffect, useState } from "react";
import firebase from "firebase/app";

const PlayerList = () => {
  const [players, setPlayers] = useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    const unsubscribe = getPlayers(setPlayers)
    //return () => unsubscribe && unsubscribe()
  }, []);

  return (
    <IonList>
        {console.log(players)}
      {players &&
        players.map((player: any, index: any) => {
          return (
            <IonItem key={index}>
              <IonLabel>{player.name}</IonLabel>
            </IonItem>
          );
        })}
    </IonList>
  );
};

export default PlayerList;
