/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../../utility/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {IUser} from '../../context/actionTypes';
import {colors} from '../../utility/colors';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {getDatabase, ref, onValue} from 'firebase/database';
import firebase from '../../firebase/config';
import {UserContext} from '../../context';
import {StackNavigationProp} from '@react-navigation/stack';

const List = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const {user} = useContext(UserContext);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
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
  return (
    <FlatList
      data={allUsers.map(eachUser => ({
        key: eachUser.uid,
        name: eachUser.email,
      }))}
      renderItem={({item}) => (
        <TouchableOpacity
          style={[styles.userImage, styles.listItem]}
          onPress={() =>
            navigation.navigate('Chat', {receiverId: item.key, name: item.name})
          }>
          <View style={[styles.borderBottom, styles.justifyBetween]}>
            <View style={[styles.flexRow]}>
              <Text style={styles.circle}>
                <Icon name="person" size={45} color={colors.BUTTON_COLOR} />{' '}
              </Text>
              <View>
                <Text style={styles.listItem}> {item.name}</Text>
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
