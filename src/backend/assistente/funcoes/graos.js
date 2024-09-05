/**
 * @file Este arquivo exporta a função para capturar os dados referentes aos grãos utilizados na receita de um usuário específico
 *
 * @typedef {import('../types/graos').Graos} Graos
 * @typedef {import('../types/graos').GraosFirebase} GraosFirebase
 * @typedef {import('../types/graos').GraosResult} GraosResult
 *
 * @author Enrico Vivan
 */

import { collection, doc, getDocs } from 'firebase/firestore';
import db from '../../../services/firebaseConfig.js';

// ----- Variáveis Globais ----- //

// -------------------- Funções Exportadas -------------------- //

/**
 * @brief Busca no firebase informações relacionados aos grãos utilizados em uma receita específica e retorna um objeto contendo todos os dados necessários para esta tabela (Assistente).
 * Para chamar essa função, utilize da seguinte forma:
 *
 * @example const graosAssistente = await getGraosAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI')
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<Graos>}
 */
async function getGraosAssistente(userId, receitaId) {
  const graos = await getMaltesReceita(userId, receitaId);

  /**@type {Graos} */
  let data = [];

  /**@type {GraosResult[]} */
  let allGraos = [];

  graos.forEach(i => {
    allGraos.push({
      nome: i.name,
      // TODO: ver com o gideone se esse é o peso mesmo
      quantidade: i.weight,
    });
  });

  data.graos = allGraos;

  const sumPesoTotal = () => {
    const quantidades = data.graos.reduce((n1, n2) => {
      return n1.quantidade + n2.quantidade;
    });

    return quantidades.quantidade;
  };

  data = {
    ...data,
    pesoTotal: sumPesoTotal(),
  };

  return data;
}

// -------------------------------------------- Funções Utilitárias -------------------------------------------- //
// ------------------------- Funções definidas para auxiliar em processos nesta tabela ------------------------- //
// --------------------------------------------------------------------------------------------------------------//

/**
 * @brief Pega todos os maltes usados na receita.
 *
 * @returns {Promise<GraosFirebase[]>}
 */
async function getMaltesReceita(userId, receitaId) {
  const refUserDoc = doc(db, 'users', userId);
  const refReceitaDoc = doc(refUserDoc, 'receitas', receitaId);
  const refMaltesDoc = collection(refReceitaDoc, 'maltes');

  const dataSnap = await getDocs(refMaltesDoc);

  /**@type {GraosFirebase[]} */
  let data = [];

  dataSnap.forEach(i => {
    data.push({ ...i.data() });
  });

  return data;
}

// ---------------------------------------------FUNÇÕES DE DEBUG -------------------------------------------- //
// (NÃO UTILIZE ESSAS FUNÇÕES NO FRONT-END, EU NÃO ME RESPONSABILIZO PELOS ERROS MALUCOS QUE PODEM ACONTECER) //
// ---------------------------------------------------------------------------------------------------------- //

export { getGraosAssistente };
