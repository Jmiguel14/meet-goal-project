import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { resizeSharp } from "ionicons/icons";

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
  return data;
};

export const getUserDoc = (callback: any) => {
  return firestore
    .collection("users")
    .doc(auth.currentUser?.uid)
    .onSnapshot((snapshot) => {
      const newData = getDataToUserDoc(snapshot);
      callback(newData);
    });
};

export async function fetchUserDoc() {
  return await firestore
    .collection("users")
    .doc(auth.currentUser?.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return getDataToUserDoc(doc);
      }
    });
}

export async function setPersonalData(
  email: string,
  country: string,
  city: string,
  birth: string,
  contract: string,
  phone: number
) {
  let id = auth.currentUser?.uid;
  try {
    const save = await firestore.collection("users").doc(id).update({
      email: email,
      phone: phone,
      country: country,
      city: city,
      contract: contract,
      birth: birth,
    });
    console.log("Registro actualizado");
  } catch (e) {
    console.log(e);
  }
}

export async function EditPositionData(
  pospri: string,
  possec: string,
  goals: string
) {
  let id = auth.currentUser?.uid;
  try {
    const save = await firestore.collection("users").doc(id).update({
      pospri: pospri,
      possec: possec,
      goals: goals,
    });
    console.log("posicion editada");
  } catch (e) {
    console.log(e);
  }
}
export async function EditPsycoParameters(
  character: string,
  personality: string,
  attitude: string
) {
  let id = auth.currentUser?.uid;
  try {
    const save = await firestore.collection("users").doc(id).update({
      character: character,
      personality: personality,
      attitude: attitude,
    });
    console.log("datos psyco editados");
  } catch (e) {
    console.log(e);
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
    const save = await firestore.collection("users").doc(id).update({
      facebook: facebook,
      twitter: twitter,
      instagram: instagram,
      youtube: youtube,
      vimeo: vimeo,
    });
  } catch (e) {
    console.log(e);
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
    const res = await firestore.collection("users").doc(id);
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
          console.log("lista de club creado y club agregado");
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
          console.log("club agregado");
        }
      } else {
        console.log("error al cargar el documento");
      }
    });
  } catch (e) {
    console.log(e);
  }
}

export async function AddInjuryExperienced(
  injuryName: string,
  recoveryTime: string,
  surgery: boolean
) {
  let id = auth.currentUser?.uid;
  try {
    const res = await firestore.collection("users").doc(id);
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
          console.log("lesiones creadas y lesion agregada");
        } else {
          res.update({
            injuries: firebase.firestore.FieldValue.arrayUnion({
              injuryName: injuryName,
              recoveryTime: recoveryTime,
              surgery: surgery,
            }),
          });
          console.log("lesion agregada");
        }
      }
    });
  } catch (e) {
    console.log(e);
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
    const save = await firestore.collection("users").doc(id).update({
      firstAttribute: att1,
      secondAttribute: att2,
      thirdAttribute: att3,
      fourthAttribute: att4,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function EditPersonalValues(
  value1: string,
  value2: string,
  value3: string
) {
  let id = auth.currentUser?.uid;
  try {
    const save = await firestore.collection("users").doc(id).update({
      value1: value1,
      value2: value2,
      value3: value3,
    });
  } catch (e) {
    console.log(e);
  }
}
