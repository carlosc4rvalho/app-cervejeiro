/**
 * @file Este arquivo exporta a função para captar todos os dados necessários para preencher a tabela de 'Dados mensurados na brassagem' do Assistente de Produção
 *
 * @typedef {import('../types/dados_mensurados_brassagem.d.ts').DadosMensuradosBrassagem} DadosMensuradosBrassagem
 *
 * @author Enrico Vivan
 */

import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import db from '../../../services/firebaseConfig.js';
import { getMedicaoPreFervuraAssistente } from './medicao_pre_fervura.js';
import { getMedicaoPosFervura1Assistente } from './medicao_pos_fervura.js';

// ----- Variáveis Globais ----- //

// -------------------- Funções Exportadas -------------------- //

/**
 * @brief Busca no firebase e retorna as informações para preencher a tabela "Dados mensurados na brassagem" do grupo Assistente de Produção.
 * Utilize da seguinte forma:
 *
 * @example
 * const dadosBrassagemAssistente = await getDadosMensuradosBrassagemAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI');
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<DadosMensuradosBrassagem>}
 */
async function getDadosMensuradosBrassagemAssistente(userId, receitaId) {
  const preFervuraData = await getMedicaoPreFervuraAssistente(userId, receitaId);
  const posFervura1Data = await getMedicaoPosFervura1Assistente(userId, receitaId);

  // pega o valor de ppgTotal de Receitas
  const receitaMaltesData = await getReceitaMaltesPggTotal(userId, receitaId);

  // pega o valor do tempo apos fervura ate 82
  const tempo82 = await getTempoAposFervura82(userId, receitaId);

  // console.warn(preFervuraData)
  // console.warn(tempo82)
  // console.warn(posFervura1Data)
  // console.warn(receitaMaltesData)

  /**@type {DadosMensuradosBrassagem} */
  let data = {
    gravidadeOriginalPreFervura: preFervuraData.ogAntesFervura ?? undefined,
    gravidadeOriginalPosFervura: posFervura1Data.valorOgAposFervura ?? undefined,

    // TODO: ver com o grupo de equipamentos para pegar o 'Volume antes da fervura'
    volumePreFervura: !preFervuraData.mostoAntesFervura ? undefined : (preFervuraData.mostoAntesFervura ?? undefined),
    trubQuente: !posFervura1Data.volumeTrub ? undefined : (posFervura1Data.volumeTrub ?? undefined),

    // pegar esse dado que eu vou salvar
    tempoAposFervuraAte82: tempo82,

    // dados que serão adicionados em seguida
    volumePosFervura: undefined,
    volumeFermentador: undefined,
    eficienciaMashMedida: undefined,
    eficienciaBrewhouseMedida: undefined,
  };

  data = {
    ...data,
    volumePosFervura: !posFervura1Data.volumeMostoAposFervura
      ? ((data.gravidadeOriginalPreFervura - 1) * data.volumePreFervura) / data.gravidadeOriginalPosFervura
      : ('Volume de mosto medido após a fervura' ?? undefined),
  };

  data = {
    ...data,
    volumeFermentador: !data.volumePosFervura
      ? 0
      : !posFervura1Data.volumeFermentador
        ? data.volumePosFervura - data.trubQuente
        : (posFervura1Data.volumeFermentador ?? undefined),
  };

  return {
    ...data,

    eficienciaMashMedida:
      (1000 * 100 * (data.gravidadeOriginalPreFervura - 1) * (data.volumePreFervura * 0.264172)) / receitaMaltesData ??
      undefined,
    eficienciaBrewhouseMedida:
      (100 * 1000 * ((data.gravidadeOriginalPosFervura - 1) * (data.volumeFermentador * 0.264172))) /
        receitaMaltesData ?? undefined,
  };
}

/**
 * @brief Essa função salva no Firebase de um usuário o valor de 'Tempo após fervura até 82ºC' do grupo de assistente de produção.
 *
 * Esta função cria um novo valor caso este ainda não exista, e substitui o valor caso ela já exista.
 *
 * Use da seguinte forma (Lembrando que o valor de 'tempo' deve ser em minutos (min)):
 *
 * @example
 * await setTempoAposFervuraAte82('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI', 5);
 *
 * @param {string} userId
 * @param {string} receitaId
 * @param {number} tempo Minutos (m)
 *
 * @returns {Promise<void>}
 */
async function setTempoAposFervuraAte82(userId, receitaId, tempo) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  const dataSnap = await getDoc(prodRef);

  await setDoc(prodRef, {
    ...dataSnap.data(),
    tempoAposFervuraAte82: tempo,
  });
}

// -------------------------------------------- Funções Utilitárias -------------------------------------------- //
// ------------------------- Funções definidas para auxiliar em processos nesta tabela ------------------------- //
// --------------------------------------------------------------------------------------------------------------//

/**
 * @brief Busca na tabela de Receitas, na colection Maltes os valores das PPG de cada malte, e retorna uma soma de todos os maltes
 *
 * @param {string} userId
 * @param {string} receitaid
 *
 * @returns {Promise<number>}
 */
async function getReceitaMaltesPggTotal(userId, receitaId) {
  const userRef = doc(db, 'users', userId);
  const receitaRef = doc(userRef, 'receitas', receitaId);
  const maltesRef = collection(receitaRef, 'maltes');

  const dataSnap = await getDocs(maltesRef);

  if (dataSnap.empty) {
    console.warn('(Assistente): Não há maltes salvos no Firebase para esse usuário.');
    return;
  }

  /**@type {number} */
  let soma = 0;

  dataSnap.forEach(item => {
    soma += Number(item.data().ppg);
  });

  return soma;
}

/**
 * @brief Retorna o dado de 'Tempo após fervura até 82ºC' presente no Firebase (se houver)
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<number>}
 */
async function getTempoAposFervura82(userId, receitaId) {
  const userRef = doc(db, 'users', userId);
  const prodRef = doc(userRef, 'producao', receitaId);

  const dataSnap = await getDoc(prodRef);

  if (!dataSnap.exists()) {
    console.error('(Assistente): Esta coleção não existe!');
    return 0;
  }

  if (!dataSnap.data().tempoAposFervuraAte82) {
    console.warn("(Assistente): Não há nehum dado de 'tempoAposFervuraAte82' cadastrado no Firebase!");
    return 0;
  }

  return dataSnap.data().tempoAposFervuraAte82;
}

// ---------------------------------------------FUNÇÕES DE DEBUG -------------------------------------------- //
// (NÃO UTILIZE ESSAS FUNÇÕES NO FRONT-END, EU NÃO ME RESPONSABILIZO PELOS ERROS MALUCOS QUE PODEM ACONTECER) //
// ---------------------------------------------------------------------------------------------------------- //

export { getDadosMensuradosBrassagemAssistente, setTempoAposFervuraAte82 };
