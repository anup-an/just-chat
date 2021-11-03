import React from 'react';
import {FlatList, TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {IUser} from '../../../context/actionTypes';
import {colors} from '../../../utility/colors';
import {styles} from '../../../utility/styles';

type FriendsListProps = {
  users: IUser[];
  navigateToChat: (key: string, name: string) => void;
};

const FriendsList: React.FC<FriendsListProps> = ({users, navigateToChat}) => {
  return (
    <FlatList
      data={users.map(eachUser => ({
        key: eachUser.uid,
        name: eachUser.email,
      }))}
      renderItem={({item}) => (
        <TouchableOpacity
          style={[styles.userImage, styles.listItem]}
          onPress={() => navigateToChat(item.key, item.name)}>
          <View style={[styles.borderBottom, styles.justifyBetween]}>
            <View style={[styles.flexRow]}>
              <Text style={styles.circle}>
                <Icon name="person" size={45} color={colors.BUTTON_COLOR} />{' '}
              </Text>
              <View>
                <Text style={styles.listItem}> {item.name}</Text>
              </View>
            </View>
            <Text>
              <Icon name="circle" size={10} color={colors.BUTTON_COLOR} />{' '}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default FriendsList;
