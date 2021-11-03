import React, {useContext, useEffect, useState} from 'react';
import {Button, FlatList, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FriendRequest} from '../../../context/actionTypes';
import {colors} from '../../../utility/colors';
import {styles} from '../../../utility/styles';

type RequestListProps = {
  receivedRequests: FriendRequest[];
};
const RequestList: React.FC<RequestListProps> = ({receivedRequests}) => {
  return (
    <View>
      <FlatList
        data={receivedRequests.map(eachRequest => ({
          senderId: eachRequest.sender,
          receiverId: eachRequest.receiver,
          senderEmail: eachRequest.senderEmail,
          receiverEmail: eachRequest.receiverEmail,
          status: eachRequest.status,
        }))}
        renderItem={({item}) => (
          <TouchableOpacity style={[styles.userImage, styles.listItem]}>
            <View style={[styles.borderBottom, styles.justifyBetween]}>
              <View style={[styles.flexRow]}>
                <Text style={styles.circle}>
                  <Icon name="person" size={45} color={colors.BUTTON_COLOR} />{' '}
                </Text>
                <View>
                  <Text style={styles.listItem}> {item.senderEmail}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.smallButton}>Accept</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RequestList;
