/**
 * @file Esse arquivo exporta a função para buscar todas as informações referentas à tabela 'Levedura' do assistente de produção.
 *
 * @typedef {import('../types/levedura.js').Levedura} Levedura
 * @typedef {import('../types/levedura.js').YeastsFirebase} YeastsFirebase
 *
 * @author Enrico Vivan
 */

import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import db from '../../../services/firebaseConfig.js';

// ----- Variáveis Globais ----- //

// -------------------- Funções Exportadas -------------------- //

/**
 * @brief Busca no banco de dados as informações suficientes para preencher a tabela "Levedura" do grupo de Assistente de Produção
 * Use da seguinte forma:
 *
 * @example
 * const levedurasAssistente = await getLeveduraAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI');
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<Levedura>}
 */
async function getLeveduraAssistente(userId, receitaId) {
  const yeastsReceita = await getReceitaYeasts(userId, receitaId);

  /**@type {Levedura} */
  let data = {
    nome: `${yeastsReceita[0].name} - ${yeastsReceita[0].ident ?? ''}` ?? undefined,
    // TODO: Falar com o gideone para pegar esse parâmetro
    quantidade: yeastsReceita[0].qtd ?? undefined,

    adicaoCelulas: yeastsReceita[0].numCel ?? undefined,

    // TODO: ver com Gideone essa função
    adicaoPacotes: yeastsReceita[0].leveduraPct ?? undefined,
  };

  return data;
}

// -------------------------------------------- Funções Utilitárias -------------------------------------------- //
// ------------------------- Funções definidas para auxiliar em processos nesta tabela ------------------------- //
// --------------------------------------------------------------------------------------------------------------//

/**
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<YeastsFirebase[]>}
 */
async function getReceitaYeasts(userId, receitaId) {
  const userRef = doc(db, 'users', userId);
  const receitaRef = doc(userRef, 'receitas', receitaId);
  const yeastCol = collection(receitaRef, 'yeasts');

  const dataSnap = await getDocs(yeastCol);

  if (dataSnap.empty) {
    console.warn("(Assistente): Não há nenhum doc na collection 'yeasts'");
    return;
  }

  /**@type {YeastsFirebase[]} */
  let data = [];

  dataSnap.forEach(item => {
    data.push({
      ...item.data(),
    });
  });

  return data;
}

// ---------------------------------------------FUNÇÕES DE DEBUG -------------------------------------------- //
// (NÃO UTILIZE ESSAS FUNÇÕES NO FRONT-END, EU NÃO ME RESPONSABILIZO PELOS ERROS MALUCOS QUE PODEM ACONTECER) //
// ---------------------------------------------------------------------------------------------------------- //

export { getLeveduraAssistente };
