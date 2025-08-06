// PostDetailScreen.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PostsStackParamList } from '../navigation/Posts';

type Props = NativeStackScreenProps<PostsStackParamList, 'PostDetail'>;

export default function PostDetailScreen({ route, navigation }: Props) {
  const { id, title, content, author } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title='<-'
          onPress={() => navigation.goBack()}
        />
      ),
      headerTitle: title,
      headerTitleAlign: 'center'
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>{content}</Text>
      <Text style={styles.author}>— {author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  author: { marginTop: 20, fontStyle: 'italic' },
});