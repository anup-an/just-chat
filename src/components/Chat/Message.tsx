import React from 'react';
import {Image, Text, View} from 'react-native';
import {colors} from '../../utility/colors';

interface IFiles {
  filename: string;
  fileSize: string;
  height: string;
  type: string;
  uri: string;
  width: string;
}
interface IMessageProps {
  status: string;
  message: string;
  image: string;
  files: IFiles[];
}
const Message: React.FC<IMessageProps> = ({status, message, image, files}) => {
  return (
    <View>
      {console.log('image uri', image)}
      {status === 'sent' && message !== '' ? (
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
      ) : null}
      {status === 'sent' && image !== '' ? (
        <Image
          source={{
            uri: image,
          }}
          style={{width: 100, height: 100}}
          resizeMode={'cover'}
        />
      ) : null}
      {status === 'received' && message !== '' ? (
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
      ) : null}
      {status === 'received' && image !== '' ? (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            padding: 10,
          }}>
          <Image
            source={{
              uri: image,
            }}
            style={{width: 100, height: 100}}
            resizeMode={'cover'}
          />
        </View>
      ) : null}
    </View>
  );
};
export default Message;
