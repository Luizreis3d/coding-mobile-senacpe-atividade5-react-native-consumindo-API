import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getDoguinhos } from './services/api';

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDoguinhos();
        setPhotos(data);
      } catch (error) {
        console.error("Erro ao carregar fotos: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const renderPhoto = ({ item }) => (
    <Image source={{ uri: item.url }} style={styles.image} />
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fotinhas de doguinhos</Text>
      <FlatList
        data={photos}
        keyExtractor={(item, index) => item.id || index.toString()}  // Usa o index como fallback
        renderItem={renderPhoto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
