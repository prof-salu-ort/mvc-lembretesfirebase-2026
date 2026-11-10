// /dao/LembreteDAO.js

import {db} from '../FirebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc,
         doc, onSnapshot } from 'firebase/firestore';

const lembretesCollection = collection(db, 'lembretes');

export function adicionar(lembrete){
    return addDoc(lembretesCollection, lembrete);
}

export function ouvirLembretes(callback){
    return onSnapshot(lembretesCollection, snapshot => {
        const lembretes = snapshot.docs.map(doc => ({id : doc.id, ...doc.data()}));
        callback(lembretes);
    });
}

export function apagar(id){
    const lembreteDoc = doc(db, 'lembretes', id);
    return deleteDoc(lembreteDoc);
}

export function editar(id, lembrete){
    const lembreteDoc = doc(db, 'lembretes', id);
    return updateDoc(lembreteDoc, lembrete);
}