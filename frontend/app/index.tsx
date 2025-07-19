import React from 'react';
import { SafeAreaView } from 'react-native';
import PostFetcher from './screens/PostsScreen';
import LoginScreen from './screens/login';
export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PostFetcher/>
    </SafeAreaView>
  );
}