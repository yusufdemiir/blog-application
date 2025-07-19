import React, { useState } from 'react';
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
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

function loginFunc() {
    return 0
}
function signInFunc() {
    return 0
}

export default function Login() {
    const [mail, onChangeMail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <TextInput
          style={styles.input}
          onChangeText={onChangeMail}
          value={mail}
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
            onPress={loginFunc} 
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

      </SafeAreaView>
    </SafeAreaProvider>
      
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