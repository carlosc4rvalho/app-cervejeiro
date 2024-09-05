/**
 * @file Este arquivo exporta todos os tipos sobre o Processo de Fermentação da
 * tabela do Assistente de Produção.
 *
 * @author Róbson da Silva Benedito
 */

export type ProcessoFermentacao = {
  levedura: string;
  faixaTemperatura: {
    max: number;
    min: number;
  };
};
