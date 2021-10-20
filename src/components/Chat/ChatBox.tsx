import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {getDatabase, ref, set, push} from 'firebase/database';
import firebase from '../../firebase/config';

import {styles} from '../../utility/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IProps {
  currentUserId: string;
  receiverId: string;
}
const ChatBox: React.FC<IProps> = ({currentUserId, receiverId}) => {
  const [message, setMessage] = useState<string>('');
  const handleChangeText = (text: string) => {
    setMessage(text);
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
      <View style={[styles.searchButton, styles.buttonColor]}>
        <Text onPress={handleSendMessage}>
          <Icon name="send" size={20} color="white" />
        </Text>
      </View>
    </View>
  );
};

export default ChatBox;
