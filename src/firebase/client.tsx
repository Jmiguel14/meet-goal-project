import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Avatar from "icons/avatar.png";
import Cover from "assets/cover.png";
import { COLLECTIONS } from "constants/collections";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

GoogleAuth.init();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const getDataToUserDoc = (doc: any) => {
  const data = doc.data();
  const id = doc.id;
  return {
    ...data,
    id: id,
  };
};

export const getUserDoc = (
  callback: React.Dispatch<
    React.SetStateAction<firebase.firestore.DocumentData | undefined>
  >,
  id: string
) => {
  return firestore
    .collection(COLLECTIONS.USERS)
    .doc(id)
    .onSnapshot((snapshot) => {
      const newData = getDataToUserDoc(snapshot);
      callback(newData);
    });
};

export function SetPersonalData(
  country: string,
  city: string,
  birth: string,
  contract: string,
  phone: number,
  marketTransfer?: string
) {
  const id = auth.currentUser?.uid;

  firestore.collection(COLLECTIONS.USERS).doc(id).update({
    phone,
    country,
    city,
    contract,
    birth,
    marketTransfer,
  });
}

export async function SetInstitutionalData(
  socialName: string,
  city: string,
  country: string,
  phone: number,
  foundation: string
) {
  const id = auth.currentUser?.uid;

  firestore.collection(COLLECTIONS.USERS).doc(id).update({
    socialName,
    city,
    country,
    phone,
    foundation,
  });
}

export function EditPositionData(
  pospri: string,
  possec: string,
  goals: string
) {
  const id = auth.currentUser?.uid;

  firestore.collection(COLLECTIONS.USERS).doc(id).update({
    pospri,
    possec,
    goals,
  });
}

export function EditPsycoParameters(
  character: string,
  personality: Object,
  attitude: string
) {
  const id = auth.currentUser?.uid;
  firestore.collection(COLLECTIONS.USERS).doc(id).update({
    character,
    personality,
    attitude,
  });
}
export function EditChannelsLinks(
  facebook: string,
  twitter: string,
  instagram: string,
  youtube: string,
  vimeo: string
) {
  const id = auth.currentUser?.uid;

  firestore.collection(COLLECTIONS.USERS).doc(id).update({
    facebook,
    twitter,
    instagram,
    youtube,
    vimeo,
  });
}

export function EditSportsGoalsData(
  totalWins: number,
  maxNacGoal: string,
  maxIntGoal: string
) {
  const id = auth.currentUser?.uid;

  firestore.collection(COLLECTIONS.USERS).doc(id).update({
    totalWins,
    maxNacGoal,
    maxIntGoal,
  });
}

export async function AddClubExperience(
  clubName: string,
  countryClub: string,
  season: number,
  subPlayer: string,
  catTournament: string,
  PJ: number,
  G: number,
  A: number,
  TA: number,
  TR: number
) {
  const id = auth.currentUser?.uid;

  const res = await firestore.collection(COLLECTIONS.USERS).doc(id);
  res.get().then((doc) => {
    if (doc.exists) {
      if (typeof doc.data()?.club === undefined) {
        res.update({
          clubs: [
            {
              clubName,
              countryClub,
              season,
              subPlayer,
              catTournament,
              PJ,
              G,
              A,
              TA,
              TR,
            },
          ],
        });
      } else {
        res.update({
          clubs: firebase.firestore.FieldValue.arrayUnion({
            clubName,
            countryClub,
            season,
            subPlayer,
            catTournament,
            PJ,
            G,
            A,
            TA,
            TR,
          }),
        });
      }
    }
  });
}

export async function AddInjuryExperienced(
  injuryName: string,
  recoveryTime: string,
  surgery: boolean
) {
  const id = auth.currentUser?.uid;
  const res = await firestore.collection(COLLECTIONS.USERS).doc(id);
  res.get().then((doc) => {
    if (doc.exists) {
      if (typeof doc.data()?.injuries === undefined) {
        res.update({
          injuries: [
            {
              injuryName,
              recoveryTime,
              surgery,
            },
          ],
        });
      } else {
        res.update({
          injuries: firebase.firestore.FieldValue.arrayUnion({
            injuryName,
            recoveryTime,
            surgery,
          }),
        });
      }
    }
  });
}

export async function EditTacticalAttributes(
  att1: string,
  att2: string,
  att3: string,
  att4: string
) {
  let id = auth.currentUser?.uid;
  try {
    const save = await firestore.collection(COLLECTIONS.USERS).doc(id).update({
      firstAttribute: att1,
      secondAttribute: att2,
      thirdAttribute: att3,
      fourthAttribute: att4,
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function EditPersonalValues(
  value1: string,
  value2: string,
  value3: string
) {
  let id = auth.currentUser?.uid;
  try {
    const save = await firestore.collection(COLLECTIONS.USERS).doc(id).update({
      value1: value1,
      value2: value2,
      value3: value3,
    });
    return true;
  } catch (e) {
    return false;
  }
}
const storage = firebase.storage();
export function defaultAvatar(id: string) {
  const storageRef = storage.ref().child(`images/${id}/avatar`);
  fetch(Avatar)
    .then((res) => res.blob())
    .then((Blob) => {
      storageRef.put(Blob).then((savedPicture) => {
        storageRef.getDownloadURL().then((url) => {
          firestore.collection(COLLECTIONS.USERS).doc(id).update({
            avatarURL: url,
          });
        });
      });
    });
}

export function defaultCover(id: string) {
  const storageRef = storage.ref().child(`images/${id}/cover`);
  fetch(Cover)
    .then((res) => res.blob())
    .then((Blob) => {
      storageRef.put(Blob).then((savedPicture) => {
        storageRef.getDownloadURL().then((url) => {
          firestore.collection(COLLECTIONS.USERS).doc(id).update({
            coverURL: url,
          });
        });
      });
    });
}
export function updateProfileAvatar(image: File) {
  const storageRef = firebase
    .storage()
    .ref()
    .child(`images/${auth.currentUser?.uid}/avatar`);
  const task = storageRef.put(image);
  return task;
}
export function updateProfileCover(image: File) {
  const storageRef = firebase
    .storage()
    .ref()
    .child(`images/${auth.currentUser?.uid}/cover`);
  const task = storageRef.put(image);
  return task;
}

export const loginWithGoogle = () => {
  return GoogleAuth.signIn().then((result) => {
    return auth.signInWithCredential(
      firebase.auth.GoogleAuthProvider.credential(
        result.authentication.idToken,
        result.authentication.accessToken
      )
    );
  });
};
