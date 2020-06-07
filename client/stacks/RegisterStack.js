import React, { useEffect } from 'react';
import { Register } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';

const RegisterStack = createStackNavigator();

const RegisterStackScreen = () => {
  return (
    <RegisterStack.Navigator>
      <RegisterStack.Screen name="Register" component={Register} />
    </RegisterStack.Navigator>
  )
}

export default RegisterStackScreen;