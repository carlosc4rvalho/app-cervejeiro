import { setDoc, doc } from 'firebase/firestore';
import db from '../services/firebaseConfig';
import { fermentavelCarbon } from './dbs/fermentavelCarbon';

//Essa foi a função utilizada para subir os bancos de dados convertidos em Array de objetos para o Firebase.
//Essa função itera sobre cada objeto enviandos ao BD, os dados a serem enviados estão disponíveis em arquivos .js de sua respectiva tabela
export const upToBD = async () => {
  try {
    fermentavelCarbon.forEach(async ferment => {
      await setDoc(doc(db, 'fermentavelCarbon', ferment.nome), {
        ferment,
      });
    });
    alert('Enviado com sucesso');
  } catch (error) {
    alert('Não foi possível enviar para o BD');
  }
};
