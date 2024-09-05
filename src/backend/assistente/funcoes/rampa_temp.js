/**
 * @file Esse arquivo exporta a função para buscar todas as informações referentas às Rampas de Temperatura do Assistente de Produção.
 *
 * @typedef {import('../types/rampa_temp.d.ts').RampaTemp} RampaTemp
 * @typedef {import('../types/rampa_temp.d.ts').BrassagemFirebase} BrassagemFirebase
 * @typedef {import('../types/rampa_temp.d.ts').MashStepsFirebase} MashStepsFirebase
 * @typedef {import('../types/rampa_temp.d.ts').Rampa} Rampa
 *
 * @author Enrico Vivan
 */

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import db from '../../../services/firebaseConfig.js';

// ----- Variáveis Globais ----- //

// -------------------- Funções Exportadas -------------------- //

/**
 * @brief Busca no firebase informações relacionados à tabela de "Rampas de Temperatura" do Assistente de Produção, usando
 * como parâmetro o id do usuário, e o id da receita.
 *
 * Use da seguinte forma:
 *
 * @example const rampasAssistente = await getRampasDeTemperaturaAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI')
 *
 * Users -> Receitas -> MashSteps
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<RampaTemp[]>}
 */
async function getRampasDeTemperaturaAssistente(userId, receitaId) {
  /**@type {RampaTemp[]} */
  let data = [];

  const debug = await getAllBrassagem(userId, receitaId);

  // console.dir(debug, {depth: 99})

  debug.forEach((item, i) => {
    item.perfil.forEach((item, j) => {
      data.push({
        etapa: j + 1,
        rampa: item.nomePerfil,
        temperatura: item.temp,
        tempo: Number(item.time),
        tempInicialAgua: 0, // TODO: Perguntar para o Gideone sobre o processo de capturar o 'Tipo | Rampa'
      });
    });
  });

  for (let i = 0; i < data.length; i++)
    [
      // TODO: mudar 'Decocção Tripla' por: debug[i].mashStep depois de ver com Gideone
      (data[i].tempInicialAgua = await getTipoRampaBrassagem('Decocção  Tripla', data[i].rampa)),
    ];

  return data;
}

// -------------------------------------------- Funções Utilitárias -------------------------------------------- //
// ------------------------- Funções definidas para auxiliar em processos nesta tabela ------------------------- //
// --------------------------------------------------------------------------------------------------------------//

/**
 * @brief Busca no firebase e retorna o parâmetro 'tempInicialAgua' de uma rampa de tamperatura segundo a tabela "Rampas de Temperatura".
 *
 * O parâmetro 'nomePerfil' recebe o nome do 'Tipo | Rampa' que foi selecionado pelo usuário no 'Perfil da Brassagem'.
 *
 * O parâmetro 'rampa' recebe o tipo da rampa, se é Acidificação, Proteica, etc.
 *
 * @param {string} nomePerfil
 * @param {Rampa} rampa
 *
 * @return {Promise<number>}
 */
async function getTipoRampaBrassagem(nomePerfil, rampa) {
  const refMashstepDoc = doc(db, 'mash_steps', nomePerfil);

  const dataSnap = await getDoc(refMashstepDoc);

  /**@type {MashStepsFirebase} */
  let data = dataSnap.data().mash;

  // console.log(rampa)

  switch (rampa) {
    case 'Acidificação':
      if (
        data.MS_INFUSION_TEMP_1 == '' ||
        data.MS_INFUSION_TEMP_1 == null ||
        data.MS_INFUSION_TEMP_1 == undefined ||
        data.MS_INFUSION_TEMP_1 == 0 ||
        !data.MS_INFUSION_TEMP_1
      ) {
        return 0;
      }
      return Number.parseInt(data.MS_INFUSION_TEMP_1);

    case 'Proteica':
      if (
        data.MS_INFUSION_TEMP_2 == '' ||
        data.MS_INFUSION_TEMP_2 == null ||
        data.MS_INFUSION_TEMP_2 == undefined ||
        data.MS_INFUSION_TEMP_2 == 0 ||
        !data.MS_INFUSION_TEMP_2
      ) {
        return 0;
      }
      return Number.parseInt(data.MS_INFUSION_TEMP_2);

    case 'Sacarificação (β)':
      if (
        data.MS_INFUSION_TEMP_3 == '' ||
        data.MS_INFUSION_TEMP_3 == null ||
        data.MS_INFUSION_TEMP_3 == undefined ||
        data.MS_INFUSION_TEMP_3 == 0 ||
        !data.MS_INFUSION_TEMP_3
      ) {
        return 0;
      }
      return Number.parseInt(data.MS_INFUSION_TEMP_3);

    case 'Sacarificação (α)':
      if (
        data.MS_INFUSION_TEMP_4 == '' ||
        data.MS_INFUSION_TEMP_4 == null ||
        data.MS_INFUSION_TEMP_4 == undefined ||
        data.MS_INFUSION_TEMP_4 == 0 ||
        !data.MS_INFUSION_TEMP_4
      ) {
        return 0;
      }
      return Number.parseInt(data.MS_INFUSION_TEMP_4);

    case 'Mash Out':
      if (
        data.MS_INFUSION_TEMP_5 == '' ||
        data.MS_INFUSION_TEMP_5 == null ||
        data.MS_INFUSION_TEMP_5 == undefined ||
        data.MS_INFUSION_TEMP_5 == 0 ||
        !data.MS_INFUSION_TEMP_5
      ) {
        return 0;
      }
      return Number.parseInt(data.MS_INFUSION_TEMP_5);

    default:
      console.error("(Assistente 'rampa_temp.js'): Rampa não existente");
      return;
  }
}

// ---------------------------------------------FUNÇÕES DE DEBUG -------------------------------------------- //
// (NÃO UTILIZE ESSAS FUNÇÕES NO FRONT-END, EU NÃO ME RESPONSABILIZO PELOS ERROS MALUCOS QUE PODEM ACONTECER) //
// ---------------------------------------------------------------------------------------------------------- //

/**
 * @brief DEBUG: Retorna todas as informações do perfil de brassagem de uma receita do firebase.
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * Tabela Users -> Receita -> MashSteps
 *
 * @return {Promise<BrassagemFirebase[]>}
 */
async function getAllBrassagem(userId, receitaId) {
  const userRefDoc = doc(db, 'users', userId);
  const receitaRefDoc = doc(userRefDoc, 'receitas', receitaId);
  const brassagemRefCol = collection(receitaRefDoc, 'mashSteps');

  const dataSnap = await getDocs(brassagemRefCol);

  /**@type {BrassagemFirebase[]} */
  let data = [];

  dataSnap.forEach(item => {
    data.push({
      id: item.id,
      perfil: item.data().perfil,
    });
  });

  return data;
}

export { getRampasDeTemperaturaAssistente };
