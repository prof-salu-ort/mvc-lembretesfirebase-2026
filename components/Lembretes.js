import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';

export default function Lembrete({ item, onEditar, onApagar, onFinalizar }){
  // Converte a data para formato brasileiro
  const dataFormatada = item.dataCriacao.toDate().toLocaleDateString('pt-BR');
  
  return(
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={[styles.titulo, item.finalizado && styles.textoFinalizado]}>{item.titulo}</Text>
        <Text style={[styles.conteudo, item.finalizado && styles.textoFinalizado]}>{item.conteudo}</Text>
        <Text style={styles.data}>Criado em: {dataFormatada}</Text>
      </View>
      <View style={styles.acoes}>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={item.finalizado ? '#f5dd4b' : '#f4f3f4'}
          value={item.finalizado}
          onValueChange={() => onFinalizar(item)}
        />
        <TouchableOpacity style={styles.botao} onPress={() => onEditar(item)}>
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, styles.botaoApagar]} onPress={() => onApagar(item.id)}>
          <Text style={styles.textoBotao}>Apagar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 15, borderRadius: 5, marginBottom: 10, borderWidth: 1 },
  info: { marginBottom: 10 },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  conteudo: { fontSize: 14, marginTop: 5, color: '#555' },
  data: { fontSize: 12, color: '#999', marginTop: 10 },
  acoes: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#eee' },
  botao: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, backgroundColor: '#007bff', marginLeft: 10 },
  textoBotao: { color: 'white' },
  botaoApagar: { backgroundColor: 'red' },
  textoFinalizado: { textDecorationLine: 'line-through', color: '#aaa' }
});