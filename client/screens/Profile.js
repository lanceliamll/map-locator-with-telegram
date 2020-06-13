import React, { useEffect, useContext } from "react";
import { Text, Button, View, Alert, StyleSheet } from "react-native";
import { GlobalContext } from "../store/context/GlobalContext";
import { Icon } from "react-native-elements"

const Profile = ({ navigation }) => {

  // get global
  const { auth, logout } = useContext(GlobalContext);

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

  const { username, email, age, gender, municipality } = auth.user

  return (
    <View style={styles.container}>
      <View style={styles.textTitleContainer}>
        <Text style={styles.textTitle}>Username:</Text>
        <Text style={styles.textLabel}>{username}</Text>
        <Text>       </Text>
      </View>
      <View style={styles.textTitleContainer}>
        <Text style={styles.textTitle}>Email:</Text>
        <Text style={styles.textLabel}>{email}</Text>
        <Text>       </Text>
      </View>
      <View style={styles.textTitleContainer}>
        <Text style={styles.textTitle}>Age:</Text>
        <Text style={styles.textLabel}>{age === null ? "Not specified" : age}</Text>
        <Icon name='edit' />
      </View>
      <View style={styles.textTitleContainer}>
        <Text style={styles.textTitle}>Gender:</Text>
        <Text style={styles.textLabel}>{gender === null ? "Not specified" : gender}</Text>
        <Icon name='edit' />
      </View>
      <View style={styles.textTitleContainer}>
        <Text style={styles.textTitle}>Municipality:</Text>
        <Text style={styles.textLabel}>{municipality === null ? "Not specified" : municipality}</Text>
        <Icon name='edit' />
      </View>
    </View>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  textTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10
  },
  textTitle: {
    fontSize: 15,
    width: 160,
  },
  textLabel: {
    fontSize: 15,
    width: 160,
    fontWeight: "bold"
  }
})

