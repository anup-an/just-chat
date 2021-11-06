import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useContext} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import firebase from '../../firebase/config';
import {styles} from '../../utility/styles';
import Logo from './Logo';
import {UserContext} from '../../context';

const Home: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const auth = getAuth(firebase);
  const {logInUser} = useContext(UserContext);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user && user.email) {
        logInUser({uid: user.uid, email: user.email});
        navigation.navigate('User');
      } else {
        console.log('user is signed out');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
