// App.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

import Lembrete from './components/Lembretes';

export default function App() {
  const [lembretes, setLembretes] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [editando, setEditando] = useState(null);

 

  async function carregarLembretes() {
    
  }

  async function handleSalvarLembrete() {
    
  }

  async function apagarLembrete(id) {
    
  }

  function editarLembrete(lembrete) {
    
  }

  async function finalizarLembrete(id, novoStatus) {
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloApp}>Projeto 3: SQLite</Text>
      
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