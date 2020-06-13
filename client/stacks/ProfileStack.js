
import React, { useEffect } from 'react';
import { Profile } from "../screens"
import { createStackNavigator } from '@react-navigation/stack';

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile}/>
    </ProfileStack.Navigator>
  )
}

export default ProfileStackScreen;