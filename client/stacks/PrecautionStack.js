import React, { useEffect } from 'react';
import { Precaution } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';

const PrecautionStack = createStackNavigator();

const PrecautionStackScreen = () => {
  return (
    <PrecautionStack.Navigator>
      <PrecautionStack.Screen name="Precaution" component={Precaution} />
    </PrecautionStack.Navigator>
  )
}

export default PrecautionStackScreen;