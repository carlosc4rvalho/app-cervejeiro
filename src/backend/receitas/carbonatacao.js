import db from '../../services/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { valueToFloat } from '../valueToFloat';

/**
 * 
 * Exemplo de fermentável:
 * {
    "potencial": "1,042",
    "monossacarídios": "0,14",
    "trissacarídios": "0,185",
    "fermentaveis": "0,75",
    "nome": "DME",
    "dissacarídios": "0,68",
    "solidos": "0,8"
}
 */
export const getFermentaveis = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'fermentavelCarbon'));
    let fermentaveis = [];

    querySnapshot.forEach(doc => {
      fermentaveis.push(doc.data().ferment);
    });

    return fermentaveis;
  } catch (error) {
    console.error(`Não foi possível buscar os fermentáveis de carbonatação no banco de dados: ${error}`);
    throw error;
  }
};
export const setCarbon = (co2desejado, co2diluido, ferment, metodo, volFinalCerv, perfilFerm) => {
  /*(co2desejado - co2diluido) * (Volume final de cerveja desejado (módulo de equipamentos)) * (1/ fermentável(BD fermentável para carbonatação)) * (1 / solidos(BD fermentável para carbonatação))
   * ((monossacarídiosBD fermentável para carbonatação * 3,68) + (dissacarídios(BD fermentável para carbonatação) * 3,49) + (trissacarídios(BD fermentável para carbonatação) * 3,43))*/
  if (metodo == 'priming') {
    const qtdAcucar =
      (co2desejado - co2diluido) *
        volFinalCerv *
        (1 / valueToFloat(ferment.fermentaveis)) *
        (1 / valueToFloat(ferment.solidos)) *
        (valueToFloat(ferment.monossacarídios) * 3.68) +
      valueToFloat(ferment.dissacarídios) * 3.49 +
      valueToFloat(ferment.trissacarídios) * 3.43;
    const volAgua = 3 * qtdAcucar;
    const tempMaxFerm = perfilFerm.reduce((max, obj) => (obj.temp > max.temp ? obj : max), array[0]);
    const fermentador = 0.3 * qtdAcucar + volAgua;
    const grAculLCerv = qtdAcucar / volFinalCerv;
    const garr1l = fermentador / volFinalCerv;
    const garr600ml = 0.6 * garr1l;
    const garr500ml = 0.5 * garr1l;
    const garr330ml = 0.33 * garr1l;
    const garr275ml = 0.275 * garr1l;
    const garr200ml = 0.2 * garr1l;
    const garr100ml = 0.1 * garr1l;

    return {
      qtdAcucar,
      volAgua,
      tempMaxFerm,
      fermentador,
      grAculLCerv,
      garr1l,
      garr600ml,
      garr500ml,
      garr330ml,
      garr275ml,
      garr200ml,
      garr100ml,
    };
  } else if (metodo == 'forcada') {
  } else {
    console.error('Esse não é um método válido');
  }
};
