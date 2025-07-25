import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type RootNav = NativeStackNavigationProp<RootStackParamList>;


export default function ProfileScreen() {
  const navigation = useNavigation<RootNav>();

  //Çıkış yapma fonksiyonu
async function signOut() {
  await SecureStore.deleteItemAsync('accessToken');
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  );
  console.log('Çıkış yapıldı.')
}

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profil Ekranı</Text>
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
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20, fontWeight: '600' },
  button: {
    backgroundColor: '',
    alignItems: 'center',
    alignContent: 'center',
    margin: 8,
    borderWidth: 0.8,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  buttonPressed: {
    backgroundColor: 'rgb(210, 230, 255)'
  },
});