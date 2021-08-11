import {
  IonAvatar,
  IonImg,
  IonCol,
  IonRow,
  IonIcon,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import "./PhotoUser.css";
import { useAuth } from "contexts/AuthContext";
import { useCurrentUserData } from "hooks/useCurrentUserData";
import { USER_TYPES } from "constants/userTypes";
import { chatbubbles, disc } from "ionicons/icons";
import { discoveringChatRoom } from "firebase/messagesServices";
import { useHistory } from "react-router";

export const PhotoUser: React.FC = () => {
  const history = useHistory();
  const { data, currentUser } = useAuth();
  const currentUserData = useCurrentUserData();

  async function verifyChatRoom() {
    const chatId = await discoveringChatRoom(currentUser.uid, data?.id);
    history.push(`/tabs/chats/${chatId}`);
  }

  return (
    <>
      <IonRow className="profile-photos">
        <IonCol className="imagenes">
          <IonCol className="portada">
            <IonImg src={data?.coverURL}></IonImg>
          </IonCol>
          <IonCol className="contenedor">
            <IonAvatar className="avatar">
              <img src={data?.avatarURL} />
            </IonAvatar>
          </IonCol>
        </IonCol>
      </IonRow>
      {currentUserData?.userType === USER_TYPES.CLUB &&
      currentUser.uid !== data?.id ? (
        <div className="message">
          <IonIcon
            icon={chatbubbles}
            color="primary"
            onClick={verifyChatRoom}
          ></IonIcon>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PhotoUser;
