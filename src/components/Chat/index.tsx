/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useLayoutEffect, useState} from 'react';
import {View} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {getDatabase, ref, onValue} from 'firebase/database';
import firebase from '../../firebase/config';
import {UserContext} from '../../context';
import {colors} from '../../utility/colors';
import {styles} from '../../utility/styles';
import ChatBox from './ChatBox';
import Message from './Message';
import {IMessage} from '../../context/actionTypes';

const Chat = () => {
  const route: RouteProp<
    {params: {receiverId: string; name: string}},
    'params'
  > = useRoute();
  {
    console.log(route.params);
  }
  const {user} = useContext(UserContext);
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);

  useLayoutEffect(() => {
    (async () => {
      try {
        const db = getDatabase(firebase);
        const messagesRef = ref(db, 'messages/');
        const messages: IMessage[] = [];

        await onValue(messagesRef, snapshot => {
          if (snapshot.val()) {
            const messageObject = snapshot.val()[user.uid];
            if (messageObject) {
              for (let key in messageObject) {
                if (
                  messageObject[key].sender === route.params.receiverId ||
                  messageObject[key].receiver === route.params.receiverId
                ) {
                  messages.push({
                    message: messageObject[key].message,
                    sender: messageObject[key].sender,
                    receiver: messageObject[key].receiver,
                    status: messageObject[key].status,
                  });
                }
              }
            }
          }
        });
        setTimeout(() => {
          console.log(messages);
          setAllMessages([...messages]);
        }, 1000);
      } catch (err) {
        throw new Error('Messages not loaded from server');
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 10,
          height: '67%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        {allMessages.map(message =>
          message.status === 'sent' ? (
            <Message status="sent" message={message.message} />
          ) : (
            <Message status="received" message={message.message} />
          ),
        )}
      </View>
      <View
        style={{
          backgroundColor: colors.HEADER_BACKGROUND_COLOR,
        }}>
        <ChatBox
          currentUserId={user.uid}
          receiverId={route.params.receiverId}
        />
      </View>
    </View>
  );
};
export default Chat;
