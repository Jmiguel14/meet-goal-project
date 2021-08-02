import { useEffect, useState } from "react";
import firebase from "firebase";
import { getUserNotifications } from "firebase/notificationsServices";

export const useNotifications = () => {
  const [notificationList, setNotificationList] =
    useState<firebase.firestore.DocumentData>();
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = getUserNotifications(setNotificationList);
    return () => unsubscribe && unsubscribe();
  }, []);

  useEffect(() => {
    if (notificationList) {
      notificationList?.map((notification: any) => {
        if (notification.isSeen === false) {
          setFlag(true);
        }
      });
    }
  }, [notificationList]);

  return flag;
};
