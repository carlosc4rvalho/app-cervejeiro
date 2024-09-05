import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import db from '../../../services/firebaseConfig.js';

/**
 * Exemplo de perfil de Equipamento:
 * {
    "esquenta_agua_lavagem_antes_mash": "False",
    "usa_chiller": "False",
    "e_singlevessel": "False",
    "eficiencia_mash": 81,
    "eficiencia_brewhouse": 75,
    "volume_panela": 32,
    "volume_dead_space": 2,
    "volume_abaixo_fundo_falso": 0,
    "volume_perdido_evaporacao": 5,
    "volume_trub_quente": 2,
    "volume_trub_frio": 2,
    "contracao_liquido": 0,
    "absorcao_estimada": 1.10,
    "volume_final_cerv_desejado": 20,
    "diametro_panela": 30.0,
    "diametro_abertura_panela": 30.0,
    "volume_keg_barril_carbonatacao": 0

}
 */

//Função para buscar os perfis de equipamentos cadastrados no BD. Retornará um Array contendo objetos(equips) de perfil de equipamento.
export async function fetchEquipamentos(userId) {
  try {
    const querySnapshot = await getDocs(collection(db, 'users', userId, 'equipamentos'));
    const equipamentos = [];
    querySnapshot.forEach(docSnapshot => {
      equipamentos.push({ id: docSnapshot.id, ...docSnapshot.data() });
    });
    return console.log(equipamentos);
  } catch (error) {
    console.error('Erro ao buscar equipamentos: ', error);
    throw error;
  } finally {
    console.log('Operacao concluida');
  }
}

// export async function fetchAllEquipamentos() {
//     try {
//         const querySnapshot = await getDocs(collection(db, "users",  "equipamentos"));
//         const equipamentos = [];
//         querySnapshot.forEach((docSnapshot) => {
//             equipamentos.push({ id: docSnapshot.id, ...docSnapshot.data() });
//         });
//         return console.log(equipamentos);
//     } catch (error) {
//         console.error("Erro ao buscar equipamentos: ", error);
//         throw error;
//     } finally {
//         console.log("Operacao concluida");
//     }
// }

//Criar função para cadastrar collection do equipamento no banco de dados
export const createEquipamento = async (userId, objEquipamento) => {
  try {
    const equipamentosCollectionRef = collection(db, 'users', userId, 'equipamentos');

    // SETANDO DADOS QUE VEM DO OBJ EQUIPAMENTO
    const docRef = await addDoc(equipamentosCollectionRef, {
      nome: objEquipamento.nome,
      agua: objEquipamento.agua,
      esquentaAguaLavagemMash: objEquipamento.esquentaAguaLavagemMash,
      chiller: objEquipamento.chiller,
      singlevessel: objEquipamento.singlevessel,
      eficienciaMash: objEquipamento.eficienciaMash,
      eficienciaBrewhouse: objEquipamento.eficienciaBrewhouse,
      volumePanela: objEquipamento.volumePanela,
      volumeDeadSpace: objEquipamento.volumeDeadSpace,
      volumeAbaixoFundo: objEquipamento.volumeAbaixoFundo,
      volumePerdidoEvaporacao: objEquipamento.volumePerdidoEvaporacao,
      volumeTrubQuente: objEquipamento.volumeTrubQuente,
      volumeTrubFrio: objEquipamento.volumeTrubFrio,
      contracaoLiquido: objEquipamento.contracaoLiquido,
      absorcaoEstimada: objEquipamento.absorcaoEstimada,
      volumeFinalCervejaDesejado: objEquipamento.volumeFinalCervejaDesejado,
      diametroPanela: objEquipamento.diametroPanela,
      diametroAberturaPanela: objEquipamento.diametroAberturaPanela,
      volumeKegBarril: objEquipamento.volumeKegBarril,
      pesoMalte: objEquipamento.pesoMalte,
      tempPrimeiraRampa: objEquipamento.tempPrimeiraRampa,
      createdAt: new Date(),
    });

    console.log('Equipamento salvo com sucesso:', docRef.id);
    const equipamentoId = docRef.id;

    return equipamentoId;
  } catch (error) {
    console.error(`Não foi possível criar o equipamento: ${error}`);
    throw error;
  }
};

/** Editar ferramentas */
async function editFerramenta(userId, equipamentoId, equipamentoAtualizado) {
  try {
    // Referência ao documento
    const ferramentaDocRef = doc(db, 'users', userId, 'equipamentos', equipamentoId);

    // Obter os dados atuais do documento
    const docSnapshot = await getDoc(ferramentaDocRef);
    if (!docSnapshot.exists()) {
      throw new Error('Equipamento não encontrado.');
    }

    // Dados atuais do documento
    const dadosAtuais = docSnapshot.data();

    // Construir o objeto de atualização, mantendo valores atuais se o campo for null ou undefined
    const atualizacao = {};
    for (const campo in equipamentoAtualizado) {
      if (equipamentoAtualizado[campo] !== null && equipamentoAtualizado[campo] !== undefined) {
        atualizacao[campo] = equipamentoAtualizado[campo];
      } else {
        atualizacao[campo] = dadosAtuais[campo];
      }
    }

    // Atualizar o documento com o objeto de atualização dinâmico
    await updateDoc(ferramentaDocRef, atualizacao);
    console.log('Ferramenta atualizada com sucesso:', equipamentoId);
  } catch (error) {
    console.error('Erro ao atualizar a Ferramenta:', error);
  }
}

/** Deleta ferramentas */
async function deleteFerramenta(userId, equipamentoId) {
  // Busca ferramenta pelo id usuario e pelo id da ferramenta
  try {
    const ferramentaDocRef = doc(db, 'users', userId, 'equipamentos', equipamentoId);

    await deleteDoc(ferramentaDocRef);
    console.log('Item excluído com sucesso:', equipamentoId);
  } catch (error) {
    console.error('Erro ao excluir o equipamento:', error);
  }
}
