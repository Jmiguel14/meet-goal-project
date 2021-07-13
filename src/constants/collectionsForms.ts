export interface IIIForm {
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
export interface IVForm {
  injuryName: string;
  recoveryTime: string;
  surgery: boolean;
}
export interface VIForm {
  pospri: string;
  possec: string;
  goals: string;
}
export interface VForm {
  character: string;
  personality: Object;
  attitude: string;
}
export interface IIForm {
  mail: string;
  country: string;
  city: string;
  phone: number;
  birth: string;
  contract: string;
  marketTransfer: string;
}
export const checkboxList = [
  { val: "Fuerza", isChecked: false },
  { val: "Entradas precisas", isChecked: false },
  { val: "Capitán", isChecked: false },
  { val: "Marcaje", isChecked: false },
  { val: "Ritmo", isChecked: false },
  { val: "Centros", isChecked: false },
  { val: "Reacción", isChecked: false },
  { val: "Destructor", isChecked: false },
  { val: "Interceptor", isChecked: false },
  { val: "Pases largos", isChecked: false },
  { val: "Todocampista", isChecked: false },
  { val: "Regateador", isChecked: false },
  { val: "Control del balón", isChecked: false },
  { val: "Tiro lejano", isChecked: false },
  { val: "Contraataques", isChecked: false },
  { val: "Ofensivo", isChecked: false },
  { val: "Velocidad", isChecked: false },
  { val: "Agilidad", isChecked: false },
  { val: "Tiros", isChecked: false },
  { val: "Finalización", isChecked: false },
  { val: "Segundo Delantero", isChecked: false },
  { val: "Referencia", isChecked: false },
];

export const checkboxListI = [
  { val: "Juego Limpio", isChecked: false },
  { val: "Respeto", isChecked: false },
  { val: "Compañerismo", isChecked: false },
  { val: "Disciplina", isChecked: false },
  { val: "Asumir Frustraciones", isChecked: false },
  { val: "Esfuerzo", isChecked: false },
  { val: "Ssaber disfrutar", isChecked: false },
  { val: "Humildad", isChecked: false },
  { val: "Amistad", isChecked: false },
  { val: "Unidad y liderazgo", isChecked: false },
  { val: "Solidaridad", isChecked: false },
];
