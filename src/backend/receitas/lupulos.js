import { collection, getDocs } from 'firebase/firestore';
import db from '../../services/firebaseConfig';
import { valueToFloat } from '../valueToFloat';

/**
 * Exemplo de objeto lupulo
 * {
    "TYPE": 0,
    "ORDER": 0,
    "ALPHA": "14,75",
    "NAME": "Admiral",
    "PRICE": 1,
    "NOTES": "Bittering hops derived from Wye Challenger.  Good high-alpha bittering hops.\nUsed for: Ales\nAroma: Primarily for bittering\nSubstitutes: Target, Northdown, Challenger",
    "ORIGIN": "United Kingdom",
    "RECIPE": 0,
    "BETA": "5,6",
    "FORM": 0,
    "AMOUNT": 0,
    "HSI": 15,
    "PERCENT": 0,
    "USE": 0,
    "INVENTORY": 0,
    "CONTRIB": 0,
    "TIME": 3
}
 */

/** Função para buscar lupulos no banco de dados, retornará um Array contendo objetos de todos os lupulos do banco de dados */
const getLupulosBD = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'lupulos'));
    let lupulos = [];

    querySnapshot.forEach(doc => {
      lupulos.push(doc.data().lupulo);
    });

    return lupulos;
  } catch (error) {
    console.error(`Não foi possível buscar os lupulos no banco de dados: ${error}`);
    throw error;
  }
};

/**
 * Há parâmetros de outro módulo da aplicação
 * O parâmentro volPosRefre se refere ao volume pós resfriamento encontrado no módulo de equipamentos
 * O parâmetro tempoMosto se refere ao tempo do mosto atingir uma determinada temperatura em minutos (ºC) encontrada no módulo de equipamentos.
 * O parâmetro areaAberPanela se refere a Área aberta da panela econtrado no módulo de equipamentos
 * O parâmetro volPosFerv se refere ao volume após fervura encontrado no módulo de equipamentos
 */

const setLupulo = async (type, lupulo, qtd, tempoFerv, ogMash, volPosResfr, tempoMosto, areaAberPanela, volPosFerv) => {
  const alpha = valueToFloat(lupulo.ALPHA);

  const IBUresf = (Tempofervuramin, Temporesfrimin, BG, Areaab, Vposferv, AAcido, Qtgramas, Volposresf) => {
    const tempoIntegracao = 0.01;
    let TaxaAAdecimal = 0;
    let t = Tempofervuramin;

    while (t < Tempofervuramin + Temporesfrimin) {
      const dU = -1.65 * Math.pow(0.000125, BG - 1) * -0.04 * (Math.exp(-0.04 * t) / 4.15);
      const FatorDecaiExpTemp = 0.0002925 * (Areaab / Vposferv) + 0.00538;
      const temp_C = 53.7 * Math.exp(-1 * (FatorDecaiExpTemp * (t - Tempofervuramin))) + 46.4;
      const temp_K = temp_C + 273.15;
      const grauUtilizacao = 2.39 * Math.pow(10, 11) * Math.exp(-9773 / temp_K);
      const Valorcomb = dU * grauUtilizacao;
      TaxaAAdecimal += Valorcomb * tempoIntegracao;

      t += tempoIntegracao;
    }

    return (TaxaAAdecimal * AAcido * Qtgramas * 10) / Volposresf;
  };

  try {
    let name, ibuFerv, resfr, ibu;

    name = lupulo.NAME;

    // Define IBU Fervura
    switch (type) {
      case 'flor':
        //(((1,65*0,000125^($C$70-1)) * ((1-2,71828^(-0,04*E19))/4,15))*(F19/100)*D19*1000)/(Equipamento!D$33)*0,8
        ibuFerv =
          ((1.65 *
            Math.pow(0.000125, ogMash - 1) *
            ((1 - Math.exp(-0.04 * tempoFerv)) / 4.15) *
            (alpha / 100) *
            qtd *
            1000) /
            volPosResfr) *
          0.8;
        break;

      case 'pellet':
        //((((1,65*0,000125^($C$70-1))*((1-2,71828^(-0,04*E19))/4,15))*1)*(F19/100)*D19*1000)/(Equipamento!D$33))
        ibuFerv =
          (1.65 *
            Math.pow(0.000125, ogMash - 1) *
            ((1 - Math.exp(-0.04 * tempoFerv)) / 4.15) *
            (alpha / 100) *
            qtd *
            1000) /
          volPosResfr;
        break;

      default:
        console.error('O tipo definido não é válido');
        throw new Error('O tipo definido não é válido');
    }

    switch (type) {
      case 'flor':
        // Parâmetros: tempo fervura, tempo do mosto atingir, OG Mash, área aberta da panela, volume após fervura, alfa ácido, quantidade(g), volume após resfriamento,
        resfr = IBUresf(tempoFerv, tempoMosto, ogMash, areaAberPanela, volPosFerv, alpha, qtd, volPosResfr) * 0.4;
        break;

      case 'pellet':
        resfr = IBUresf(tempoFerv, tempoMosto, ogMash, areaAberPanela, volPosFerv, alpha, qtd, volPosResfr);
        break;

      default:
        console.error('O tipo definido não é válido');
        throw new Error('O tipo definido não é válido');
    }

    ibu = ibuFerv + resfr;

    console.log({ name, alpha, ibuFerv, qtd, tempoFerv, resfr, ibu });

    return { name, alpha, ibuFerv, qtd, tempoFerv, resfr, ibu };
  } catch (error) {
    console.error(`Não foi possível definir esse lupulo: ${error}`);
    throw error;
  }
};

export { getLupulosBD, setLupulo };

/**
 * Parâmetros para teste:
 * 
  (bqVYbx4myMksfcCbsJsQ,
  L90y85ChvnxZ3EqQ8lZI,
  "flor", {
        "TYPE": 0,
        "ORDER": 0,
        "ALPHA": "14,75",
        "NAME": "Admiral",
        "PRICE": 1,
        "NOTES": "Bittering hops derived from Wye Challenger.  Good high-alpha bittering hops.\nUsed for: Ales\nAroma: Primarily for bittering\nSubstitutes: Target, Northdown, Challenger",
        "ORIGIN": "United Kingdom",
        "RECIPE": 0,
        "BETA": "5,6",
        "FORM": 0,
        "AMOUNT": 0,
        "HSI": 15,
        "PERCENT": 0,
        "USE": 0,
        "INVENTORY": 0,
        "CONTRIB": 0,
        "TIME": 3
      },
      40,
      20,
      1.035,
      14,
      4.4,
      706.86,
      24)
 */
