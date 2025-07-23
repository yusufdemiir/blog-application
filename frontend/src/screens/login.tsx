import React, { useState } from 'react';
import { login } from '../../services/_auth';
import * as SecureStore from 'expo-secure-store';
import { 
    View, 
    Text, 
    StyleSheet,
    TextInput,
    Pressable
} from 'react-native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
    const [email, onChangeEMail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    // Kayıt ol butonu işlevi.
    function signUpFunc() {
      navigation.replace('SignUp');
      console.log('Kayıt ekranına geçildi.')
    }
  
    // Login requesti.
    const handleLogin = async () => {
      setMessage('');
      try {
        const res = await login({ email, password: password});
        if (res.success) {
          setMessage(res.message ?? '');
          console.log(res.message);
          await SecureStore.setItemAsync('accessToken', res.token);
          navigation.replace('MainTabs');
        } else {
          setMessage(res.message ?? 'Bilinmeyen hata.'); 
          console.log(res.message)
        };
      } catch (error: any) {
        const serverMsg = error?.responce?.data?.message;
        setMessage(serverMsg ?? error.message ?? 'Sunucu hatası.');
        console.log(serverMsg);
      } finally {
      }
    }

    return (
      <View style={styles.container}>

        <Text style={styles.header}>Giriş Yap</Text>

        <TextInput
          style={styles.input}
          onChangeText={onChangeEMail}
          value={email}
          placeholder='E-posta'
          autoCapitalize="none"
          inputMode='email'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Şifre"
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
        />
        
        <Pressable 
            onPress={handleLogin} 
            style={({ pressed }) => [
                styles.button,
                pressed
                  ? styles.buttonPressed
                  : styles.button,
              ]}
            >
                <Text style={{fontWeight:'bold', fontSize: 15}}>Giriş Yap</Text>
        </Pressable>

        <Pressable 
            onPress={signUpFunc} 
            style={({ pressed }) => [
                styles.button,
                pressed
                  ? styles.buttonPressed
                  : styles.button,
              ]
              }
            >
            <Text>Kayıt Ol</Text>
        </Pressable>
        {message ? <Text style={{ marginTop:10 }}>{message}</Text> : null}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
    },
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
    input: {
        borderRadius: 10,
        height: 40,
        width: '80%',
        alignContent: 'center',
        margin: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        alignSelf: 'center'
      },
      header: {
        fontSize: 35,
        fontWeight: 'bold',
        margin: 30
      }
  })