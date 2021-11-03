import React, {useContext} from 'react';
import {FlatList, TouchableOpacity, View, Text, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../../../context';
import {FriendRequest, IUser} from '../../../context/actionTypes';
import {colors} from '../../../utility/colors';
import {styles} from '../../../utility/styles';

type UsersListProps = {
  users: IUser[];
  addFriend: (key: string, name: string) => void;
  sentRequests: FriendRequest[];
  receivedRequests: FriendRequest[];
};

const UsersList: React.FC<UsersListProps> = ({
  users,
  addFriend,
  sentRequests,
  receivedRequests,
}) => {
  const {user} = useContext(UserContext);
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
              <Button title="Accept friend request" onPress={() => {}}>
                <Text style={styles.smallButton}>Accept</Text>
              </Button>
            ) : sentRequests.find(request => request.receiver === item.key) ? (
              <Text>Pending</Text>
            ) : (
              <Text onPress={() => addFriend(item.key, item.name)}>
                <Icon name="add" size={20} color={colors.BUTTON_COLOR} />
              </Text>
            )}
          </View>
        </View>
      )}
    />
  );
};

export default UsersList;
