import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { login } from '../services/_auth';
import { 
    View, 
    Text, 
    StyleSheet,
    TextInput,
    Pressable
} from 'react-native';

export default function Login() {
    const [email, onChangeEMail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [loading, setLoading]   = useState(false);
    const router = useRouter();

    // Kayıt ol butonu işlevi.
    function signInFunc() {
      router.replace('/signup')
      console.log('Kayıt ekranına geçildi.')
    }
  
    // Login requesti.
    const handleLogin = async () => {
      setLoading(true);
      setMessage('');
      try {
        const res = await login({ email, password: password});
        if (res.success) {
          setMessage(res.message ?? '');
          console.log(res.message);
          router.replace('/posts');
        } else {
          setMessage(res.message ?? 'Bilinmeyen hata.'); 
          console.log(res.message)
        };
      } catch (error: any) {
        const serverMsg = error?.responce?.data?.message;
        setMessage(serverMsg ?? error.message ?? 'Sunucu hatası.');
        console.log(serverMsg);
      } finally {
        setLoading(false);
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
            onPress={signInFunc} 
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