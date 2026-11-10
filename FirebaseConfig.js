//FirebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  /*****SUBSTITUA PELA AS CREDENCIAIS DO SEU FIREBASE******/  
};
/**********************************************************/
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);