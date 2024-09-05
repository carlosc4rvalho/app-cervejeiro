import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import db from '../../services/firebaseConfig';

const createUser = async userData => {
  try {
    console.log(userData);
    const userCollectionRef = collection(db, 'users');
    const docRef = await addDoc(userCollectionRef, userData);

    //console.log(`Usuário registrado com sucesso: ${docRef.id}`)
    return { message: `Usuário registrado com sucesso`, idUser: docRef.id };
  } catch (error) {
    console.error(`Não foi possível registrar esse usuário`);
    throw error;
  }
};

const loginUser = async userData => {
  try {
    const userRef = collection(db, 'users');

    const q = query(userRef, where('email', '==', userData.email), where('password', '==', userData.password));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      let id;
      querySnapshot.forEach(doc => {
        id = doc.id;
      });

      console.log('Login bem-sucedido!', id); // Corrigido para exibir o ID do usuário
      return { results: 'OK', message: 'Login bem-sucedido!', idUser: id };
    } else {
      console.log('Email ou senha incorretos.');
      return { results: 'Error', message: 'Email ou senha incorretos.' };
    }
  } catch (error) {
    console.error('Não foi possível realizar o login', error);
    return { results: 'Error', message: 'Erro ao realizar o login.' };
  }
};

export { createUser, loginUser };
