
import React, { useEffect } from 'react';
import { AddReport } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';

const AddReportStack = createStackNavigator();

const AddReportStackScreen = () => {
  return (
    <AddReportStack.Navigator>
      <AddReportStack.Screen options={{ headerTitleStyle:{ fontSize: 15 }}} name="Symptoms/Location Reports" component={AddReport}/>
    </AddReportStack.Navigator>
  )
}

export default AddReportStackScreen;