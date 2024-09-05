/**
 * @file Este arquivo exporta todos os tipos sobre as Etapas da
 * tabela do Assistente de Produção.
 *
 * @author Róbson da Silva Benedito
 */

export type Etapas = {
  tipo: string;
  rampas: [{ rampa: number; temperatura: number }];
};
