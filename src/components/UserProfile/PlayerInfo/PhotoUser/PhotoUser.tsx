import { IonAvatar, IonImg, IonCol, IonRow, IonIcon } from "@ionic/react";
import "./PhotoUser.css";
import { useAuth } from "contexts/AuthContext";
import { useCurrentUserData } from "hooks/useCurrentUserData";
import { USER_TYPES } from "constants/userTypes";
import { chatbubbles } from "ionicons/icons";
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
      <div className="profile-photos">
        <IonRow className="imagenes">
          <IonCol className="portada">
            <IonImg src={data?.coverURL} className="cover"></IonImg>
          </IonCol>
          <IonCol className="contenedor">
            <div className="avatar">
              <IonAvatar className="avatar_image">
                <img src={data?.avatarURL} />
              </IonAvatar>
            </div>
          </IonCol>
        </IonRow>
      </div>
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
