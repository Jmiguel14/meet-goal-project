export enum userTypeEnum {
  club = "Club",
  jugador = "Jugador",
  academia = "Académia",
  tecnico = "Técnico",
}

export interface SignupFormInputs {
  userType: userTypeEnum;
  name: string;
  phone: number;
  email: string;
  password: string;
}

export interface SigninFormInputs {
  email: string;
  password: string;
}
export interface ClubDataForm {
  clubName: string;
  country: string;
  season: number;
  subPlayer: string;
  catTournament: string;
  PJ: number;
  G: number;
  A: number;
  TA: number;
  TR: number;
}
export interface InjuryDataForm {
  injuryName: string;
  recoveryTime: string;
  surgery: boolean;
}
export interface PersonalDataForm {
  mail: string;
  country: string;
  city: string;
  phone: number;
  birth: string;
  contract: string;
  marketTransfer: string;
}
export interface InstitutionalDataForm {
  socialName: string;
  mail: string;
  city: string;
  country: string;
  phone: number;
  foundation: string;
}
export interface PsycoDataForm {
  character: string;
  personality: Object;
  attitude: string;
}
export interface TacticalDataForm {
  pospri: string;
  possec: string;
  goals: string;
}
export interface SportsGoalsDataForm {
  totalWins: number;
  maxNacGoal: string;
  maxIntGoal: string;
}
export interface Player {
  userType: userTypeEnum;
  name: string;
  email: string;
  phone: number;
  pospri: string;
  possec: string;
  avatarURL: string;
  coverURL: string;
  attitude: string;
  character: string;
  personality: {};
  createdAt: firebase.firestore.Timestamp;
}
export interface NewCallDataForm {
  id?: string;
  ageRequired: string;
  posRequired: string;
  startDate: string;
  endDate: string;
  extraDetails: string;
  clubId?: string;
  postulatedPlayers?: any;
}

export interface Club {
  id?: string;
  avatarURL: string;
  name: string;
  businessName: string;
  email: string;
  phone: number;
  country: string;
  city: string;
  totalAchievements: number;
  nationalAchievements: number;
  internationalAchievements: number;
}
