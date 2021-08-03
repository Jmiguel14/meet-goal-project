import firebase from "firebase/app";
export function converterDate(date: firebase.firestore.Timestamp) {
  let convertDate = date?.toDate();
  let newDate = `${convertDate?.getDate()} / ${
    convertDate?.getUTCMonth() + 1
  } / ${convertDate?.getUTCFullYear()}`;
  return newDate;
}

export function isCallClosed(endDate: firebase.firestore.Timestamp) {
  let endConvertedDate = endDate?.toDate();
  let currentDate = new Date();
  if (currentDate < endConvertedDate) {
    return true;
  } else {
    return false;
  }
}
