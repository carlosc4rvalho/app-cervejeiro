/**
 * @file Este arquivo exporta a função para captar todos os dados necessários para preencher a tabela de Lúpulos do Assistente de Produção
 *
 * @typedef {import("../types/lupulos").Lupulos} Lupulos
 * @typedef {import('../types/lupulos').LupulosFirebase} LupulosFirebase
 * @typedef {import('../types/lupulos').LupuloProducaoFirebase} LupuloProducaoFirebase
 *
 * @author Enrico Vivan
 */

import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import db from '../../../services/firebaseConfig.js';

// ----- Variáveis Globais ----- //

// -------------------- Funções Exportadas -------------------- //

/**
 * @brief Busca no firebase informações relacionados aos Lúpulos utilizados em uma receita específica e retorna um objeto contendo todos os dados necessários para esta tabela (Assistente).
 * Para chamar essa função, utilize da seguinte forma:
 *
 * @example const lupulosAssistente = await getLupuloAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI')
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<Lupulos[]>}
 */
async function getLupuloAssistente(userId, receitaId) {
  const lupulos = await getAllLupulos(userId, receitaId);

  // console.log(lupulos);

  /**@type {Lupulos[]} */
  let data = [];

  lupulos.forEach(item => {
    data.push({
      id: item.id,
      nome: item.name,
      // TODO: Falar para o Gideone que não tem essas propriedades no DB
      tempo: item.tempFervura,
      quantidade: item.qtd,

      adicao: undefined,
    });
  });

  // Pega todos os lupulos cadastrados pelo usuário
  const lupulosCadastrados = await getAllLupulosFromProducao(userId, receitaId);

  // itera a lista e adiciona no id correspondente a adição (se houver)
  data.forEach((item, i) => {
    lupulosCadastrados.forEach((item2, j) => {
      if (item.id == item2.id) {
        data[i].adicao = item2.adicao;
      }
    });
  });

  return data;
}

/**
 * @brief Salva no banco de dados um valor de Adição do tempo de um lúpulo.
 * Para chamar essa função, use da seguinte forma:
 *
 * @example await saveAdicaoLupulo('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', 5)
 *
 * Neste exemplo, a Adição de 5 estaria sendo salva no lúpulo de id 'L90y85ChvnxZ3EqQ8lZI' no assistente de produção em um usuário.
 *
 * Users -> Producao -> Lupulos -> `lupuloId`
 *
 * @param {string} userId
 * @param {string} lupuloId
 * @param {string} receitaId
 * @param {number} adicao
 */
async function saveAdicaoLupulo(userId, receitaId, lupuloId, adicao) {
  const refUserDoc = doc(db, 'users', userId);
  const refProdDoc = doc(refUserDoc, 'producao', receitaId);
  const refLupuloDoc = doc(refProdDoc, 'lupulos', lupuloId);

  try {
    await setDoc(refLupuloDoc, {
      adicao: adicao,
    });
  } catch (e) {
    console.error('(Assistente): Erro ao salvar Adição de um lúpulo no banco de dados');
  } finally {
    console.log('(Assistente): Adição de Lúpulo salva com sucesso no Firebase');
  }
}

// -------------------------------------------- Funções Utilitárias -------------------------------------------- //
// ------------------------- Funções definidas para auxiliar em processos nesta tabela ------------------------- //
// --------------------------------------------------------------------------------------------------------------//

/**
 * @brief Retorna todos os lúpulos do Firebase de uma receita específica de um usuário.
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @return {Promise<LupulosFirebase[]>}
 */

async function getAllLupulos(userId, receitaId) {
  const refUserDoc = doc(db, 'users', userId);
  const refReceitaDoc = doc(refUserDoc, 'receitas', receitaId);
  const refLupulosCol = collection(refReceitaDoc, 'lupulos');

  const dataSnap = await getDocs(refLupulosCol);

  /**@type {LupulosFirebase[]} */
  let data = [];

  dataSnap.forEach(item => {
    data.push({ ...item.data(), id: item.id });
  });

  return data;
}

/**
 * @brief Busca no firebase todos os lúpulos e a adição deles (se houver) e retorna uma array
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @return {Promise<LupuloProducaoFirebase[]>}
 */
async function getAllLupulosFromProducao(userId, receitaId) {
  const refUserDoc = doc(db, 'users', userId);
  const refProdDoc = doc(refUserDoc, 'producao', receitaId);
  const refLupulosCol = collection(refProdDoc, 'lupulos');

  const dataSnap = await getDocs(refLupulosCol);

  /**@type {LupuloProducaoFirebase[]} */
  let data = [];

  dataSnap.forEach(item => {
    data.push({
      id: item.id,
      adicao: item.data().adicao,
    });
  });

  return data;
}

/**
 * @brief Pega um lúpulo específico da collection de Users -> Producao -> Lupulos
 *
 * @param {string} userId
 * @param {string} receitaId
 * @param {string} lupuloId
 *
 * @returns {Promise<LupuloProducaoFirebase>}
 */
async function getOneLupuloFromProducao(userId, receitaId, lupuloId) {
  const refUserDoc = doc(db, 'users', userId);
  const refReceitaDoc = doc(refUserDoc, 'producao', receitaId);
  const refLupuloDoc = doc(refReceitaDoc, 'lupulo', lupuloId);

  const dataSnap = await getDoc(refLupuloDoc);

  /**@type {LupuloProducaoFirebase} */
  let data = {
    id: dataSnap.id,
    adicao: dataSnap.data().adicao,
  };

  return data;
}

// ---------------------------------------------FUNÇÕES DE DEBUG -------------------------------------------- //
// (NÃO UTILIZE ESSAS FUNÇÕES NO FRONT-END, EU NÃO ME RESPONSABILIZO PELOS ERROS MALUCOS QUE PODEM ACONTECER) //
// ---------------------------------------------------------------------------------------------------------- //

/**
 * @brief DEBUG: retorna todos os elementos da coleção User -> Produção
 *
 * @param {string} userId
 * @returns {Promise<any[]>}
 */
async function getAllProducao(userId) {
  const refUserDoc = doc(db, 'users', userId);
  const refProdCol = collection(refUserDoc, 'producao');

  const dataSnap = await getDocs(refProdCol);

  let data = [];

  dataSnap.forEach(item => {
    data.push({ ...item.data(), id: item.id });
  });

  return data;
}

/**
 * @brief DEBUG: remove os docs colocados erroneamente dentro de User -> Produção ao invés de User -> Produção -> Lúpulos
 *
 * @param {string} userId
 */
async function deleteInProducao(userId, idDeletar) {
  const refUserDoc = doc(db, 'users', userId);
  const refProdDoc = doc(refUserDoc, 'producao', idDeletar);

  try {
    await deleteDoc(refProdDoc);
  } catch (e) {
    console.error('(Assistente): Erro ao deletar elemento no firebase: ', e);
  }
}

export { getLupuloAssistente, saveAdicaoLupulo };
