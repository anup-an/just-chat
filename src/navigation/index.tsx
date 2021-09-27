import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  ChatScreen,
  HomeScreen,
  LoginScreen,
  SignUpScreen,
  UserScreen,
} from '../screens';
import {NavigationContainer} from '@react-navigation/native';
import {View} from 'react-native';

import {colors} from '../utility/colors';
import Header from '../components/User/Header';
import BackButton from '../ui/BackButton';

const Stack = createStackNavigator();

const NavRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerStyle: {backgroundColor: colors.HEADER_BACKGROUND_COLOR},
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen
          name="Chat"
          options={{
            headerShown: true,
            title: 'Chat',
            headerTitleAlign: 'left',
            headerStyle: {backgroundColor: colors.HEADER_BACKGROUND_COLOR},

            header: () => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'orange',
                }}>
                <BackButton />
                <View style={{width: '94%'}}>
                  <Header />
                </View>
              </View>
            ),

            headerTitleContainerStyle: {
              left: 0,
            },
          }}
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavRoutes;
