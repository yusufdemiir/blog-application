import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TextInput,
    Pressable,
    Alert
} from 'react-native';
import { signUp } from '../../services/_auth';
import { RootStackParamList } from '../navigation/RootNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

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

export default function SignUp({ navigation }: Props) {
    const [name, onChangeText] = React.useState('');
    const [email, onChangeEMail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    function goLogin() {
      navigation.replace('Login');
      console.log('Giriş ekranına geçildi.')
    }

    const handleSignUp = async () => {
      try {
        const res = await signUp({ name: name, email: email, password: password });
        if (res.success) {
          console.log(res.message)
          navigation.replace('Login');
          alert('Başarılı', 'Lütfen giriş yapınız.', 'Giriş Yap');
        } else {
          console.log(res.message)
          const errorMsg = res.message ?? 'Bilinmeyen hata';
          alert('Hata!', errorMsg, 'Tamam');
        }
      } catch (error: any) {
        const serverMsg = error?.response?.data?.message;
        console.log(serverMsg)
        alert('Hata!', serverMsg, 'Tamam');
      } finally {
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
                <Text style={{fontWeight:'bold', fontSize: 18}}>Kayıt Ol</Text>
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
      header: {
          fontSize: 35,
          fontWeight: 'bold',
          margin: 30
      }
})