import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {styles} from '../../utility/styles';
import Logo from '../Home/Logo';

const SignUp = () => {
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
        />
        <TextInput
          style={styles.inputStyle}
          editable
          maxLength={40}
          placeholder="Password"
        />
        <TextInput
          style={styles.inputStyle}
          editable
          maxLength={40}
          placeholder="Confirm password"
        />
        <View style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate('User')}>
            SignUp
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default SignUp;
