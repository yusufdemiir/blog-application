import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Button, ScrollView, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';


interface Post {
    id: number
    title: string
    content?: string
    published: boolean
    createdAt: string
  }



export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string>('');
  const router = useRouter();


  // Postları getirme requesti.
  async function fetchPosts() {
    let res = await axios.get('http://localhost:3000/posts');
    setPosts(res.data);
  }

  //Çıkış yapma fonksiyonu
  function signOut() {
    router.replace('/login')
    console.log('Çıkış yapıldı.')
  }

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
      
      <Pressable 
            onPress={signOut} 
            style={({ pressed }) => [
                styles.button,
                pressed
                  ? styles.buttonPressed
                  : styles.button,
              ]}
            >
            <Text>Çıkış Yap</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center'  
  },
  scroll: { marginTop: 16 },
  post: { marginBottom: 16, padding: 10, backgroundColor: '#eee', borderRadius: 6 },
  title: { fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', marginTop: 8 },
  button: {
    backgroundColor: '',
    alignItems: 'center',
    alignContent: 'center',
    margin: 12,
    borderWidth: 0.8,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5
  },
  buttonPressed: {
    backgroundColor: 'rgb(210, 230, 255)'
  }
});