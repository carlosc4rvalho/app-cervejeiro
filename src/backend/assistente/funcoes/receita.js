/**
 * @file Este arquivo exporta a função para pegar os dados referentes à tabela Receita, do Assistente de Produção.
 * @author Enrico Vivan
 *
 * @typedef {import('../types/receita.d.ts').Receita} Receita
 * @typedef {import('../types/user.d.ts').UserFirebaseData} UserFirebaseData
 * @typedef {import('../types/receita.d.ts').ReceitaDataFirebase} ReceitaDataFirebase
 * @typedef {import('../types/style.d.ts').StyleReceita} StyleReceita
 */

import db from '../../../services/firebaseConfig.js';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

// ----- Variáveis Globais ----- //

// -------------------- Funções Exportadas -------------------- //

/**
 * @brief Busca no firebase informações relacionados à Receita e retorna um objeto contendo todos os dados necessários para esta tabela.
 * Para chamar essa função, utilize da seguinte forma:
 *
 * @example const dadosReceita = await getReceitaAssistente('bqVYbx4myMksfcCbsJsQ', 'L90y85ChvnxZ3EqQ8lZI')
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<Receita>}
 */
async function getReceitaAssistente(userId, receitaId) {
  // pega todas as receitas do user
  // getAllReceitas(userId).then(i => {
  //     console.log(i)
  // })

  /**@type {Receita} */
  let dadosReceita;

  // Dados vindo de users -> receitas
  await getReceitaAttr(userId, receitaId).then(i => {
    dadosReceita = {
      nome: i.name,
    };
  });

  // Pega todos os estilos existentes dentro de uma receita de um user
  // Dados vindo de users -> receitas -> styles -> style
  await getAllStylesReceita(userId, receitaId).then(i => {
    // console.dir(i , {depth: null})
    dadosReceita = {
      ...dadosReceita,
      // TODO: Ver com o gideone para ele salvar o nome do estilo
      estilo: '',
      eficiencia_mash: i[0].data.style[1].eficEstMash,
      eficiencia_brewhouse: i[0].data.style[0].eficEstBrew,
      // TODO: Ver com o grupo de equipamentos onde esses valores estarão salvo no firebase
      volume_total_agua: 0,
      volume_agua_lavagem: 0,
      volume_agua_mash: 0,
    };
  });

  return dadosReceita;
}

// -------------------------------------------- Funções Utilitárias -------------------------------------------- //
// ------------------------- Funções definidas para auxiliar em processos nesta tabela ------------------------- //
// --------------------------------------------------------------------------------------------------------------//

/**
 * @brief Pega todos os atributos de uma Receita dentro de um usuário específico
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<ReceitaDataFirebase>}
 */
async function getReceitaAttr(userId, receitaId) {
  // pega o doc do user especifico
  const refUserDoc = doc(db, 'users', userId);
  // pega o doc específico da subcollection das receitas do usuário
  const refReceitaDoc = doc(refUserDoc, 'receitas', receitaId);
  const receitaSnapshot = await getDoc(refReceitaDoc);

  /**
   * @type {ReceitaDataFirebase}
   */
  let receitaData;

  if (!receitaSnapshot.exists()) {
    console.error(`Receita com id '${receitaId}' ou usuário com id '${userId}' não existem no firebase!!`);
    return;
  }

  receitaData = {
    ...receitaSnapshot.data(),
  };

  return receitaData;
}

/**
 * @brief Recebe um userId como parâmetro e retorna as collections e dados do usuário, se ele existir.
 *
 * @param {string} userId
 *
 * @returns {Promise<UserFirebaseData>}
 */
async function getUserById(userId) {
  const userDocRef = doc(db, 'users', userId);
  const dataSnapshot = await getDoc(userDocRef);

  if (!dataSnapshot.exists()) {
    console.error(`Erro (Assistente): O usuário com id '${userId}' não existe no firebase!!`);
    return;
  }

  return {
    id: dataSnapshot.id,
    data: dataSnapshot.data(),
  };
}

/**
 * @brief Retorna o array de propriedades de um estilo de uma receita de um user
 *
 * @param {string} userId
 * @param {string} receitaId
 * @param {string} estiloId
 *
 * @return {Promise<StyleReceita>}
 */
async function getStyleFromReceita(userId, receitaId, estiloId) {
  const refUserDoc = doc(db, 'users', userId);
  const refReceitaDoc = doc(refUserDoc, 'receitas', receitaId);
  const refStyleDoc = doc(refReceitaDoc, 'styles', estiloId);
  const docSnap = await getDoc(refStyleDoc);

  /**@type {StyleReceita} */
  let data;

  data = {
    eficEstBrew: docSnap.data().style[0].eficEstBrew,
    eficEstMash: docSnap.data().style[1].eficEstMash,
    volFinLoteBrew: docSnap.data().style[0].volFinLoteBrew,
    volFinLoteMash: docSnap.data().style[1].volFinLoteMash,
  };

  return data;
}

// ---------------------------------------------FUNÇÕES DE DEBUG -------------------------------------------- //
// (NÃO UTILIZE ESSAS FUNÇÕES NO FRONT-END, EU NÃO ME RESPONSABILIZO PELOS ERROS MALUCOS QUE PODEM ACONTECER) //
// ---------------------------------------------------------------------------------------------------------- //

/**
 * @brief Função de DEBUG, pega todos os usuários salvos no Firebase e seus respectivos IDs.
 *
 * @return {Promise<UserFirebaseData[]>}
 */
async function getAllUsers() {
  const colUserRef = collection(db, 'users');

  /**
   * @type {UserFirebaseData[]}
   */
  let users = [];

  const dataSnapshot = await getDocs(colUserRef);
  dataSnapshot.forEach(doc =>
    users.push({
      id: doc.id,
      data: doc.data(),
    })
  );

  return users;
}

/**
 * @brief Função de DEBUG, retorna todas as receitas de um usuário
 *
 * @param {string} userId
 *
 * @returns {Promise<UserFirebaseData>}
 */
async function getAllReceitas(userId) {
  const refUserCol = doc(db, 'users', userId);
  const refReceitaCol = collection(refUserCol, 'receitas');

  const querySnapshot = await getDocs(refReceitaCol);

  /**@type {UserFirebaseData[]} */
  let receitas = [];

  querySnapshot.forEach(doc => {
    receitas.push({
      id: doc.id,
      data: doc.data(),
    });
  });

  return receitas;
}

/**
 * @brief Função de DEBUG, pega todos os styles (estilos) de uma receita de um user.
 *
 * @param {string} userId
 * @param {string} receitaId
 *
 * @returns {Promise<UserFirebaseData[]>}
 */
async function getAllStylesReceita(userId, receitaId) {
  const refUserDoc = doc(db, 'users', userId);
  const refReceitaDoc = doc(refUserDoc, 'receitas', receitaId);
  const refStyleCol = collection(refReceitaDoc, 'styles');
  const estilosSnapshot = await getDocs(refStyleCol);

  /**@type {UserFirebaseData[]} */
  let data = [];

  if (estilosSnapshot.empty) {
    console.warn('Não há docs em Styles :(');
    return;
  }

  estilosSnapshot.forEach(i => {
    data.push({
      id: i.id,
      data: i.data(),
    });
  });

  return data;
}

export { getReceitaAssistente };
