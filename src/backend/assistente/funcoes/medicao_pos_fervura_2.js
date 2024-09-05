/**
 * @file Este arquivo exporta a função para captar todos os dados necessários para preencher a segunda tabela de 'Medição Pré Fervura' do Assistente de Produção,
 * assim como também exporta as funções para salvar os valores
 *
 * @typedef {import('../types/medicao_pos_fervura.d.ts').MedicaoPosFervura2} MedicaoPosFervura2
 *
 * @author Enrico Vivan
 */

import { collection, deleteDoc, deleteField, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import db from '../../../services/firebaseConfig.js';

// ----- Variáveis Globais ----- //

// -------------------- Funções Exportadas -------------------- //

/**
 * @brief Busca no firebase informações relacionados à segunda tabela de Medição Pós Fervura do grupo de assistente de produção.
 * Para chamar essa função, utilize da seguinte forma:
 *
 * @example const medicaoPosFervura2 = await getMedicaoPosFervura2Assistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI')
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<MedicaoPosFervura2>}
 */
async function getMedicaoPosFervura2Assistente(userId, receitaId) {
  // pega os dados existentes
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  // dados
  const dataSnap = await getDoc(prodRef);

  // se esse doc não existir
  if (!dataSnap.exists()) {
    console.error(`(Assistente): Não existe um Doc no usuário '${userId}', com id da receita '${receitaId}!!'`);
    return {
      valorFgAposFermentacao: undefined,
      volumeCervejaAposFermentacao: undefined,
      volumeFinalEnvase: undefined,
      volumeTrubFrio: undefined,
    };
  }

  // se não houverem os dados necessários para essa função
  if (!dataSnap.data().valorFgAposFermentacao) {
    console.warn('(Assistente): Não existe nenhum dado de "valorFgAposFermentacao" cadastrado no firebase!');
  }

  if (!dataSnap.data().volumeCervejaAposFermentacao) {
    console.warn('(Assistente): Não existe nenhum dado de "volumeCervejaAposFermentacao" cadastrado no firebase!');
  }

  if (!dataSnap.data().volumeTrubFrio) {
    console.warn('(Assistente): Não existe nenhum dado de "volumeTrubFrio" cadastrado no firebase!');
  }

  if (!dataSnap.data().volumeFinalEnvase) {
    console.warn('(Assistente): Não existe nenhum dado de "volumeFinalEnvase" cadastrado no firebase!');
  }

  return {
    valorFgAposFermentacao: dataSnap.data().valorFgAposFermentacao ?? undefined,
    volumeCervejaAposFermentacao: dataSnap.data().volumeCervejaAposFermentacao ?? undefined,
    volumeTrubFrio: dataSnap.data().volumeTrubFrio ?? undefined,
    volumeFinalEnvase: dataSnap.data().volumeFinalEnvase ?? undefined,
  };
}

/**
 * @brief Salva no banco de dados o valor de 'Valor medido da FG após a fermentação' da tabela de 'Medições Pós Fervura' do grupo Assistente de Produção.
 * Para salvar este valor, utilize da seguinte forma:
 *
 * @example
 * await setFgAposFermentacaoAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', 1.055);
 *
 * Users -> Producao -> valorFgAposFermentacao
 *
 * @param {string} userId
 * @param {string} receitaId
 * @param {number} fgAposFermentacao
 *
 * @return {Promise<void>}
 */
async function setFgAposFermentacaoAssistente(userId, receitaId, fgAposFermentacao) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  // pega os dados existentes nessa doc
  const dataSnap = await getDoc(prodRef);

  if (!dataSnap.exists()) {
    console.error(
      `(Assistente): Não existe nenhum Doc no usuário '${userId}' com ID da receita igual a '${receitaId}'`
    );
    return;
  }

  // adiciona um doc com os dados existentes
  await setDoc(prodRef, {
    ...dataSnap.data(),
    valorFgAposFermentacao: fgAposFermentacao,
  });
}

/**
 * @brief Salva no banco de dados o valor de 'Volume de cerveja medido após a fermentação' da tabela de 'Medições Pós Fervura' do grupo Assistente de Produção.
 * Para salvar este valor, utilize da seguinte forma:
 *
 * Lembrando que o valor do volumeCerveja é em Litros (L)
 *
 * @example
 * await setVolumeCervejaAposFermentacaoAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', 19);
 *
 * Users -> Producao -> volumeCervejaAposFermentacao
 *
 * @param {string} userId
 * @param {string} receitaId
 * @param {number} volumeCerveja
 *
 * @return {Promise<void>}
 */
async function setVolumeCervejaAposFermentacaoAssistente(userId, receitaId, volumeCerveja) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  // pega os dados existentes nessa doc
  const dataSnap = await getDoc(prodRef);

  if (!dataSnap.exists()) {
    console.error(
      `(Assistente): Não existe nenhum Doc no usuário '${userId}' com ID da receita igual a '${receitaId}'`
    );
    return;
  }

  // adiciona um doc com os dados existentes
  await setDoc(prodRef, {
    ...dataSnap.data(),
    volumeCervejaAposFermentacao: volumeCerveja,
  });
}

