export type Lupulos = {
  id: string;
  nome: string;
  quantidade: number;
  tempo: number;
  // TODO: ver com Ronan o que é essa adição
  // usuário vai salvar
  adicao?: number;
};

export type LupulosFirebase = {
  id: string;
  resfr: number;
  ibuFerv: number;
  alpha: number;
  name: string;
  ibu: number;
};

export type LupuloProducaoFirebase = {
  id: string;
  adicao: number;
};
