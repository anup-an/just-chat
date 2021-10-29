import React, {useState} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {getDatabase, ref, set, push} from 'firebase/database';
import firebase from '../../firebase/config';
import {colors} from '../../utility/colors';
import {styles} from '../../utility/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, MediaType} from 'react-native-image-picker';

interface IProps {
  currentUserId: string;
  receiverId: string;
}
const ChatBox: React.FC<IProps> = ({currentUserId, receiverId}) => {
  const [message, setMessage] = useState<string>('');
  const handleChangeText = (text: string) => {
    setMessage(text);
  };

  type Options = {
    mediaType: MediaType;
    saveToPhotos: boolean;
  };
  const options: Options = {
    mediaType: 'photo',
    saveToPhotos: true,
  };
  const requestPermission = async () => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      const isCameraAuthorized = await PermissionsAndroid.check(
        'android.permission.CAMERA',
      );
      const isStorageAuthorized = await PermissionsAndroid.check(
        'android.permission.WRITE_EXTERNAL_STORAGE',
      );

      if (!isCameraAuthorized || !isStorageAuthorized) {
        console.log('Failed to get the required permissions.');
      } else {
        handleSelectImage();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectImage = () => {
    console.log('camera opened');
    launchCamera(options, response => {
      if (response.errorCode) {
        console.log('Error launching camera', response.errorCode);
      } else if (response.didCancel) {
        console.log('User cancelled the process', response.didCancel);
      } else {
        console.log(response.assets ? response.assets[0] : '');
      }
    });
  };

  const saveMessage = async (userId: string) => {
    try {
      const db = getDatabase(firebase);

      const messagesRef = ref(db, 'messages/' + userId);
      const newMessageRef = await push(messagesRef);
      set(newMessageRef, {
        sender: currentUserId,
        receiver: receiverId,
        status: userId === currentUserId ? 'sent' : 'received',
        message: message,
      });
    } catch (err) {
      throw new Error('Message not sent');
    }
  };
  const handleSendMessage = () => {
    saveMessage(currentUserId);
    saveMessage(receiverId);
  };
  return (
    <View
      style={[
        styles.justifyBetween,
        styles.searchBorder,
        styles.whiteBackground,
      ]}>
      <TextInput
        editable
        maxLength={40}
        placeholder="Send message"
        onChangeText={text => handleChangeText(text)}
      />
      <View style={styles.justifyBetween}>
        <Text onPress={requestPermission}>
          <Icon name="camera" size={30} color={colors.PLACEHOLDER_TEXT_COLOR} />
        </Text>
        <Text>
          <Icon
            name="attachment"
            size={30}
            color={colors.PLACEHOLDER_TEXT_COLOR}
          />
        </Text>
        <TouchableOpacity style={[styles.searchButton, styles.buttonColor]}>
          <Text onPress={handleSendMessage}>
            <Icon name="send" size={40} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBox;
