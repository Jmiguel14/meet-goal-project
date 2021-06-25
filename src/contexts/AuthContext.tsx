import React, { useContext, useEffect, useState } from "react";
import { auth, firestore } from "firebase/client";
import firebase from "firebase/app";
import { useIonToast } from "@ionic/react";
import { userTypeEnum } from "pages/SignUp/index";

export type user = {
  name: string;
  phone: number;
  userType: userTypeEnum;
};

interface IAuthProvider {
  currentUser: firebase.User;
  signUp: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  createUserDocument: (
    currentUser: firebase.User,
    userProperties: user
  ) => Promise<void>;
}

const AuthContext = React.createContext<IAuthProvider>({} as IAuthProvider);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [present] = useIonToast();

  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setCurrentUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  const createUserDocument = async (
    currentUser: firebase.User,
    userProperties: user
  ) => {
    if (!currentUser) return;

    const userRef = firestore.doc(`users/${currentUser.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      const { email } = currentUser;
      const { name, phone, userType } = userProperties;
      try {
        userRef.set({
          email,
          name,
          phone,
          userType,
          createAt: firebase.firestore.Timestamp.fromDate(new Date()),
        });
      } catch (error) {
        present({
          message: "Ocurrió un error al crear la cuenta",
          duration: 3000,
          position: "top",
          color: "danger",
        });
      }
    }
  };

  const value = {
    currentUser,
    signUp,
    createUserDocument,
  } as IAuthProvider;

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
};
