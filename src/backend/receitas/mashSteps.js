import { collection, getDocs } from 'firebase/firestore';
import db from '../../services/firebaseConfig';
import { valueToFloat } from '../valueToFloat';

/**
 * Exemplo de perfil de brassagem:
 * 
 * {
    "MS_INFUSION_TEMP_1": "37,09",
    "MS_RISE_TIME_2": 15,
    "__1": "",
    "MS_RISE_TIME_4": 9,
    "STEP_TEMP_1": "35,00",
    "STEP_TIME_3": 45,
    "MashStep_F_MS_NAME_2": "Proteica",
    "STEP_TEMP_4": "72,00",
    "STEP_TEMP_2": 52,
    "STEP_TIME_4": 30,
    "MashName": "BIAB, Pilsner",
    "MS_INFUSION_TEMP_2": "48,89",
    "STEP_TEMP_3": "63,00",
    "MashStep_F_MS_NAME_5": "Mash Out",
    "MS_RISE_TIME_1": 10,
    "MashStep_F_MS_NAME_3": "Sacarificação (β)",
    "MS_INFUSION_TEMP_3": "48,89",
    "STEP_TIME_5": 10,
    "MashStep_F_MS_NAME_4": "Sacarificação (α)",
    "__3": "",
    "__2": "",
    "STEP_TEMP_5": "78,00",
    "MS_RISE_TIME_5": 6,
    "STEP_TIME_2": 15,
    "MS_INFUSION_TEMP_4": "48,89",
    "STEP_TIME_1": 5,
    "MS_INFUSION_TEMP_5": "48,89",
    "MS_RISE_TIME_3": 11,
    "MashStep_F_MS_NAME_1": "Acidificação"
}
 */

//Função para buscar os perfis de brassagem cadastrados no banco de dados. Retornará um Array contendo objetos de perfil de brassagem
const getMashStepsBD = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'mash_steps'));
    let mashSteps = [];

    querySnapshot.forEach(doc => {
      mashSteps.push(doc.data().mashStep);
    });

    return mashSteps;
  } catch (error) {
    console.error(`Não foi possível buscar os perfis de brassagem no banco de dados: ${error}`);
    throw error;
  }
};

// Função não possui parâmetros de outro módulo da aplicação
const setMashStep = async mashStep => {
  try {
    let perfil = [];

    for (let index = 1; index <= 3; index++) {
      let nomePerfil = mashStep[`MashStep_F_MS_NAME_${index}`];

      let temp = valueToFloat(mashStep[`STEP_TEMP_${index}`]) == 0 ? 0 : valueToFloat(mashStep[`STEP_TEMP_${index}`]);
      let time = valueToFloat(mashStep[`STEP_TIME_${index}`]) == 0 ? 0 : valueToFloat(mashStep[`STEP_TIME_${index}`]);

      perfil.push({ nomePerfil, temp, time });
    }

    console.log(perfil);

    return perfil;
  } catch (error) {
    console.error(`Não foi possível definir o perfil de brassagem: ${error}`);
    throw error;
  }
};

export { getMashStepsBD, setMashStep };
