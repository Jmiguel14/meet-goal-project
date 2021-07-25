import React, { useContext, useEffect, useState } from "react";
import {
  auth,
  defaultAvatar,
  defaultCover,
  firestore,
  getUserDoc,
} from "firebase/client";
import firebase from "firebase/app";
import { useIonToast, IonLoading } from "@ionic/react";
import { userTypeEnum } from "types";
import { useParams } from "react-router";

type user = {
  name: string;
  phone: number;
  userType: userTypeEnum;
};

interface IAuthProvider {
  currentUser: firebase.User;
  data: firebase.firestore.DocumentData | undefined;
  signUp: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  createUserDocument: (
    currentUser: firebase.User,
    userProperties: user
  ) => Promise<void>;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setData: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >;
}

const AuthContext = React.createContext<IAuthProvider>({} as IAuthProvider);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [present] = useIonToast();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<
    firebase.firestore.DocumentData | undefined
  >();

  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setCurrentUser(firebaseUser);
      setLoading(false);
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
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        });
        defaultAvatar(currentUser.uid);
        defaultCover(currentUser.uid);
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
  const params = useParams();
  console.log("params", params);
  useEffect(() => {
    let unsubscribe: any;
    if (currentUser) {
      unsubscribe = getUserDoc(setData, currentUser.uid);
    }
    return () => unsubscribe && unsubscribe();
  }, [currentUser]);

  console.log("data", data);

  const value = {
    currentUser,
    data,
    setData,
    signUp,
    createUserDocument,
    login,
    logout,
    resetPassword,
  } as IAuthProvider;
  return (
    <>
      <AuthContext.Provider value={value}>
        {loading ? (
          <IonLoading isOpen={loading} message="Cargando..." />
        ) : (
          children
        )}
      </AuthContext.Provider>
    </>
  );
};
