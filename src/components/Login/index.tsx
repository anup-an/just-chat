import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useState, useContext} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import firebase from '../../firebase/config';

import {UserContext} from '../../context';
import {IUser} from '../../context/actionTypes';
import {styles} from '../../utility/styles';
import Logo from '../Home/Logo';

const Login = () => {
  const {logInUser} = useContext(UserContext);
  const [credentials, setCredentials] = useState<IUser>({
    email: '',
    password: '',
  });
  const navigation = useNavigation();

  const handleInput = (text: string, name: string) => {
    setCredentials({...credentials, [name]: text});
  };

  const signInUser = async (email, password) => {
    const auth = getAuth(firebase);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const loggedUser = userCredential.user;
        logInUser({uid: loggedUser.uid, email: loggedUser.email});
        navigation.navigate('User');

        // ...
      })
      .catch(error => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const handleLogin = () => {
    const {email, password} = credentials;
    if (email === '') {
      alert('E-mail is required');
    } else if (password === '') {
      alert('Password is required');
    } else {
      signInUser(email, password);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcome}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: 8,
          }}>
          <Text style={{color: 'white'}}>Don't have an account: </Text>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate('SignUp')}>
            SignUp
          </Text>
        </View>

        <Logo />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          height: '50%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          justifyContent: 'center',
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <Text style={{marginLeft: 20}}>Enter login details here.</Text>
        <TextInput
          style={styles.inputStyle}
          editable
          maxLength={40}
          placeholder="E-mail"
          onChangeText={text => handleInput(text, 'email')}
          value={credentials.email}
        />
        <TextInput
          style={styles.inputStyle}
          editable
          maxLength={40}
          placeholder="password"
          onChangeText={text => handleInput(text, 'password')}
          value={credentials.password}
        />
        <View style={styles.button}>
          <Text style={styles.buttonText} onPress={handleLogin}>
            Login
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Login;
