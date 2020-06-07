
import React, { useEffect } from 'react';
import { AddReport } from "../screens";
import { createStackNavigator } from '@react-navigation/stack';

const AddReportStack = createStackNavigator();

const AddReportStackScreen = () => {
  return (
    <AddReportStack.Navigator>
      <AddReportStack.Screen name="Report Location" component={AddReport}/>
    </AddReportStack.Navigator>
  )
}

export default AddReportStackScreen;