import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { 
    View, 
    Text, 
    StyleSheet,
    TextInput,
    Pressable
} from 'react-native';

import { signUp } from '../services/_auth';

export default function Signup() {
    const [name, onChangeText] = React.useState('');
    const [email, onChangeEMail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [loading, setLoading]   = useState(false);
    const router = useRouter();

    function goLogin() {
      router.replace('/login')
    }

    const handleSignUp = async () => {
      setLoading(true);
      setMessage('null');
      try {
        const res = await signUp({ name: name, email: email, password: password });
        if (res.success) {
          setMessage('Kullanıcı Oluşturuldu!');
          router.replace('/login');
        } else {
          setMessage(res.message ?? 'Bilinmeyen hata');
        }
      } catch (error: any) {
        const serverMsg = error?.response?.data?.message;
        setMessage(serverMsg ?? error.message ?? 'Sunucu hatası');
      } finally {
        setLoading(false);
      }
    };

    return (
    <View style={styles.container}>

        <Text style={styles.header}>Kayıt Ol</Text>

        <Text>Kullanıcı Adı</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={name}
          placeholder='Kullanıcı Adı'
          autoCapitalize="none"
          inputMode='text'
        />

        <Text>E-posta</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEMail}
          value={email}
          placeholder='E-posta'
          autoCapitalize="none"
          inputMode='email'
        />

        <Text>Şifre</Text>
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
            onPress={handleSignUp} 
            style={({ pressed }) => [
                styles.button,
                pressed
                  ? styles.buttonPressed
                  : styles.button,
              ]}
            >
                <Text>Kayıt Ol</Text>
        </Pressable>

        <Pressable 
            onPress={goLogin} 
            style={({ pressed }) => [
                styles.button,
                pressed
                  ? styles.buttonPressed
                  : styles.button,
              ]}
            >
                <Text>Giriş Yap</Text>
        </Pressable>
        {message ? <Text style={{ marginTop:10 }}>{message}</Text> : null}
    </View>
    )
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
      header: {
          fontSize: 35,
          fontWeight: 'bold',
          margin: 30
      }
})