import React, {useContext} from 'react';
import {FlatList, TouchableOpacity, View, Text, Button} from 'react-native';
import {getDatabase, ref, onValue, push, set, update} from 'firebase/database';
import {getAuth} from 'firebase/auth';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../../../context';
import {FriendRequest, IUser} from '../../../context/actionTypes';
import {colors} from '../../../utility/colors';
import {styles} from '../../../utility/styles';
import firebase from '../../../firebase/config';

type UsersListProps = {
  users: IUser[];
  addFriend: (key: string, name: string) => void;
  sentRequests: FriendRequest[];
  receivedRequests: FriendRequest[];
  navigateToChat: (key: string, name: string) => void;
};

const UsersList: React.FC<UsersListProps> = ({
  users,
  addFriend,
  sentRequests,
  receivedRequests,
  navigateToChat,
}) => {
  const {user} = useContext(UserContext);
  const acceptRequest = (sender: string) => {
    try {
      const auth = getAuth(firebase);
      const userId = auth?.currentUser?.uid;
      const email = auth?.currentUser?.email;

      const db = getDatabase(firebase);
      const sendRequestRef = ref(db, 'requests/' + userId);
      const receiveRequestRef = ref(db, 'requests/' + sender);

      onValue(sendRequestRef, snapshot => {
        snapshot.forEach(child => {
          if (
            user.uid === child.val().receiver &&
            sender === child.val().sender
          ) {
            const key_id = child.key ? child.key : '';
            const updateObject = {
              [key_id]: {...child.val(), status: 'accepted'},
            };
            update(ref(db, 'requests/' + userId), updateObject);
          }
        });
      });
      onValue(receiveRequestRef, snapshot => {
        snapshot.forEach(child => {
          if (
            user.uid === child.val().receiver &&
            sender === child.val().sender
          ) {
            const key_id = child.key ? child.key : '';
            const updateObject = {
              [key_id]: {...child.val(), status: 'accepted'},
            };
            update(ref(db, 'requests/' + sender), updateObject);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FlatList
      data={users.map(eachUser => ({
        key: eachUser.uid,
        name: eachUser.email,
      }))}
      renderItem={({item}) => (
        <View style={[styles.userImage, styles.listItem]}>
          <View style={[styles.borderBottom, styles.justifyBetween]}>
            <View style={[styles.flexRow]}>
              <Text style={styles.circle}>
                <Icon name="person" size={45} color={colors.BUTTON_COLOR} />{' '}
              </Text>
              <View>
                <Text> {item.name}</Text>
              </View>
            </View>
            {receivedRequests.find(request => request.sender === item.key) ? (
              receivedRequests.find(request => request.sender === item.key)
                ?.status === 'accepted' ? (
                <TouchableOpacity
                  onPress={() => navigateToChat(item.key, item.name)}>
                  <Text style={[styles.smallButton, styles.orangeBackground]}>
                    Chat
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => acceptRequest(item.key)}>
                  <Text style={styles.smallButton}>Accept</Text>
                </TouchableOpacity>
              )
            ) : sentRequests.find(request => request.receiver === item.key) ? (
              <Text>Request pending</Text>
            ) : (
              <TouchableOpacity onPress={() => addFriend(item.key, item.name)}>
                <Text style={styles.smallButton}>Add</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    />
  );
};

export default UsersList;
