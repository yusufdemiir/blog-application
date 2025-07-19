import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

interface Post {
    id: number
    title: string
    content?: string
    published: boolean
    createdAt: string
  }

export default function PostsScreen() {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string>('');

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts'); // ← IP'yi gerekirse değiştir
      setPosts(response.data);
      setError('');
    } catch (err) {
      setError('Veriler alınamadı.');
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Postları Getir" onPress={fetchPosts} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <ScrollView style={styles.scroll}>
        {posts.map((post, index) => (
          <View key={index} style={styles.post}>
            <Text style={styles.title}>{post.title}</Text>
            <Text>{post.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, marginTop: 40 },
  scroll: { marginTop: 16 },
  post: { marginBottom: 16, padding: 10, backgroundColor: '#eee', borderRadius: 6 },
  title: { fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', marginTop: 8 },
});