import React, { useEffect } from 'react';
import { Login } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';

const LoginStack = createStackNavigator();

const LoginStackScreen = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Login" component={Login} />
    </LoginStack.Navigator>
  )
}

export default LoginStackScreen;