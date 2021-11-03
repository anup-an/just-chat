import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Header from './Header';
import Search from './Search';
import {styles} from '../../utility/styles';
import List from './List';

const User = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View
        style={{
          backgroundColor: 'white',
          height: '87%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <Search />
        <List />
      </View>
    </SafeAreaView>
  );
};
export default User;
