import React from 'react';
import { creatPost } from '../../services/_blog';
import * as SecureStore from 'expo-secure-store';
import {
  View, 
  Text, 
  StyleSheet,
  TextInput,
  Pressable,
  Alert
} from 'react-native';

function alert(baslik: string, mesaj: string, button: string) {
  Alert.alert(
    baslik,
    mesaj,
    [
      {
        text: button,
      },
    ],
    { cancelable: false }
  );
}

export default function CreateScreen() {
  const [title, onHeaderChange] = React.useState('');
  const [content, onContentChange] = React.useState('');

  const handlePost = async () => {
    try {
      const token = await SecureStore.getItemAsync('accessToken') ?? '';
      const res = await creatPost({ title: title, content: content }, token);
      if (res.success) {
        console.log(res.message)
        alert('Başarılı', 'Postunuz oluşturuldu.', 'Tamam');
      } else {
        console.log(res.message)
        console.log('burası')
        const errorMsg = res.message ?? 'Bilinmeyen hata';
        alert('Hata!', errorMsg, 'Tamam');
      }
    } catch (error: any) {
      const serverMsg = error?.response?.data?.message;
      console.log(serverMsg)
      console.log('burası')
      alert('Hata!', serverMsg, 'Tamam');
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Oluşturma Ekranı</Text>
      <Text>Başlık</Text>
        <TextInput
          style={styles.input}
          onChangeText={onHeaderChange}
          value={title}
          placeholder='Başlık'
          autoCapitalize="none"
          inputMode='text'
        />

        <Text>İçerik</Text>
        <TextInput
          style={styles.contextInput}
          onChangeText={onContentChange}
          value={content}
          placeholder='İçerik'
          autoCapitalize="none"
          inputMode='text'
          multiline
        />
        <Pressable 
            onPress={handlePost} 
            style={({ pressed }) => [
                styles.button,
                pressed
                  ? styles.buttonPressed
                  : styles.button,
              ]}
            >
                <Text>Yayınla</Text>
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
  contextInput: {
    borderRadius: 10,
    height: 300,
    width: '80%',
    alignContent: 'center',
    margin: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    alignSelf: 'center'
  }
});