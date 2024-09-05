/**
 * @file Este arquivo exporta os tipos necessários para incrementar no arquivo 'lavagem.js', referentes aos dados
 * e retornos para a tabela de 'Lavagem' do Assistente de Produção
 *
 * @author Enrico Vivan
 */

export type Lavagem = {
  volumeDeAgua: number;
  temperatura?: number;
  lavarGraosAteMostroAtingir?: number;
  ouAteMostroAtingirOG: number;
  ouAteVolumeDesejado: number;
};
