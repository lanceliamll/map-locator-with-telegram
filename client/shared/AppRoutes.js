import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { GlobalContext } from "../store/context/GlobalContext";
import { HomeStackScreen, ProfileStackScreen, SetupStackScreen, AboutStackScreen, AddReportStackScreen, PrecautionStackScreen, LoginStackScreen, RegisterStackScreen } from '../stacks';
import { DrawerContent } from "./DrawerContent";

const DrawerStack = createDrawerNavigator();

const AppRoutes = () => {
  // get global
  const { auth } = useContext(GlobalContext);

  return (
    <>
      <DrawerStack.Navigator initialRouteName={auth ? "HomeStackScreen" : "LoginStackScreen"} >
        {auth ? (
          <>
            <DrawerStack.Screen name="Profile" component={ProfileStackScreen} />
            <DrawerStack.Screen name="Home" component={HomeStackScreen} />
            <DrawerStack.Screen name="Report Symptoms/Location " component={AddReportStackScreen} />
            <DrawerStack.Screen name="Precaution" component={PrecautionStackScreen} />
            <DrawerStack.Screen name="About" component={AboutStackScreen} />

          </>
        ) : (
            <>
              <DrawerStack.Screen name="Login" component={LoginStackScreen} />
              <DrawerStack.Screen name="Register" component={RegisterStackScreen} />
            </>
          )}
      </DrawerStack.Navigator>
    </>
  )
}

export default AppRoutes;