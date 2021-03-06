import {
  IonContent,
  IonHeader,
  IonItemDivider,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "./Messages.css";
import { getMyChatsRooms } from "firebase/messagesServices";
import { useAuth } from "contexts/AuthContext";
import { useCurrentUserData } from "hooks/useCurrentUserData";
import ChatRoomDetails from "components/ChatRoomDetails/ChatRoomDetails";
import { chatRoom } from "types";
import SkeletonChats from "components/Skeletons/SkeletonChats";

const Messages: React.FC = () => {
  const { currentUser } = useAuth();
  const currentUserData = useCurrentUserData();
  const [chatsRoomsList, setChatsRoomsList] =
    useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    let unMounted = false;
    if (!unMounted) {
      getMyChatsRooms(currentUser.uid, currentUserData?.userType, (data) => {
        setChatsRoomsList(data);
      });
    }
    return () => {
      unMounted = true;
    };
  }, [currentUserData, currentUser]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="regresar">
          <IonTitle>Mensajes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItemDivider color="primary">
          <div className="title_divider">Buzón de Mensajería</div>
        </IonItemDivider>
        {chatsRoomsList ? (
          <>
            <IonList>
              {chatsRoomsList?.map((chatRoom: chatRoom, index: number) => (
                <ChatRoomDetails id={chatRoom.id} key={index}></ChatRoomDetails>
              ))}
            </IonList>
          </>
        ) : (
          <SkeletonChats />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Messages;
