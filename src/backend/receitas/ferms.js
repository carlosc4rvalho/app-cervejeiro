import { collection, getDocs } from 'firebase/firestore';
import db from '../../services/firebaseConfig';

/**
 * Exemplo de perfil:
 * {
    "tipo_2": "Descanso do diacetil",
    "dias_1": "Até finalizar estabilizar a gravidade",
    "Nome": "Fermentação com dryhop",
    "temp_3": 22,
    "dias_3": "Até consumir o diacetil",
    "dias_2": "2 dias",
    "temp_1": 17,
    "tipo_3": "Maturação",
    "temp_2": 22,
    "id": 4,
    "tipo_1": "Fermentação"
}
 */

//Função para buscar os perfis de fermentação cadastrados no BD. Retornará um Array contendo objetos(ferm) de perfil de fermetação
const getFermsBD = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'ferms'));
    let ferms = [];

    querySnapshot.forEach(doc => {
      ferms.push(doc.data().ferm);
    });

    return ferms;
  } catch (error) {
    console.error(`Não foi possível buscar os perfis de brassagem no banco de dados: ${error}`);
    throw error;
  }
};

//Para execução dessa função não é necessário parâmentros de outro módulo da aplicação
const setFerm = async ferm => {
  try {
    let perfilFerm = [];
    for (let rampa = 1; rampa <= 3; rampa++) {
      let temp, duracao, etapa;

      if (rampa == 1) {
        temp = ferm.temp_1;
        duracao = ferm.dias_1;
        etapa = ferm.tipo_1;
      } else if (rampa == 2) {
        temp = ferm.temp_2;
        duracao = ferm.dias_2;
        etapa = ferm.tipo_2;
      } else if (rampa == 3) {
        temp = ferm.temp_3;
        duracao = ferm.dias_3;
        etapa = ferm.tipo_3;
      }

      perfilFerm.push({ rampa, temp, duracao, etapa });
    }

    console.log(perfilFerm);

    return perfilFerm;
  } catch (error) {
    console.error(`Não foi possível definir o perfil de brassagem: ${error}`);
    throw error;
  }
};

export { getFermsBD, setFerm };
