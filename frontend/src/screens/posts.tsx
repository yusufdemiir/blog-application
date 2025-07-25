import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type RootNav = NativeStackNavigationProp<RootStackParamList>;

interface Post {
    id: number
    title: string
    content?: string
    published: boolean
    createdAt: string
    user: {
      name: string;
    }
  }

  
export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string>('');

  const navigation = useNavigation<RootNav>();

  // Postları getirme requesti.
  async function fetchPosts() {
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      const res = await axios.get('http://localhost:3000/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
      setError('');
    } catch (err) {
      setError('Veriler alınamadı.');
      console.log(err);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts()
    }, [])
  )
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        {posts.map((post, index) => (
          <View key={index} style={styles.post}>
            <Text style={styles.title}>{post.title}</Text>
            <Text>{post.content}</Text>
            <Text>— {post.user.name}</Text>
          </View>
        ))}
      </ScrollView>

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