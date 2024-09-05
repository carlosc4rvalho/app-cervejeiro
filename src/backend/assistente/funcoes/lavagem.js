/**
 * @file Esse arquivo exporta a função para buscar todas as informações referentas à tabela 'Lavagem' do assistente de produção.
 *
 * @typedef {import('../types/lavagem.d.ts').Lavagem} Lavagem
 * @typedef {import('../types/receita.d.ts').ReceitaDataFirebase} ReceitaDataFirebase
 * @typedef {import('../types/producao.d.ts').ProducaoFirebase} ProducaoFirebase
 *
 * @author Enrico Vivan
 */

import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import db from '../../../services/firebaseConfig.js';

// ----- Variáveis Globais ----- //

// -------------------- Funções Exportadas -------------------- //

/**
 * @brief Busca no firebase informações relacionados à Lavagem de uma receita específica e retorna um objeto contendo todos os dados necessários para esta tabela (Assistente).
 * Para chamar essa função, utilize da seguinte forma:
 *
 * @example const lavagemAssistente = await getLavagemAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI')
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<Lavagem>}
 */
async function getLavagemAssistente(userId, receitaId) {
  const receita = await getOneReceita(userId, receitaId);
  const tempLavagem = await getTemperaturaLavagem(userId, receitaId);
  const lavarGraosAteMostoSaiAtingir = await getLavarAteMosto(userId, receitaId);

  /**@type {Lavagem} */
  let data = {
    ouAteMostroAtingirOG: receita.ogMash,
    // TODO: ver com grupo de equipamentos
    volumeDeAgua: undefined,
    ouAteVolumeDesejado: undefined,

    // TODO: pegar esses dados meus
    temperatura: tempLavagem ?? 0,
    lavarGraosAteMostroAtingir: lavarGraosAteMostoSaiAtingir ?? 0,
  };

  return data;
}

/**
 * @brief Essa função serve para salvar o parâmetro 'Temperatura da Água de Lavagem' referente à tabela de 'Lavagem' do Assistente de Produção.
 *
 * Para usar esta função para salvar uma temperatura, use da seguinte forma:
 *
 * @example await saveTemperaturaLavagemAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', 76)
 *
 * Lembrando que a temperatura é dada em ºC.
 *
 * Users -> Producao -> {id}
 *
 * @param {string} userId
 * @param {string} receitaId
 * @param {number} temperatura
 */
async function setTemperaturaLavagemAssistente(userId, receitaId, temperatura) {
  const userDoc = doc(db, 'users', userId);
  const prodDoc = doc(userDoc, 'producao', receitaId);

  // verifica se existe algum outro atributo salvo no firebase
  const todosAttr = await getAllAtributesFromProducao(userId, receitaId);

  try {
    await setDoc(prodDoc, {
      ...todosAttr,
      temperaturaLavagem: temperatura,
    });
  } catch (e) {
    console.error("(Assistente): Erro ao salvar a temperatura da tabela 'Lavagem' no firebase.");
    console.error(e);
  }
}

/**
 * @brief Essa função salva o parâmetro 'Lavar os grãos até o mosto que sai dele atingir' da tabela de 'Lavagem' do Assistente de Produção.
 * Caso o valor não seja encontrado, é retornado um valor `null`.
 *
 * Para salvar este parâmetro, utilize a função da seguinte forma:
 *
 * @example await setLavarGraosAteMostoAtingir('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', 1.010)
 *
 * Users -> Producao -> {id}
 *
 * @param {string} userId
 * @param {string} receitaId
 * @param {number} mostoAtingir
 */
