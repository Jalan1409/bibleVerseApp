import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';

export default function App() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVerse = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://bible-api.com/?random=verse');
      const data = await response.json();
      if (response.ok) {
        setVerse(data);
      } else {
        setError(data.error || 'Algo deu errado');
      }
    } catch (error) {
      setError('Falha ao buscar versículo');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Versículo da Bíblia</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : verse ? (
        <View style={styles.verseContainer}>
          <Text style={styles.verse}>{verse.text}</Text>
          <Text style={styles.reference}>{verse.reference}</Text>
        </View>
      ) : (
        <Text style={styles.instruction}>Pressione o botão para obter um versículo aleatório</Text>
      )}
      <Button title="Obter Versículo" onPress={fetchVerse} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  verseContainer: {
    marginBottom: 20,
  },
  verse: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  reference: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});
