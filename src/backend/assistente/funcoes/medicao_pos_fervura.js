/**
 * @file Este arquivo exporta a função para captar todos os dados necessários para preencher a primeira tabela de 'Medição Pré Fervura' do Assistente de Produção,
 * assim como também exporta as funções para salvar os valores
 *
 * @typedef {import('../types/medicao_pos_fervura.d.ts').MedicaoPosFervura} MedicaoPosFervura
 *
 * @author Enrico Vivan
 */

import { collection, deleteDoc, deleteField, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import db from '../../../services/firebaseConfig.js';

// ----- Variáveis Globais ----- //

// -------------------- Funções Exportadas -------------------- //

/**
 * @brief Busca no Firebase e retorna todas as informações para preencher a primeira tabela de 'Medições pós fervura' do grupo de Assistente de Produção.
 * Use a função da seguinte forma:
 *
 * @example
 *
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<MedicaoPosFervura>}
 */
async function getMedicaoPosFervura1Assistente(userId, receitaId) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  const dataSnap = await getDoc(prodRef);

  if (!dataSnap.exists()) {
    console.error(`(Assistente): Não existe um Doc no usuário '${userId}', com id da receita '${receitaId}!!'`);
    return {
      valorOgAposFervura: undefined,
      volumeFermentador: undefined,
      volumeMostoAposFervura: undefined,
      volumeTrub: undefined,
    };
  }

  // se não houverem os dados necessários para essa função
  if (!dataSnap.data().valorOgAposFervura) {
    console.warn('(Assistente): Não existe nenhum dado de "valorOgAposFervura" cadastrado no firebase!');
  }

  if (!dataSnap.data().volumeFermentador) {
    console.warn('(Assistente): Não existe nenhum dado de "volumeFermentador" cadastrado no firebase!');
  }

  if (!dataSnap.data().volumeMostoAposFervura) {
    console.warn('(Assistente): Não existe nenhum dado de "volumeMostoAposFervura" cadastrado no firebase!');
  }

  if (!dataSnap.data().volumeTrub) {
    console.warn('(Assistente): Não existe nenhum dado de "volumeTrub" cadastrado no firebase!');
  }

  return {
    valorOgAposFervura: dataSnap.data().valorOgAposFervura ?? undefined,
    volumeFermentador: dataSnap.data().volumeFermentador ?? undefined,
    volumeMostoAposFervura: dataSnap.data().volumeMostoAposFervura ?? undefined,
    volumeTrub: dataSnap.data().volumeTrub ?? undefined,
  };
}

/**
 * @brief Esta função serve para salvar e atualizar no firebase todas as informações de 'Valor medido da OG após a fervura', 
 * 'Volume de mosto medido após a fervura', 'Volume de trub' e 'Volume no fermentador' referentes à tabela de 'Medições pós fervura' do 
 * grupo de Assistente de Produção.
 * 
 * Esta função serve para salvar todas as informações ao mesmo tempo, mas também pode ser utilizada para salvar um informação de cada vez, portanto, utilize da seguinte forma:
 * 
 * @example 
 * // Para salvar todos os dados de uma vez
 * await setAllMedicaoPosFervura1Assistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', {
 *      valorOgAposFervura: 1.055,
        volumeMostoAposFervura: 10,
        volumeTrub: 5.5,
        volumeFermentador: 20
 * });
 * 
 * @example
 * // Para salvar apenas algumas informações
 * await setAllMedicaoPosFervura1Assistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', {
 *      valorOgAposFervura: 1.055,
        volumeMostoAposFervura: 10,
 * });
 * 
 * @param {string} userId 
 * @param {string} receitaId 
 * @param {MedicaoPosFervura} medicaoPosFervura1
 * 
 * @returns {Promise<void>}
 */
async function setAllMedicaoPosFervura1Assistente(userId, receitaId, medicaoPosFervura1) {
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
    ...medicaoPosFervura1,
  });
}

// -------------------------------------------- Funções Utilitárias -------------------------------------------- //
// ------------------------- Funções definidas para auxiliar em processos nesta tabela ------------------------- //
// --------------------------------------------------------------------------------------------------------------//

// ---------------------------------------------FUNÇÕES DE DEBUG -------------------------------------------- //
// (NÃO UTILIZE ESSAS FUNÇÕES NO FRONT-END, EU NÃO ME RESPONSABILIZO PELOS ERROS MALUCOS QUE PODEM ACONTECER) //
// ---------------------------------------------------------------------------------------------------------- //

export { getMedicaoPosFervura1Assistente, setAllMedicaoPosFervura1Assistente };
