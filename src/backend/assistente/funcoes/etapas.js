/**
 * @file Esse arquivo exporta a função para buscar todas as informações referentas as
 * Etapas do Assistente de Produção.
 *
 * @typedef {import("../types/etapas.js").Etapas} Etapas
 *
 * @author Róbson da Silva Benedito
 */

import { collection, getDocs } from 'firebase/firestore';
import db from '../../../services/firebaseConfig.js';

// ----- Variáveis Globais ----- //

// -------------------- Funções Exportadas -------------------- //

/**
 * @brief Busca todas as Etapas no banco dados e as retorna.
 *
 * @param {string} tipo
 * @returns {Promise<Etapas | undefined>}
 */
export async function getEtapasAssistente(tipo) {
  const fermRef = collection(db, 'ferms');
  const dataSnap = await getDocs(fermRef);

  /**@type {Etapas | undefined} */
  let etapas = undefined;

  let data = [];

  dataSnap.forEach(item => {
    if (item.id == tipo) {
      etapas = {
        tipo: item.id,
        rampas: [],
      };

      for (const [key, value] of Object.entries(item.data().ferm)) {
        if (key.startsWith('temp_')) {
          let rampa = key.split('temp_')[1];

          etapas.rampas.push({ rampa: rampa, temperatura: value });
        }
      }
    }
  });

  return etapas;
}
