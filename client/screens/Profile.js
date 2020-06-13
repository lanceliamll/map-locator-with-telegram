import React, { useState, useEffect, useContext } from "react";
import { Text, Button, View, Alert, StyleSheet, Modal, TextInput } from "react-native";
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
  }, []);

  //modal
  const [showAge, setShowAge] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showMunicipality, setShowMunicipality] = useState(false);

  // age
  const [userAge, setUserAge] = useState(auth.age || null)

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
        <Icon name='edit' onPress={() => showAge ? setShowAge(false) : setShowAge(true)} />
      </View>
      <View style={styles.textTitleContainer}>
        <Text style={styles.textTitle}>Gender:</Text>
        <Text style={styles.textLabel}>{gender === null ? "Not specified" : gender}</Text>
        <Icon name='edit' onPress={() => showGender ? setShowGender(false) : setShowGender(true)} />
      </View>
      <View style={styles.textTitleContainer}>
        <Text style={styles.textTitle}>Municipality:</Text>
        <Text style={styles.textLabel}>{municipality === null ? "Not specified" : municipality}</Text>
        <Icon name='edit' onPress={() => showMunicipality ? setShowMunicipality(false) : setShowMunicipality(true)} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showAge}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalView}>
          <TextInput
            onChangeText={(text) => setUserAge(text)}
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            maxLength={3}
          />
          <View>
            <Button title="Save" />
            <Text></Text>
            <Button onPress={() => setShowAge(false)} title="Cancel" />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showGender}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalView}>
          <TextInput style={styles.input} placeholder="Gender" />
          <View>
            <Button title="Save" />
            <Text></Text>
            <Button onPress={() => setShowGender(false)} title="Cancel" />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showMunicipality}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalView}>
          <TextInput style={styles.input} placeholder="Municipality" />
          <View>
            <Button title="Save" />
            <Text></Text>
            <Button onPress={() => setShowMunicipality(false)} title="Cancel" />
          </View>
        </View>
      </Modal>
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
    fontSize: 12,
    width: 160,
  },
  textLabel: {
    fontSize: 13,
    width: 160,
    fontWeight: "bold"
  },
  modalView: {
    marginTop: 150,
    height: 200,
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  cancelButton: {
    marginTop: 10
  },
  input: {
    marginTop: 15,
    marginBottom: 15,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
  },
})

