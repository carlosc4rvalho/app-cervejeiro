import { doc, setDoc } from 'firebase/firestore';
import db from '../../services/firebaseConfig';

/**ESSA FUNÇÃO PRECISARÁ SER REALIZADA NO FRONT
 *
 * ppgTotal: resultado do ppg do malte
 * volPreFerv: valor do volume antes da fervura que vem do módulo de equipamentos
 * volInFerv: valor do volume no fermentador que vem do módulo de equipamentos
 * aguaMash: valor da água do mash que vem do módulo de equipamentos
 * aguaLav: valor da água da lavagem que vem do módulo de equipamentos
 * volPosResf: Volume pós resfriamento, (valor encontrado no módulo de equipamento)
 */

const estimaReceita = async (
  maltesRec,
  volPosResf,
  ppgTotal,
  eficEstMash,
  eficEstBrew,
  volPreFerv,
  volInFerv,
  atenMaxLev,
  ibuTotal,
  co2des,
  aguaMash,
  aguaLav
) => {
  let ogMash, ogFerm, fgEstim, buGu, abvEstim, carbon, volAguaMash, volAguaLav;

  const defineColor = (maltesRec = []) => {
    const params = [];
    let sumParams = 0;

    maltesRec.map(malte => {
      const param = malte.weight * malte.color;
      params.push(param);
    });

    params.map(param => {
      sumParams = sumParams + param;
    });

    const color = 1.4992 * (((2.20462 * sumParams) / Math.pow(0.264172 * volPosResf, 0.6859)) * 1, 97);
    return color;
  };

  try {
    ogMash = (ppgTotal * eficEstMash) / (1000 * volPreFerv * 0.264182) + 1;
    ogFerm = (ppgTotal * eficEstBrew) / (1000 * volInFerv * 0.264182) + 1;
    fgEstim = (ogFerm - 1) * (1 - atenMaxLev);
    buGu = (ibuTotal / (ogFerm - 1)) * 1000;
    abvEstim = ((76.08 * (ogFerm - fgEstim)) / (1.775 - ogFerm)) * (ogFerm / 0.794);

    const color = defineColor(maltesRec);
    carbon = co2des;
    volAguaMash = aguaMash;
    volAguaLav = aguaLav;

    console.log({ ogMash, ogFerm, fgEstim, ibuTotal, buGu, abvEstim, carbon, volAguaMash, volAguaLav, color });

    return { ogMash, ogFerm, fgEstim, ibuTotal, buGu, abvEstim, carbon, volAguaMash, volAguaLav, color };
  } catch (error) {
    console.error(`Não foi possível estimar essa receita: ${error}`);
    throw error;
  }
};

const paramsStyle = () => {};

export default { estimaReceita, paramsStyle };
