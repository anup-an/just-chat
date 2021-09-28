import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {useState} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {styles} from '../../utility/styles';
import Logo from '../Home/Logo';

const SignUp = () => {
  const navigation = useNavigation();
  const [registerDetails, SetRegisterDetails] = useState({
    email: '',
    password: '',
    retypePassword: '',
  });

  const handleInput = (text: string, name: string) => {
    SetRegisterDetails({
      ...registerDetails,
      [name]: text,
    });
  };

  const handleSignUp = () => {
    if (email === '') {
      alert('E-mail is required');
    } else if (password === '') {
      alert('Password is required');
    } else if (retypePassword === '') {
      alert('Retype password required');
    } else {
      //    TODO post request to server and then redirect to user page
      navigation.navigate('User');
    }
  };

  const {email, password, retypePassword} = registerDetails;
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
          <Text style={{color: 'white'}}>Already have an account: </Text>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate('Login')}>
            Login
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
        <Text style={{marginLeft: 20}}>
          Please fill up details to create an account.
        </Text>
        <TextInput
          style={styles.inputStyle}
          editable
          maxLength={40}
          placeholder="E-mail"
          value={email}
          onChangeText={text => handleInput(text, 'email')}
          required
        />
        <TextInput
          style={styles.inputStyle}
          editable
          maxLength={40}
          placeholder="Password"
          value={password}
          onChangeText={text => handleInput(text, 'password')}
          required
        />
        <TextInput
          style={styles.inputStyle}
          editable
          maxLength={40}
          placeholder="Confirm password"
          value={retypePassword}
          onChangeText={text => handleInput(text, 'retypePassword')}
          required
        />
        <View style={styles.button}>
          <Text style={styles.buttonText} onPress={handleSignUp}>
            SignUp
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SignUp;
