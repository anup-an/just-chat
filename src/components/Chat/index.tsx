import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../../utility/colors';
import {styles} from '../../utility/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Chat = ({route}) => {
  const {name} = route.params;
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 10,
          height: '87%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          textAlign: 'right',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              padding: 10,
            }}>
            <Text
              style={{
                borderWidth: 1,
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                textAlign: 'right',
                padding: 4,
                marginBottom: 20,
                backgroundColor: colors.HEADER_BACKGROUND_COLOR,
              }}>
              You: Hi, how are you ?
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              padding: 10,
            }}>
            <Text
              style={{
                borderWidth: 1,
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                textAlign: 'right',
                padding: 4,
                marginBottom: 20,
                backgroundColor: colors.BUTTON_COLOR,
                color: 'white',
              }}>
              {name}: Good. How are you ?
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: colors.HEADER_BACKGROUND_COLOR,
          }}>
          <View
            style={[
              styles.justifyBetween,
              styles.searchBorder,
              styles.whiteBackground,
            ]}>
            <TextInput editable maxLength={40} placeholder="Send message" />
            <View style={[styles.searchButton, styles.buttonColor]}>
              <Text>
                <Icon name="send" size={20} color="white" />
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Chat;
