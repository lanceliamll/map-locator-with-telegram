import React, { useEffect, useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
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
    <View style={styles.aboutContainer}>
      <Text>&nbsp;COVAT is a mobile application that will provide in the fight against the COVID-19 pandemic. It will help the authorized people (Local Government Unit/ Department of Health) to have an easy and effective way of contact tracing. To locate the places where the users reported their locations and to check if they have symptoms from the virus. This mobile application includes a non-contact infrared thermometer that will check and record the body temperature of the user. The user must be logged in, to send the measured temperature to his/her account on the server. </Text>
    </View>
  )
}

export default About;


const styles = StyleSheet.create({
  aboutContainer: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10
  },
})
