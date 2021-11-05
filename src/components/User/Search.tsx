import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {styles} from '../../utility/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface SearchProps {
  searchUsers: (keyword: string) => void;
}
const Search: React.FC<SearchProps> = ({searchUsers}) => {
  return (
    <View style={[styles.justifyBetween, styles.searchBorder]}>
      <TextInput
        editable
        maxLength={40}
        placeholder="Search friends"
        onChangeText={text => searchUsers(text)}
      />
      <View style={[styles.searchButton, styles.buttonColor]}>
        <Text>
          <Icon name="clear" size={20} color="white" />
        </Text>
      </View>
    </View>
  );
};

export default Search;
