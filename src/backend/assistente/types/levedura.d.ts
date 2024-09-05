export type Levedura = {
  nome: string;
  quantidade: number; // em pacotes (pct)
  adicaoCelulas?: number;
  adicaoPacotes?: number;
};

export type YeastsFirebase = {
  aten: number;
  ident: string;
  lab: string;
  name: string;
  numCel: number;
};
