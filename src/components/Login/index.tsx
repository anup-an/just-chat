import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {styles} from '../../utility/styles';
import Logo from '../Home/Logo';

const Login = () => {
  const navigation = useNavigation();
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
        />
        <TextInput
          style={styles.inputStyle}
          editable
          maxLength={40}
          placeholder="password"
        />
        <View style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate('User')}>
            Login
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Login;
