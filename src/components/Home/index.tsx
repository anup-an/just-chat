import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {styles} from '../../utility/styles';
import Logo from './Logo';

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </View>
        <View style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate('SignUp')}>
            SignUp
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Home;
