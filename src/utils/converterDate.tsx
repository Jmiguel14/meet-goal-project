import firebase from "firebase/app";
export function converterDate(date: firebase.firestore.Timestamp) {
  let convertDate = date.toDate();
  let newDate = `${convertDate.getDate()} / ${
    convertDate.getUTCMonth() + 1
  } / ${convertDate.getUTCFullYear()}`;
  return newDate;
}
