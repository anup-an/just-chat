/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FriendRequest, IUser} from '../../../context/actionTypes';
import {getDatabase, ref, onValue, push, set, update} from 'firebase/database';
import firebase from '../../../firebase/config';
import {UserContext} from '../../../context';
import {StackNavigationProp} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UsersList from './UsersList';
import {getAuth} from 'firebase/auth';
import FriendsList from './FriendsList';
import RequestList from './RequestList';
import {View} from 'react-native';

const List: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const {user} = useContext(UserContext);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendRequest[]>([]);

  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    (async () => {
      try {
        const db = getDatabase(firebase);
        const usersRef = ref(db, 'users/');
        const users: IUser[] = [];
        onValue(usersRef, snapshot => {
          snapshot.forEach(child => {
            if (user.uid !== child.val().uid) {
              users.push(child.val());
            }
          });
        });
        setTimeout(() => {
          setAllUsers([...users]);
        }, 100);
      } catch (err) {
        throw new Error('Unable to get data from server');
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const db = getDatabase(firebase);
        const requestsRef = ref(db, 'requests/' + user.uid);
        const receivedAddRequests: FriendRequest[] = [];
        const sentAddRequests: FriendRequest[] = [];
        onValue(requestsRef, snapshot => {
          snapshot.forEach(child => {
            const requestObject = child.val();
            console.log(requestObject);
            if (user.uid === requestObject.receiver) {
              receivedAddRequests.push(requestObject);
            } else {
              sentAddRequests.push(requestObject);
            }
          });
        });
        setTimeout(() => {
          setReceivedRequests([...receivedAddRequests]);
          setSentRequests([...sentAddRequests]);
        }, 100);
      } catch (err) {
        throw new Error('Unable to get data from server');
      }
    })();
  }, []);

  const addFriend = async (key: string, name: string) => {
    try {
      const auth = getAuth(firebase);
      const userId = auth?.currentUser?.uid;
      const email = auth?.currentUser?.email;

      const db = getDatabase(firebase);
      const sendRequestRef = ref(db, 'requests/' + userId);
      const receiveRequestRef = ref(db, 'requests/' + key);

      const newSendRequestRef = await push(sendRequestRef);
      const newReceiveRequestRef = await push(receiveRequestRef);

      set(newSendRequestRef, {
        sender: userId,
        receiver: key,
        senderEmail: email,
        receiverEmail: name,
        status: 'pending',
      });

      set(newReceiveRequestRef, {
        sender: userId,
        receiver: key,
        senderEmail: email,
        receiverEmail: name,
        status: 'pending',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToChat = (key: string, name: string) => {
    navigation.navigate('Chat', {receiverId: key, name: name});
  };
  return (
    <UsersList
      users={allUsers}
      sentRequests={sentRequests}
      receivedRequests={receivedRequests}
      addFriend={addFriend}
      navigateToChat={navigateToChat}
    />
  );
};

export default List;
