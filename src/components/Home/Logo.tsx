import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../utility/colors';
import {styles} from '../../utility/styles';

const Logo = () => {
  return (
    <SafeAreaView>
      <View style={styles.welcomeScreen}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 25,
          }}>
          JUST-CHAT
          <Text>
            <Icon name="textsms" size={25} color={colors.BUTTON_COLOR} />
          </Text>
        </Text>
        <Text>
          <Icon name="people" size={80} color={colors.BUTTON_COLOR} />
        </Text>
        <Text
          style={{
            color: 'white',
            fontStyle: 'italic',
            fontFamily: 'Roboto',
          }}>
          connect with your friends
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Logo;
