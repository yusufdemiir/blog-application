import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, StatusBar } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { PostsStackParamList } from '../navigation/Posts';

type RootNav = NativeStackNavigationProp<RootStackParamList>;
type Props = NativeStackNavigationProp<PostsStackParamList, 'PostsList'>;

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
      <StatusBar barStyle="light-content" backgroundColor="#6200ee" />
      <ScrollView>
      {posts.map((p) => (
        <Pressable
          key={p.id}
          onPress={() =>
            navigation.navigate('PostDetail', {
              id: p.id,
              title: p.title,
              content: p.content,
              author: p.user.name,
            })
          }
          style={styles.post}
        >
          <Text style={styles.title}>{p.title}</Text>
          <Text>- {p.user.name} -</Text>
        </Pressable>
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
    
  },
  scroll: { 
    marginTop: 16,
    width: '100%'

  },
  post: { 
    marginBottom: 16, 
    padding: 9, 
    backgroundColor: '#eee', 
    borderRadius: 6, 
    height: 100,
    width: '100%'
  },
  title: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    alignSelf: 'stretch',
    marginBottom: 5
  },
  error: { 
    color: 'red', 
    marginTop: 8 
  },
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