import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {styles} from '../../utility/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../utility/colors';
import {useNavigation} from '@react-navigation/core';
import {UserContext} from '../../context';
import {getAuth, signOut} from 'firebase/auth';
import firebase from '../../firebase/config';
import {StackNavigationProp} from '@react-navigation/stack';

const Header: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const {user, logOutUser} = useContext(UserContext);
  const handleLogOut = async () => {
    const auth = getAuth(firebase);
    signOut(auth)
      .then(() => {
        logOutUser(user);
        navigation.navigate('Home');
      })
      .catch(error => {
        throw new Error(error);
      });
  };
  return (
    <View>
      <View style={styles.userImage}>
        <View style={styles.justifyBetween}>
          <Text style={styles.circle}>
            <Icon name="person" size={45} color={colors.BUTTON_COLOR} />{' '}
          </Text>
          <View>
            <Text style={styles.whiteText}>{user.email}</Text>
            <Text style={[styles.whiteText, styles.justifyBetween]}>
              <Text>Active now </Text>
              <Icon
                name="circle"
                size={10}
                color={colors.ACTIVE_STATUS_COLOR}
              />
            </Text>
          </View>
        </View>

        <Text onPress={handleLogOut}>
          <Icon name="logout" size={30} color={colors.BUTTON_COLOR} />
        </Text>
      </View>
    </View>
  );
};

export default Header;
