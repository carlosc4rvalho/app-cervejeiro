import { collection, getDocs } from 'firebase/firestore';
import db from '../../services/firebaseConfig';

/** Função para buscar leveduras no banco de dados, retornará um Array contendo todos as leveduras do banco de dados */

/** Exemplo de levedura
  {
    "Y_AMOUNT": 1,
    "Y_LAB": "Lallemand|Danstar",
    "Y_FORM": 1,
    "Y_TIMES_CULTURED": 0,
    "Y_CULTURE_DATE": "2016-01-20",
    "Y_NAME": "Abbaye Belgian",
    "Y_PKG_DATE": "2016-01-20",
    "Y_IN_RECIPE": 0,
    "Y_PRODUCT_ID": "-",
    "Y_ADD_TO_SECONDARY": 0,
    "Y_INVENTORY": 0,
    "Y_TYPE": 0,
    "Y_NOTES": "Complex aroma and flavors may include peppery, fruity, banana,\nclovy, alcoholic, sweet and fruity. Does not display undesirable odors\nwhen properly handled.",
    "Y_STARTER_SIZE": 0,
    "Y_MIN_ATTENUATION": 70,
    "Y_MIN_TEMP": "62,6",
    "ORDER": 0,
    "Y_FLOCCULATION": 0,
    "Y_BEST_FOR": "Belgian Ales",
    "Y_USE_STARTER": 0,
    "Y_PRICE": 7,
    "Y_CELLS": 200,
    "Y_BREW_DATE": "2016-01-20",
    "Y_MAX_REUSE": 5,
    "Y_MAX_TEMP": 72,
    "Y_MAX_ATTENUATION": 74,
    "Y_AGE_RATE": "1,66"
}
 */

const getYeastsBD = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'yeasts'));
    let yeasts = [];

    querySnapshot.forEach(doc => {
      yeasts.push(doc.data().yeast);
    });

    return yeasts;
  } catch (error) {
    console.error(`Não foi possível buscar as leveduras no banco de dados: ${error}`);
    throw error;
  }
};

const setYeast = async (yeast, atenuacao, qtd) => {
  try {
    let name, ident, lab, atenMin, atenMax, aten, numCel;

    name = yeast.Y_NAME;
    ident = yeast.Y_PRODUCT_ID;
    lab = yeast.Y_LAB;
    atenMin = yeast.Y_MIN_ATTENUATION;
    atenMax = yeast.Y_MAX_ATTENUATION;

    if (atenuacao == 'minima') {
      aten = atenMin;
    } else if (atenuacao == 'media') {
      aten = (atenMin + atenMax) / 2;
    } else {
      aten = atenMax;
    }

    numCel = yeast.Y_CELLS * qtd;

    console.log({ name, ident, lab, aten, numCel });

    return { name, ident, lab, aten, numCel };
  } catch (error) {
    console.error(`Não foi possível definir a levedura: ${error}`);
    throw error;
  }
};

export { getYeastsBD, setYeast };
