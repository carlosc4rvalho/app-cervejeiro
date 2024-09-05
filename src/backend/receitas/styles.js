import { addDoc, collection } from 'firebase/firestore';
import db from '../../services/firebaseConfig';
/**
 * Exemplo de parâmetros
 * (75, 81, 20, 22, 24, 29)
 *
 * Estilo é a parte de cima da tabela original do professor
 */

const setStyle = async (eficBrewEqp, eficMashEqp, volEnv, volInFerm, volPosFerv, volPreFerv) => {
  try {
    let brewHouse = {
      eficEstBrew: 0,
      volFinLoteBrew: 0,
    };

    let mash = {
      eficEstMash: 0,
      volFinLoteMash: 0,
    };

    //define mash
    mash.volFinLoteMash = volPreFerv;
    if (eficMashEqp == 0) {
      mash.eficEstMash = (100 * volPosFerv * eficBrewEqp) / volInFerm;
    } else {
      mash.eficEstMash = eficMashEqp;
    }

    //define brewHouse
    brewHouse.volFinLoteBrew = volEnv;
    if (eficBrewEqp == 0) {
      brewHouse.eficEstBrew = (100 * (mash.eficEst * volInFerm)) / volPosFerv;
    } else {
      brewHouse.eficEstBrew = eficBrewEqp;
    }

    console.log('Documento salvo com sucesso:', docRef.id);

    return [brewHouse, mash];
  } catch (error) {
    console.error(`Não foi possível definir o estilo da receita: ${error}`);
    throw error;
  }
};

export default setStyle;
