import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import firebase from 'firebase/app'
import { getUserDoc } from "firebase/client";

export const useCurrentUserData = () => {
  const { currentUser } = useAuth();
  const [currentUserData, setCurrentUserData] = useState<
    firebase.firestore.DocumentData | undefined
  >();
  useEffect(() => {
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setCurrentUserData, currentUser.uid);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);

  return currentUserData;
};
