export type Graos = {
  graos: GraosResult[];
  pesoTotal: number;
};

export type GraosFirebase = {
  ppg: number;
  name: string;
  poderDiast: number;
  color: number;
  weight: number;
  potBu: number;
  fG: number;
  ogMax: number;
};

export type GraosResult = {
  nome: string;
  quantidade: number;
};
