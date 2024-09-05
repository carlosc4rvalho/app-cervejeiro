import { collection, getDocs } from 'firebase/firestore';
import db from '../../services/firebaseConfig';
import { valueToFloat } from '../valueToFloat';

/** Exemplo de grão
 {
    YIELD: "58,70",
    COLOR: "3,00",
    AMOUNT: 0,
    RECOMMEND_MASH: "1,00",
    pH: "0,00",
    TYPE: "0,00",
    SUPPLIER: "",
    NOT_FERMENTABLE: "0,00",
    NOTES: "Acid malt contains acids from natural lactic acids. Used by German brewers to adjust malt PH without chemicals to adhere to German purity laws. Also enhances the head retention.",
    DIASTATIC_POWER: "0,00",
    Nome: "Acid Malt",
    COARSE_FINE_DIFF: "1,50",
    PROTEIN: "6,00",
    ADD_AFTER_BOIL: "0,00",
    LATE_EXTRACT: "0,00",
    MOISTURE: 4,
    PERCENT: "0,00",
    PRICE: "0,08",
    IBU_GAL_PER_LB: "0,00",
    ORIGIN: "Germany",
    BOIL_TIME: "60,00",
    "Torrado|Ácido": 3,
    MAX_IN_BATCH: "10,00"
}

}
 */

/** Função para buscar graos(maltes) no banco de dados, retornará um Array contendo objetos de  todos os grãos do banco de dados */

const getMaltesBD = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'maltes'));
    let maltes = [];

    querySnapshot.forEach(doc => {
      maltes.push(doc.data().malte);
    });

    return maltes;
  } catch (error) {
    console.error(`Não foi possível buscar os grãos no banco de dados: ${error}`);
    throw error;
  }
};

//Função não possui parâmetros de outro módulo da aplicação
//Função recebe um objeto malte, processando-o de acordo com os devidos parâmetros e retornado um objeto contendo os valores necessários
const setMalte = async (malte, weight) => {
  try {
    let name, color, fG, potBu, ppg, poderDiast, ogMax;

    name = malte.Nome;
    color = (valueToFloat(malte.COLOR) + 0.76) / 1.3546;
    fG = valueToFloat(malte.MOISTURE);
    potBu = valueToFloat(malte.YIELD) * (1 - fG / 100) * (1 - valueToFloat(malte.MOISTURE) / 100);
    ppg = (potBu / 100) * 46.21;
    poderDiast = valueToFloat(malte.PROTEIN);
    ogMax = 1 + ppg / 1000;

    console.log({
      name,
      color,
      fG,
      potBu,
      ppg,
      poderDiast,
      ogMax,
      weight,
    });

    return { name, color, fG, potBu, ppg, poderDiast, ogMax, weight };
  } catch (error) {
    console.error(`Não foi possível definir esse grão: ${error}`);
    throw error;
  }
};

export { getMaltesBD, setMalte };
