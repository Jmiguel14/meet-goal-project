import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Avatar from "icons/avatar.png";
import Cover from "assets/cover.png";
import { COLLECTIONS } from "constants/collections";

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

export async function fetchUserDoc() {
  return await firestore
    .collection(COLLECTIONS.USERS)
    .doc(auth.currentUser?.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return getDataToUserDoc(doc);
      }
    });
}

export async function SetPersonalData(
  email: string,
  country: string,
  city: string,
  birth: string,
  contract: string,
  phone: number,
  marketTransfer: string
) {
  let id = auth.currentUser?.uid;
  try {
    const save = await firestore.collection(COLLECTIONS.USERS).doc(id).update({
      email: email,
      phone: phone,
      country: country,
      city: city,
      contract: contract,
      birth: birth,
      marketTransfer: marketTransfer,
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function SetInstitutionalData(
  socialName: string,
  email: string,
  city: string,
  country: string,
  phone: number,
  foundation: string
) {
  let id = auth.currentUser?.uid;
  try {
    const save = await firestore.collection(COLLECTIONS.USERS).doc(id).update({
      socialName,
      email,
      city,
      country,
      phone,
      foundation,
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function EditPositionData(
  pospri: string,
  possec: string,
  goals: string
) {
  let id = auth.currentUser?.uid;
  try {
    const save = await firestore.collection(COLLECTIONS.USERS).doc(id).update({
      pospri: pospri,
      possec: possec,
      goals: goals,
    });
    return true;
  } catch (e) {
    return false;
  }
}
export async function EditPsycoParameters(
  character: string,
  personality: Object,
  attitude: string
) {
  let id = auth.currentUser?.uid;
  try {
    const save = await firestore.collection(COLLECTIONS.USERS).doc(id).update({
      character: character,
      personality: personality,
      attitude: attitude,
    });
    return true;
  } catch (e) {
    return false;
  }
}
export async function EditChannelsLinks(
  facebook: string,
  twitter: string,
  instagram: string,
  youtube: string,
  vimeo: string
) {
  let id = auth.currentUser?.uid;
  try {
    const save = await firestore.collection(COLLECTIONS.USERS).doc(id).update({
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      youtube: youtube,
      vimeo: vimeo,
    });
    return true;
  } catch (e) {
    return false;
  }
}
export async function EditSportsGoalsData(
  totalWins: number,
  maxNacGoal: string,
  maxIntGoal: string
) {
  let id = auth.currentUser?.uid;
  try {
    const save = await firestore.collection(COLLECTIONS.USERS).doc(id).update({
      totalWins,
      maxNacGoal,
      maxIntGoal,
    });
    return true;
  } catch (e) {
    return false;
  }
}
export async function AddCubExperience(
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
  let id = auth.currentUser?.uid;
  try {
    const res = await firestore.collection(COLLECTIONS.USERS).doc(id);
    res.get().then((doc) => {
      if (doc.exists) {
        if (typeof doc.data()?.club === undefined) {
          res.update({
            clubs: [
              {
                clubName: clubName,
                countryClub: countryClub,
                season: season,
                subPlayer: subPlayer,
                catTournament: catTournament,
                PJ: PJ,
                G: G,
                A: A,
                TA: TA,
                TR: TR,
              },
            ],
          });
        } else {
          res.update({
            clubs: firebase.firestore.FieldValue.arrayUnion({
              clubName: clubName,
              countryClub: countryClub,
              season: season,
              subPlayer: subPlayer,
              catTournament: catTournament,
              PJ: PJ,
              G: G,
              A: A,
              TA: TA,
              TR: TR,
            }),
          });
        }
      }
    });
    return true;
  } catch (e) {
    return false;
  }
}

export async function AddInjuryExperienced(
  injuryName: string,
  recoveryTime: string,
  surgery: boolean
) {
  let id = auth.currentUser?.uid;
  try {
    const res = await firestore.collection(COLLECTIONS.USERS).doc(id);
    res.get().then((doc) => {
      if (doc.exists) {
        if (typeof doc.data()?.injuries === undefined) {
          res.update({
            injuries: [
              {
                injuryName: injuryName,
                recoveryTime: recoveryTime,
                surgery: surgery,
              },
            ],
          });
        } else {
          res.update({
            injuries: firebase.firestore.FieldValue.arrayUnion({
              injuryName: injuryName,
              recoveryTime: recoveryTime,
              surgery: surgery,
            }),
          });
        }
      }
    });
    return true;
  } catch (e) {
    return false;
  }
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
