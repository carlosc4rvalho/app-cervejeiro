import db from '../../services/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

//Criar função para cadastrar collection da receita no banco de dados
const createReceita = async userId => {
  try {
    const receitasCollectionRef = collection(db, 'users', userId, 'receitas');

    const docRef = await addDoc(receitasCollectionRef, {});
    console.log('Receita salva com sucesso:', docRef.id);
    const receitaId = docRef.id;

    return receitaId;
  } catch (error) {
    console.error(`Não foi possível criar a receita: ${error}`);
    throw error;
  }
};

// Função para inserir todos os dados associados à receita no banco de dados, cada um dos dados são Arrays de objetos(nem sempre)
const insertReceitaBD = async (
  userId,
  receitaId,
  nameReceita,
  ferms,
  lupulos,
  maltes,
  mashSteps,
  styles,
  yeasts,
  paramsEstimados
) => {
  try {
    const receitaCollectionRef = collection(db, 'users', userId, 'receitas', receitaId);
    await addDoc(receitaCollectionRef, {
      nameReceita,
    });

    // Inserir os perfis de fermentação (ferms)
    const fermsCollectionRef = collection(db, 'users', userId, 'receitas', receitaId, 'ferms');
    const docRef = await addDoc(fermsCollectionRef, { ferms });
    console.log('Perfil de fermentação salvo com sucesso:', docRef.id);

    // Inserir os lúpulos
    const lupulosCollectionRef = collection(db, 'users', userId, 'receitas', receitaId, 'lupulos');
    lupulos.forEach(async lupulo => {
      const docRef = await addDoc(lupulosCollectionRef, lupulo);
      console.log('Lúpulo salvo com sucesso:', docRef.id);
    });

    // Inserir os maltes
    const maltesCollectionRef = collection(db, 'users', userId, 'receitas', receitaId, 'maltes');
    maltes.forEach(async malte => {
      const docRef = await addDoc(maltesCollectionRef, malte);
      console.log('Malte salvo com sucesso:', docRef.id);
    });

    // Inserir os perfis da brassagem (mashSteps) - Um Array contendo 3 objetos perfil { nomePerfil, temp, time }
    const mashStepsCollectionRef = collection(db, 'users', userId, 'receitas', receitaId, 'mashSteps');
    const docRefMash = await addDoc(mashStepsCollectionRef, { mashSteps });
    console.log('Perfil da brassagem salvo com sucesso:', docRefMash.id);

    //Inserir styles - Um Array contendo dois objetos
    const stylesCollectionRef = collection(db, 'users', userId, 'receitas', receitaId, 'styles');
    const docRefStyle = await addDoc(stylesCollectionRef, { styles });
    console.log('Style salvo com sucesso: ', docRefStyle.id);

    //Inserir yeasts
    const yeastsCollectionRef = collection(db, 'users', userId, 'receitas', receitaId, 'yeasts');
    yeasts.forEach(async yeast => {
      const docRef = await addDoc(yeastsCollectionRef, yeast);
      console.log('Yeast salvo com sucesso');
    });

    //insere nome da receita e parâmetros estimados
    const paramsCollectionRef = collection(db, 'users', userId, 'receitas', receitaId, 'params');
    await addDoc(paramsCollectionRef, {
      paramsEstimados,
    });
    console.log('Deu tudo certo! Receita salva com sucesso');
    return 'Deu tudo certo! Receita salva com sucesso';
  } catch (error) {
    console.error(`Não foi possível inserir os dados da receita: ${error}`);
    throw error;
  }
};

//Função em implementação
const getAllReceitasBD = async userId => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users', userId, 'receitas'));
    //let params = [], carbon = [], dryhop = [], ferms = [], lupulos = [], maltes = [], mashSteps = [], styles = [], yeasts = [];
    let receitas = [];

    querySnapshot.forEach(async doc => {
      let receita = doc.data();
      receita.id = doc.id;

      if (doc.data().name) {
        // Adiciona a sub-coleção "carbon"
        const carbonSnap = await getDocs(collection(db, 'users', userId, 'receitas', receita.id, 'carbon'));
        receita.carbon = [];
        carbonSnap.forEach(carbon => {
          receita.carbon.push(carbon.data());
        });

        // Adiciona a sub-coleção "dryhop"
        const dryhopSnap = await getDocs(collection(db, 'users', userId, 'receitas', receita.id, 'dryhop'));
        receita.dryhop = [];
        dryhopSnap.forEach(dryhop => {
          receita.dryhop.push(dryhop.data());
        });

        // Adiciona a sub-coleção "ferms"
        const fermsSnap = await getDocs(collection(db, 'users', userId, 'receitas', receita.id, 'ferms'));
        receita.ferms = [];
        fermsSnap.forEach(ferm => {
          receita.ferms.push(ferm.data());
        });

        // Adiciona a sub-coleção "lupulos"
        const lupulosSnap = await getDocs(collection(db, 'users', userId, 'receitas', receita.id, 'lupulos'));
        receita.lupulos = [];
        lupulosSnap.forEach(lupulo => {
          receita.lupulos.push(lupulo.data());
        });

        // Adiciona a sub-coleção "maltes"
        const maltesSnap = await getDocs(collection(db, 'users', userId, 'receitas', receita.id, 'maltes'));
        receita.maltes = [];
        maltesSnap.forEach(malte => {
          receita.maltes.push(malte.data());
        });

        // Adiciona a sub-coleção "mashSteps"
        const mashSnap = await getDocs(collection(db, 'users', userId, 'receitas', receita.id, 'mashSteps'));
        receita.mashSteps = [];
        mashSnap.forEach(mashStep => {
          receita.mashSteps.push(mashStep.data());
        });

        // Adiciona a sub-coleção "styles"
        const stylesSnap = await getDocs(collection(db, 'users', userId, 'receitas', receita.id, 'styles'));
        receita.styles = [];
        stylesSnap.forEach(style => {
          receita.styles.push(style.data());
        });

        // Adiciona a sub-coleção "yeasts"
        const yeastsSnap = await getDocs(collection(db, 'users', userId, 'receitas', receita.id, 'yeasts'));
        receita.yeasts = [];
        yeastsSnap.forEach(yeast => {
          receita.yeasts.push(yeast.data());
        });

        // Adiciona a sub-coleção "params"
        const paramsSnap = await getDocs(collection(db, 'users', userId, 'receitas', receita.id, 'params'));
        receita.params = [];
        paramsSnap.forEach(param => {
          receita.params.push(param.data());
        });
      }

      receitas.push(receita);
    });

    return receitas;
  } catch (error) {
    console.error(`Não foi possível buscar as receitas no banco de dados: ${error}`);
    throw error;
  }
};

export { insertReceitaBD, createReceita, getAllReceitasBD };
