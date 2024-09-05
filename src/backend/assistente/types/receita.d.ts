/**
 * @file Tipos da tabela receita e do objeto do firebase.
 * @author Enrico Vivan
 */

export type Receita = {
  nome: string;
  estilo: string;
  eficiencia_mash: string;
  eficiencia_brewhouse: string;
  volume_total_agua: number;
  volume_agua_mash: number;
  volume_agua_lavagem: number;
};

export type ReceitaDataFirebase = {
  ibuTotal: number;
  buGu: number;
  carbon: number;
  ogMash: number;
  abvEstim: number;
  ogFerm: number;
  fgEstim: number;
  name: string;
  volAguaLav: number;
  volAguaMash: number;
};
