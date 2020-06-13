import React, { useEffect, useContext, useState } from "react";
import { Text, Button, View, Alert } from "react-native";
import { GlobalContext } from "../store/context/GlobalContext";
import { Icon } from "react-native-elements"

const Setup = ({ navigation }) => {

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Icon name='menu' onPress={() => navigation.openDrawer()} />,
      headerRight: () => <Icon name='exit-to-app' onPress={logoutToApp} />,
    })
  });

  const logoutToApp = () => {
    Alert.alert("Logout", "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: logout }
      ],
    )
  }

  return (
    <View>
      <Text>Setup your profile here</Text>
    </View>
  )
}

export default Setup;
