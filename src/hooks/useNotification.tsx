import { useEffect, useState } from "react";
import firebase from "firebase";
import { getUserNotifications } from "firebase/notificationsServices";
import { useAuth } from "contexts/AuthContext";

const useNotification = () => {
  const { currentUser } = useAuth();
  const [notificationList, setNotificationList] =
    useState<firebase.firestore.DocumentData>();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = getUserNotifications(setNotificationList);
      return () => unsubscribe && unsubscribe();
    }
  }, []);

  useEffect(() => {
    setFlag(false);
    if (currentUser && notificationList) {
      if (notificationList) {
        notificationList.map((notification: any) => {
          if (notification.isSeen === false) {
            setFlag(true);
          }
        });
      }
    }
  });
  return flag;
};

export default useNotification;