async function setLavarGraosAteMostoAtingir(userId, receitaId, mostoAtingir) {
  const userDoc = doc(db, 'users', userId);
  const prodDoc = doc(userDoc, 'producao', receitaId);

  // verifica se existe algum outro atributo salvo no firebase
  const todosAttr = await getAllAtributesFromProducao(userId, receitaId);

  try {
    await setDoc(prodDoc, {
      ...todosAttr,
      mostoSaiAtingir: mostoAtingir,
    });
  } catch (e) {
    console.error(
      "(Assistente): Erro ao salvar parâmetro 'Lavar os grãos até o mosto que sai dele atingir' da tabela 'Lavagem' no firebase."
    );
    console.error(e);
  }
}

// -------------------------------------------- Funções Utilitárias -------------------------------------------- //
// ------------------------- Funções definidas para auxiliar em processos nesta tabela ------------------------- //
// --------------------------------------------------------------------------------------------------------------//

/**
 * @brief Essa função pega o volume de agua da lavagem do equipamento utilizado em uma receita e retorna o valor (equipamentos).
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<number>}
 */
async function getVolumeDeAguaLavagem(userId, receitaId) {}

/**
 * @brief Essa função pega a OG Mash de uma receita específica
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @return {Promise<ReceitaDataFirebase>}
 */
async function getOneReceita(userId, receitaId) {
  const refUserDoc = doc(db, 'users', userId);
  const refReceitaDoc = doc(refUserDoc, 'receitas', receitaId);

  const dataSnap = await getDoc(refReceitaDoc);

  /**@type {ReceitaDataFirebase} */
  let data = dataSnap.data();

  return data;
}

/**
 * @brief Pega a informação de temperatura salva pelo usuário no firebase.
 * Caso essa informação não exista, então retorna o valor `null`.
 *
 * Users -> Producao -> (ReceitaID) -> temperaturaLavagem(att)
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @return {Promise<number | null>}
 */
async function getTemperaturaLavagem(userId, receitaId) {
  const userDoc = doc(db, 'users', userId);
  const receitaDoc = doc(userDoc, 'producao', receitaId);

  const dataSnap = await getDoc(receitaDoc);

  /**@type {number | null} */
  let temp;

  if (!dataSnap.exists()) {
    return null;
  }

  if (!dataSnap.data().temperaturaLavagem) {
    return null;
  }

  temp = dataSnap.data().temperaturaLavagem;

  return temp;
}

/**
 * @brief Essa função busca no Assistente de Produção o valor definido pelo usuário de 'Lavar os grãos até o mosto que sai dele atingir', que está sendo representado pelo atributo 'mostoSaiAtingir'
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<number | null>}
 */
async function getLavarAteMosto(userId, receitaId) {
  const userDoc = doc(db, 'users', userId);
  const receitaDoc = doc(userDoc, 'producao', receitaId);

  const dataSnap = await getDoc(receitaDoc);

  /**@type {number | null} */
  let mosto;

  if (!dataSnap.exists()) {
    return null;
  }

  if (!dataSnap.data().mostoSaiAtingir) {
    return null;
  }

  mosto = dataSnap.data().mostoSaiAtingir;

  return mosto;
}

// ---------------------------------------------FUNÇÕES DE DEBUG -------------------------------------------- //
// (NÃO UTILIZE ESSAS FUNÇÕES NO FRONT-END, EU NÃO ME RESPONSABILIZO PELOS ERROS MALUCOS QUE PODEM ACONTECER) //
// ---------------------------------------------------------------------------------------------------------- //

/**
 * @brief DEBUG: retorna todos os atributos de uma receita do Assistente de Producao (se houver)
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<ProducaoFirebase | null>}
 */
async function getAllAtributesFromProducao(userId, receitaId) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  const dataSnap = await getDoc(prodRef);

  if (!dataSnap.exists()) {
    return null;
  }

  /**@type {ProducaoFirebase} */
  let data = {
    temperaturaLavagem: dataSnap.data().temperaturaLavagem,
    mostoSaiAtingir: dataSnap.data().mostoSaiAtingir,
  };

  return data;
}

export { getLavagemAssistente, setTemperaturaLavagemAssistente, setLavarGraosAteMostoAtingir };
