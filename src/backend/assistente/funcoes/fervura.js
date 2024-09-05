/**
 * @file Este arquivo exporta a função para captar todos os dados necessários para preencher a tabela de 'Fervura' do Assistente de Produção
 *
 * @typedef {import('../types/fervura.d.ts').Fervura} Fervura
 *
 * @author Enrico Vivan
 */

import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import db from '../../../services/firebaseConfig.js';

// ----- Variáveis Globais ----- //

// -------------------- Funções Exportadas -------------------- //

/**
 * @brief Essa função busca no banco de dados e retorna todas as informações necessárias para preencher a tabela 'Fervura' do grupo Assistente de Produção.
 * Use a função da seguinte forma:
 *
 * @example
 * const fervuraAssistente = await getFervuraAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI');
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<Fervura[]>}
 */
async function getFervuraAssistente(userId, receitaId) {
  const userRef = doc(db, 'users', userId);
  const receitaRef = doc(userRef, 'receitas', receitaId);
  const lupuloRef = collection(receitaRef, 'lupulos');

  const dataSnap = await getDocs(lupuloRef);

  /**@type {Fervura[]} */
  let data = [];

  if (dataSnap.empty) {
    console.error('(Assistente): Não há nenhum lúpulo cadastrado na receita!');
    return;
  }

  dataSnap.forEach(item => {
    data.push({
      momento: calculaMomentoFervura(item.data().tempoFerv) ?? undefined,
      tempo: `${item.data().tempoFerv} min` ?? undefined,
      quantidade: `${item.data().qtd} g` ?? undefined,
      nome: item.data().name ?? undefined,
    });
  });

  return data;
}

// -------------------------------------------- Funções Utilitárias -------------------------------------------- //
// ------------------------- Funções definidas para auxiliar em processos nesta tabela ------------------------- //
// --------------------------------------------------------------------------------------------------------------//

/**
 *
 * @param {number} tempoFervura
 *
 * @returns {string}
 */
function calculaMomentoFervura(tempoFervura) {
  if (!tempoFervura) {
    console.error('(Assistente): O valor de "tempoFervura" passado é inválido!');
    return '(Fervura)';
  }

  if (tempoFervura >= 40) {
    return 'Início da fervura';
  } else if (tempoFervura >= 20 && tempoFervura <= 39) {
    return 'Meio da fervura';
  } else if (tempoFervura > 0 && tempoFervura < 20) {
    return 'Fim da fervura';
  } else {
    return 'Chama desligada';
  }
}

// ---------------------------------------------FUNÇÕES DE DEBUG -------------------------------------------- //
// (NÃO UTILIZE ESSAS FUNÇÕES NO FRONT-END, EU NÃO ME RESPONSABILIZO PELOS ERROS MALUCOS QUE PODEM ACONTECER) //
// ---------------------------------------------------------------------------------------------------------- //

export { getFervuraAssistente };
