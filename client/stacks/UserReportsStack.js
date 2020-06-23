
import React, { useEffect } from 'react';
import { UserReports } from "../screens"
import { createStackNavigator } from '@react-navigation/stack';

const UserReportsStack = createStackNavigator();

const UserReportsScreen = () => {
  return (
    <UserReportsStack.Navigator>
      <UserReportsStack.Screen name="UserReports" component={UserReports}/>
    </UserReportsStack.Navigator>
  )
}

export default UserReportsScreen;