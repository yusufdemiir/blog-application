import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Posts from '../screens/posts';
import PostDetail from '../screens/post_details';
import { Ionicons } from '@expo/vector-icons';

export type PostsStackParamList = {
    PostsList: undefined;
    PostDetail: { id: number; title: string; content?: string; author: string };
  };

  const PostsStack = createNativeStackNavigator<PostsStackParamList>();

  function PostsStackNavigator() {
    return (
      <PostsStack.Navigator>
        <PostsStack.Screen
          name="PostsList"
          component={Posts}
        />
        <PostsStack.Screen
          name="PostDetail"
          component={PostDetail}
        />
      </PostsStack.Navigator>
    );
  }