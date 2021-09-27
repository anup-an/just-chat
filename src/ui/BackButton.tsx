import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../utility/colors';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text onPress={() => navigation.pop()}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={25}
          color={colors.BUTTON_COLOR}
        />
      </Text>
    </View>
  );
};

export default BackButton;
