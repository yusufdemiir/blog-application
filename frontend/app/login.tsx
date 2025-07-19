import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { 
    View, 
    Text, 
    Button, 
    ScrollView, 
    StyleSheet,
    TextInput,
    Pressable
} from 'react-native';

function signInFunc() {
    console.log('kayıt olma butonuna basıldı.')
}

export default function Login() {
    const [email, onChangeMail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const router = useRouter();

    // Login requesti.
    async function login() {
      try {
        let res = await axios.post('http://localhost:3000/login',{ email, password: password });
        if (res.data.success) {
          router.replace('/posts');    // lower-case: dosya ismiyle eşleşecek
        } else setMessage(res.data.message);
      } catch (err: any) {
        if (err.response && err.response.data) {
          setMessage(err.response.data.message);
        } else {
          setMessage('Sunucuya bağlanırken hata oluştu');
        }
      }
    }

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeMail}
          value={email}
          placeholder='Email'
          autoCapitalize="none"
          inputMode='email'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
        />
        
        <Pressable 
            onPress={login} 
            style={({ pressed }) => [
                styles.button,
                pressed
                  ? styles.buttonPressed
                  : styles.button,
              ]}
            >
                <Text>Giriş Yap</Text>
        </Pressable>

        <Pressable 
            onPress={signInFunc} 
            style={({ pressed }) => [
                styles.button,
                pressed
                  ? styles.buttonPressed
                  : styles.button,
              ]}
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
      margin: 12,
      borderWidth: 0.8,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 5
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
  })