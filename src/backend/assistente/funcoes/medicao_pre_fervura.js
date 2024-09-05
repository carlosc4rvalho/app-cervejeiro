/**
 * @file Este arquivo exporta a função para captar todos os dados necessários para preencher a tabela de 'Medição Pré Fervira' do Assistente de Produção,
 * assim como também exporta as funções para salvar o valor medido da OG antes da fervura e o valor de mosto medido antes da fervura
 *
 * @typedef {import('../types/medicao_pre_fervura.d.ts').MedicaoPreFervura} MedicaoPreFervura
 * @typedef {import('../types/producao.d.ts').ProducaoFirebase} ProducaoFirebase
 *
 * @author Enrico Vivan
 */

import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import db from '../../../services/firebaseConfig.js';

// ----- Variáveis Globais ----- //

// -------------------- Funções Exportadas -------------------- //

/**
 * @brief Esta função retorna um objeto com todos os dados necessários para preencher a tabela de 'Medicao pré Fervura' do grupo de Assistente de Produção, a partir dos dados salvos no Firebase.
 *
 * Caso não haja dados salvos ainda no firebase, o valor que será retornado será igual a 0 para os dois parâmetros.
 *
 * Para usar esta função, chame-a da seguinte forma:
 *
 * @example const medicaoPreFervura = await getMedicaoPreFervuraAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI')
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @return {Promise<MedicaoPreFervura>}
 */
async function getMedicaoPreFervuraAssistente(userId, receitaId) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  const dataSnap = await getDoc(prodRef);

  if (!dataSnap.exists()) {
    console.warn(`(Assistente): Produção com ID ${receitaId} não existe no Firebase!`);
    return;
  }

  if (!dataSnap.data().ogAntesFervura) {
    console.warn("(Assistente): Não existe nenhum 'ogAntesFervura' salvo no Firebase!");
  }
  if (!dataSnap.data().mostoAntesFervura) {
    console.warn("(Assistente): Não existe nenhum 'mostoAntesFervura' salvo no Firebase!");
  }

  /**@type {MedicaoPreFervura} */
  let data = {
    ogAntesFervura: dataSnap.data().ogAntesFervura ?? 0,
    mostoAntesFervura: dataSnap.data().mostoAntesFervura ?? 0,
  };

  return data;
}

/**
 * @brief Esta função salva no Firebase a informação de 'Valor medido da OG antes da fervura' da tabela de Medições Pré Fervura do Assistente de Produção.
 *
 * Para Salvar, devem-se ser passados três parâmetros:
 * - userId:    o ID do usuário.
 * - receitaId: o ID da receita a ser salvo esse valor.
 * - valorOGPreFervura: O Valor da OG a ser salvo.
 *
 * Use a função da seguinte forma:
 *
 * @example
 * await setValorOgPreFervura('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', 1.044);
 *
 * @param {string} userId
 * @param {string} receitaId
 * @param {number} valorOGPreFervura
 */
async function setValorOgPreFervura(userId, receitaId, valorOGPreFervura) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  const dataSnap = await getDoc(prodRef);

  // Seta todos os dados anteriores do firebase + dado novo
  await setDoc(prodRef, {
    ...dataSnap.data(),
    ogAntesFervura: valorOGPreFervura,
  });
}

/**
 * @brief Esta função salva no Firebase a informação de 'Volume de mosto medido antes da fervura' da tabela de Medições Pré Fervura do Assistente de Produção.
 *
 * Para Salvar, devem-se ser passados três parâmetros:
 * - userId:    o ID do usuário.
 * - receitaId: o ID da receita a ser salvo esse valor.
 * - valorMedidoMosto: O Valor do mosto medido antes da fervura a ser salvo no firebase.
 *
 * Use a função da seguinte forma:
 *
 * @example
 * // Lembre-se que o valor do mosto é em Litros (L)
 * await setVolumeMostoPreFervura('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', 26);
 *
 * @param {string} userId
 * @param {string} receitaId
 * @param {number} valorMedidoMosto
 */
async function setVolumeMostoPreFervura(userId, receitaId, valorMedidoMosto) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  const dataSnap = await getDoc(prodRef);

  // Seta todos os dados anteriores do firebase + dado novo
  await setDoc(prodRef, {
    ...dataSnap.data(),
    mostoAntesFervura: valorMedidoMosto,
  });
}

/**
 * @brief Esta função salva no Firebase a informação de 'Volume de mosto medido antes da fervura' e 'Valor medido da OG antes da fervura' da tabela de Medições Pré Fervura do Assistente de Produção.
 *
 * Para Salvar, devem-se ser passados três parâmetros:
 * - userId:    o ID do usuário.
 * - receitaId: o ID da receita a ser salvo esse valor.
 * - valoresPreFervura: Os valores de volume do mosto medido e o valor medido da OG.
 *
 * Os valores em 'valoresPreFervura' devem ser passados como um objeto, desta forma:
 *
 * @example
 * await setValoresPreFervura('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', {
 *      ogAntesFervura: 1.044,
 *      mostoAntesFervura: 26 // lembrando que este valor é em Litros (L)
 * });
 *
 * @param {string} userId
 * @param {string} receitaId
 * @param {MedicaoPreFervura} valoresPreFervura
 */
async function setValoresPreFervura(userId, receitaId, valoresPreFervura) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  const dataSnap = await getDoc(prodRef);

  // Seta todos os dados anteriores do firebase + dado novo
  await setDoc(prodRef, {
    ...dataSnap.data(),
    ...valoresPreFervura,
  });
}

// -------------------------------------------- Funções Utilitárias -------------------------------------------- //
// ------------------------- Funções definidas para auxiliar em processos nesta tabela ------------------------- //
// --------------------------------------------------------------------------------------------------------------//

/**
 * @deprecated
 *
 * @brief Essa função retorna todos os elementos que podem conter na collection:
 *
 * Users -> Producao -> {id}
 *
 * @return {Promise<ProducaoFirebase>}
 */
async function getAllAttDataFromProd(userId, receitaId) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  const dataSnap = await getDoc(prodRef);

  return dataSnap.data();
}

// ---------------------------------------------FUNÇÕES DE DEBUG -------------------------------------------- //
// (NÃO UTILIZE ESSAS FUNÇÕES NO FRONT-END, EU NÃO ME RESPONSABILIZO PELOS ERROS MALUCOS QUE PODEM ACONTECER) //
// ---------------------------------------------------------------------------------------------------------- //

export { getMedicaoPreFervuraAssistente, setValorOgPreFervura, setVolumeMostoPreFervura, setValoresPreFervura };
