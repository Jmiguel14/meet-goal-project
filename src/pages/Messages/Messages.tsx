import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "./Messages.css";
import { getMyChatsRooms } from "firebase/messagesServices";
import { useAuth } from "contexts/AuthContext";
import { useCurrentUserData } from "hooks/useCurrentUserData";
import { Link } from "react-router-dom";
import ChatRoomDetails from "components/ChatRoomDetails/ChatRoomDetails";

const Messages: React.FC = () => {
  const { currentUser } = useAuth();
  const currentUserData = useCurrentUserData();
  const [chatsRoomsList, setChatsRoomsList] =
    useState<firebase.firestore.DocumentData>();
  const [receiverData, setReceiverData] =
    useState<firebase.firestore.DocumentData>();

  useEffect(() => {
    getMyChatsRooms(currentUser.uid, currentUserData?.userType, (data) => {
      setChatsRoomsList(data);
    });
  }, [currentUserData?.userType, currentUser.uid]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="regresar">
          <IonButton slot="start" fill="clear">
            <IonIcon icon={arrowBackOutline} />
          </IonButton>
          <IonTitle>Mensajes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {chatsRoomsList?.map((chatRoom: any, index: number) => (
          <ChatRoomDetails id={chatRoom.id} key={index}></ChatRoomDetails>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Messages;
