import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../utility/colors';

interface IMessageProps {
  status: string;
  message: string;
}
const Message: React.FC<IMessageProps> = ({status, message}) => {
  return (
    <View>
      {status === 'sent' ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: 5,
          }}>
          <Text
            style={{
              borderWidth: 1,
              borderTopRightRadius: 8,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              textAlign: status === 'sent' ? 'right' : 'left',
              padding: 4,
              marginBottom: 20,
              backgroundColor: colors.HEADER_BACKGROUND_COLOR,
            }}>
            {message}
          </Text>
        </View>
      ) : (
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
              textAlign: 'left',
              padding: 4,
              marginBottom: 20,
              backgroundColor: colors.BUTTON_COLOR,
            }}>
            {message}
          </Text>
        </View>
      )}
    </View>
  );
};
export default Message;
