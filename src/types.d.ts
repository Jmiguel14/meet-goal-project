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
