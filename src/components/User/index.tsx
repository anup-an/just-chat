import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import Header from './Header';
import Search from './Search';
import {styles} from '../../utility/styles';
import List from './List';
import {getDatabase, ref, onValue} from 'firebase/database';
import {IUser} from '../../context/actionTypes';
import firebase from '../../firebase/config';
import {UserContext} from '../../context';

const User = () => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [foundUsers, setFoundUsers] = useState<IUser[]>([]);
  const {user} = useContext(UserContext);

  const searchUsers = (text: string) => {
    const foundUsers = allUsers.filter(
      friend => friend.email.toLowerCase().indexOf(text.toLowerCase()) > -1
    );
    setFoundUsers([...foundUsers]);
  };

  useEffect(() => {
    (async () => {
      try {
        console.log(user);
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

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View
        style={{
          backgroundColor: 'white',
          height: '87%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <Search searchUsers={searchUsers} />
        {foundUsers.length === 0 ? (
          <List allUsers={allUsers} />
        ) : (
          <List allUsers={foundUsers} />
        )}
      </View>
    </SafeAreaView>
  );
};
export default User;
