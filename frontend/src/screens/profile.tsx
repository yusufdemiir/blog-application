import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { jwtDecode, JwtPayload } from 'jwt-decode';

type RootNav = NativeStackNavigationProp<RootStackParamList>;


interface TokenPayload extends JwtPayload {
  name: string;
  email: string;
}

export default function ProfileScreen() {
  const navigation = useNavigation<RootNav>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  async function getUserInfo() {
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      if (!token) return null;
      const userInfo = jwtDecode<TokenPayload>(token);
      setName(userInfo.name);
      setEmail(userInfo.email);

    } catch (err) {
      console.error('Token decode hatası:', err);
      return null;
    }
  }
  getUserInfo()
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
      <Image
        source={require('../../assets/images/profile.png')}
        style={styles.image}
      />
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Image
          source={require('../../assets/images/logout.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{email}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  text: { 
    fontSize: 20, 
    fontWeight: '600', 
    alignSelf:'center' ,
    top: 270
  },
  button: {
    position : 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '',
    margin: 8,
    borderWidth: 0.8,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
  },
  buttonPressed: {
    backgroundColor: 'rgb(210, 230, 255)'
  },
  image: {
    width: 100,
    alignSelf: 'center',
    top: 250,
    height: 100,
    resizeMode: 'cover',
  },
  icon: {
    width: 40,
    height: 40,
  }
});