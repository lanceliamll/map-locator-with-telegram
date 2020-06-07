
import React, { useEffect } from 'react';
import { About } from "../screens"
import { createStackNavigator } from '@react-navigation/stack';

const AboutStack = createStackNavigator();

const AboutStackScreen = () => {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen name="About" component={About}/>
    </AboutStack.Navigator>
  )
}

export default AboutStackScreen;