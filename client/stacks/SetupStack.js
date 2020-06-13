
import React, { useEffect } from 'react';
import { Setup } from "../screens"
import { createStackNavigator } from '@react-navigation/stack';

const SetupStack = createStackNavigator();

const SetupStackScreen = () => {
  return (
    <SetupStack.Navigator>
      <SetupStack.Screen name="Setup" component={Setup}/>
    </SetupStack.Navigator>
  )
}

export default SetupStackScreen;