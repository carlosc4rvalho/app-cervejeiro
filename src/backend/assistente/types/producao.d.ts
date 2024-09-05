/**
 * @file Este arquivo exporta o tipo que contém todos os atributos disponíveis na collection:
 *
 * Users -> Producao -> {id}
 *
 * @author Enrico Vivan
 */

export type ProducaoFirebase = {
  // lavagem
  mostoSaiAtingir?: number;
  temperaturaLavagem?: number;

  // pre fervura
  mostoAntesFervura?: number;
  ogAntesFervura?: number;
};
