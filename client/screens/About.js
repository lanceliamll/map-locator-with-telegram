import React, { useEffect, useContext } from "react";
import { Text, Button, View } from "react-native";
import { GlobalContext } from "../store/context/GlobalContext";
import { Icon } from "react-native-elements"

const About = ({ navigation }) => {
  const { logout } = useContext(GlobalContext);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Icon name='menu' onPress={() => navigation.openDrawer() } />,
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
      <Text>This application deals to achieve an easy and useful mobile application to check the user’s body temperature and trace who were suspected for corona virus. </Text>
    </View>
  )
}

export default About;
