import React, { useEffect } from 'react';
import { Home } from "../screens"
import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  )
}

export default HomeStackScreen;