// App.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

import Lembrete from './components/Lembretes';
import * as LembreteDAO from './dao/LembreteDAO';

export default function App() {
  const [lembretes, setLembretes] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    const unsubscribe = LembreteDAO.ouvirLembretes(setLembretes);
    return () => unsubscribe();
  }, []);

  async function handleSalvarLembrete() {
    if(titulo.trim() === '' || conteudo.trim() === ''){
      return;
    }

    const dadosLembrete = {
      titulo : titulo,
      conteudo : conteudo,
      dataCriacao : editando ? editando.dataCriacao : new Date(),
      finalizado : editando ? editando.finalizado : false,
    }

    try{
      if(editando){
        await LembreteDAO.editar(editando.id, dadosLembrete);
      }else{
        await LembreteDAO.adicionar(dadosLembrete);
      }      
    }catch(error){
      console.error('Falha ao gravar: ' + error);
    }finally{
      setEditando(null);
      setTitulo('');
      setConteudo('');
    }    
  }

  async function apagarLembrete(id) {
    try{
      await LembreteDAO.apagar(id);
    }catch(error){
      console.error('Falha ao apagar: ', error);
    }
    
  }

  function editarLembrete(lembrete) {
    setEditando(lembrete);
    setTitulo(lembrete.titulo);
    setConteudo(lembrete.conteudo);
  }

  async function finalizarLembrete(lembrete) {
    try{
      const lembreteAtualizado = {
        titulo : lembrete.titulo,
        conteudo : lembrete.conteudo,
        dataCriacao : lembrete.dataCriacao,
        finalizado : !lembrete.finalizado,
      }

      await LembreteDAO.editar(lembrete.id, lembreteAtualizado);
    }catch(error){
      console.error('Falha ao atualizar: ', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloApp}>Projeto 4: Firebase</Text>
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Título" 
          value={titulo} 
          onChangeText={setTitulo} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Conteúdo" 
          value={conteudo} 
          onChangeText={setConteudo} 
        />
        <Button 
          title={editando ? "Atualizar Lembrete" : "Adicionar Lembrete"} 
          onPress={handleSalvarLembrete} 
        />
      </View>
      
      <FlatList 
        style={styles.lista} 
        data={lembretes} 
        keyExtractor={function(item) { return item.id.toString(); }}
        renderItem={function({ item }) {
          return (
            <Lembrete 
              item={item} 
              onEditar={editarLembrete} 
              onApagar={apagarLembrete}
              onFinalizar={finalizarLembrete} 
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  tituloApp: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 40 },
  inputContainer: { padding: 15, backgroundColor: 'white', borderRadius: 5, marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5 },
  lista: { marginTop: 10 }
});