/**
 * @brief Salva no banco de dados o valor de 'Volume de trub frio' da tabela de 'Medições Pós Fervura' do grupo Assistente de Produção.
 * Para salvar este valor, utilize da seguinte forma:
 *
 * Lembrando que o valor do volumeTrubFrio é em Litros (L)
 *
 * @example
 * await setVolumeTrubFrioAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', 2.5);
 *
 * Users -> Producao -> volumeTrubFrio
 *
 * @param {string} userId
 * @param {string} receitaId
 * @param {number} volumeTrubFrio Litros (L)
 *
 * @returns {Promise<void>}
 */
async function setVolumeTrubFrioAssistente(userId, receitaId, volumeTrubFrio) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  // pega os dados existentes nessa doc
  const dataSnap = await getDoc(prodRef);

  if (!dataSnap.exists()) {
    console.error(
      `(Assistente): Não existe nenhum Doc no usuário '${userId}' com ID da receita igual a '${receitaId}'`
    );
    return;
  }

  // adiciona um doc com os dados existentes
  await setDoc(prodRef, {
    ...dataSnap.data(),
    volumeTrubFrio: volumeTrubFrio,
  });
}

/**
 * @brief Salva no banco de dados o valor de 'Volume final pra envase' da tabela de 'Medições Pós Fervura' do grupo Assistente de Produção.
 * Para salvar este valor, utilize da seguinte forma:
 *
 * Lembrando que o valor do volumeFinalEnvase é em Litros (L)
 *
 * @example
 * await setVolumeFinalEnvaseAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', 18);
 *
 * Users -> Producao -> volumeFinalEnvase
 *
 * @param {string} userId
 * @param {string} receitaId
 * @param {number} volumeFinalEnvase Litros (L)
 *
 * @returns {Promise<void>}
 */
async function setVolumeFinalEnvaseAssistente(userId, receitaId, volumeFinalEnvase) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  // pega os dados existentes nessa doc
  const dataSnap = await getDoc(prodRef);

  if (!dataSnap.exists()) {
    console.error(
      `(Assistente): Não existe nenhum Doc no usuário '${userId}' com ID da receita igual a '${receitaId}'`
    );
    return;
  }

  // adiciona um doc com os dados existentes
  await setDoc(prodRef, {
    ...dataSnap.data(),
    volumeFinalEnvase: volumeFinalEnvase,
  });
}

/**
 * @brief Esta função serve para salvar e atualizar no firebase todas as informações de 'Valor medido da FG após a fermentação', 
 * 'Volume de cerveja medido após a fermentação', 'Volume de trub frio' e 'Volume final pra envase' referentes à tabela de 'Medições pós fervura' do 
 * grupo de Assistente de Produção.
 * 
 * Portanto, para salvar todas as informações no firebase, use da seguinte forma:
 * 
 * @example 
 * // Para salvar todos os dados de uma vez
 * await setAllMedicaoPosFervura2Assistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', {
 *      valorFgAposFermentacao: 1.055,
        volumeCervejaAposFermentacao: 9,
        volumeTrubFrio: 2.5,
        volumeFinalEnvase: 18
 * });
 * 
 * @example
 * // Para salvar apenas algumas informações
 * await setAllMedicaoPosFervura2Assistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', {
 *      volumeTrubFrio: 2.5
 * });
 * 
 * Users -> Producao -> {
 *      valorFgAposFermentacao,
        volumeCervejaAposFermentacao,
        volumeTrubFrio,
        volumeFinalEnvase
 * }
 * 
 * @param {string} userId 
 * @param {string} receitaId 
 * @param {MedicaoPosFervura2} medicaoPosFervura2 
 * 
 * @returns {Promise<void>}
 */
async function setAllMedicaoPosFervura2Assistente(userId, receitaId, medicaoPosFervura2) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  // pega os dados existentes nessa doc
  const dataSnap = await getDoc(prodRef);

  if (!dataSnap.exists()) {
    console.error(
      `(Assistente): Não existe nenhum Doc no usuário '${userId}' com ID da receita igual a '${receitaId}'`
    );
    return;
  }

  // adiciona um doc com os dados existentes
  await setDoc(prodRef, {
    ...dataSnap.data(),
    ...medicaoPosFervura2,
  });
}

// -------------------------------------------- Funções Utilitárias -------------------------------------------- //
// ------------------------- Funções definidas para auxiliar em processos nesta tabela ------------------------- //
// --------------------------------------------------------------------------------------------------------------//

// ---------------------------------------------FUNÇÕES DE DEBUG -------------------------------------------- //
// (NÃO UTILIZE ESSAS FUNÇÕES NO FRONT-END, EU NÃO ME RESPONSABILIZO PELOS ERROS MALUCOS QUE PODEM ACONTECER) //
// ---------------------------------------------------------------------------------------------------------- //

/**
 * @brief DEBUG: Deleta todos os campos da tabela de Medicaoes Pre Fervura 2 do firebase.
 *
 * @param {string} userId
 * @param {string} receitaId
 */
async function deleteAllMedicaoPosFervura(userId, receitaId) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  await updateDoc(prodRef, {
    valorFgAposFermentacao: deleteField(),
    volumeCervejaAposFermentacao: deleteField(),
    volumeTrubFrio: deleteField(),
    volumeFinalEnvase: deleteField(),
  });
}

export {
  getMedicaoPosFervura2Assistente,
  setFgAposFermentacaoAssistente,
  setVolumeCervejaAposFermentacaoAssistente,
  setVolumeTrubFrioAssistente,
  setVolumeFinalEnvaseAssistente,
  setAllMedicaoPosFervura2Assistente,
};
