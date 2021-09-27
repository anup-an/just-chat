import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../utility/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../utility/colors';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

const List = () => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={[
        {key: 'Friend 1'},
        {key: 'Friend 2'},
        {key: 'Friend 3'},
        {key: 'Friend 4'},
        {key: 'Friend 5'},
        {key: 'Friend 6'},
        {key: 'Friend 7'},
        {key: 'Friend 8'},
        {key: 'Friend 9'},
        {key: 'Friend 10'},
        {key: 'Friend 11'},
        {key: 'Friend 12'},
        {key: 'Friend 13'},
      ]}
      renderItem={({item}) => (
        <TouchableOpacity
          style={[styles.userImage, styles.listItem]}
          onPress={() => navigation.navigate('Chat', {name: item.key})}>
          <View style={[styles.borderBottom, styles.justifyBetween]}>
            <View style={[styles.flexRow]}>
              <Text style={styles.circle}>
                <Icon name="person" size={45} color={colors.BUTTON_COLOR} />{' '}
              </Text>
              <View>
                <Text style={styles.listItem}> {item.key}</Text>
                <Text> You: Hello</Text>
              </View>
            </View>
            <Text>
              <Icon
                name="circle"
                size={10}
                color={colors.PASSIVE_STATUS_COLOR}
              />
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default List;
