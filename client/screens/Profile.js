import React, { useState, useEffect, useContext } from "react";
import { Text, View, Alert, StyleSheet, Modal, TextInput, ScrollView } from "react-native";
import { GlobalContext } from "../store/context/GlobalContext";
import { Icon, Button } from "react-native-elements";
import RNPickerSelect from 'react-native-picker-select';
import citiesJSON from "../helpers/cities.json"
import dayjs from "dayjs"
import axios from "axios";

const Profile = ({ navigation }) => {

  // get global
  const { auth, logout, storeTokenWithUser, saveAge, saveGender, saveMunicipality, userTemps } = useContext(GlobalContext);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Icon name='menu' onPress={() => navigation.openDrawer()} />,
      headerRight: () => <Icon name='exit-to-app' onPress={logoutToApp} />
    });

    const userToken = {
      userToken: "Bearer " + auth.jwt,
      id: auth.user.id
    }
    storeTokenWithUser(userToken);
    if (!allMunicip.length) setAllMunicip(transformUserMunicip(citiesJSON));

    getUserTemps(auth.user.id);
  }, [storeTokenWithUser]);

  //modal
  const [showAge, setShowAge] = useState(false);
  const [showGender, setShowGender] = useState(false);
  const [showMunicipality, setShowMunicipality] = useState(false);

  // age
  const [userAge, setUserAge] = useState(auth.age || 0);
  const [userGender, setUserGender] = useState(auth.gender || null);
  const [userMunicip, setUserMunicip] = useState(auth.municipality || null);

  const [allMunicip, setAllMunicip] = useState([]);
  const [currentUserTemps, setCurrentUserTemps] = useState([]);
  const [localFetching, setLocalFetching] = useState(false);

  const transformUserMunicip = (cities) => {
    return cities.map(city => {
      return {
        label: city.name,
        value: city.name
      }
    });
  }

  const getUserTemps = (id) => {
    setLocalFetching(true);
    axios.get(`https://map-tracker-tele.herokuapp.com/usertemps?user.id=${id}&_sort=id:DESC`)
      .then(response => {
        setLocalFetching(false);
        setCurrentUserTemps(response.data);
      })
      .catch(err => {
        setLocalFetching(false);
        console.log(err)
      })
  }

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



  const submitAge = age => {
    const { id } = auth.user;
    const data = {
      age
    }
    saveAge(id, data);
    setShowAge(false);
    Alert.alert("Success", "Saved Successfully");
  };

  const submitGender = gender => {
    const { id } = auth.user;
    const data = {
      gender
    }
    saveGender(id, data);
    setShowGender(false);
    Alert.alert("Success", "Saved Successfully");
  };

  const submitMunicipality = municipality => {
    const { id } = auth.user;
    const data = {
      municipality
    }
    saveMunicipality(id, data);
    setShowMunicipality(false);
    Alert.alert("Success", "Saved Successfully");
  }

  const { username, email, age, gender, municipality } = auth.user;
  if (auth.user === null) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.photo}>
        {/* {console.log(auth.user.profilePic.url)}
        <Avatar
          size="xlarge"
          rounded
          source={{
            uri: """" + auth.user.profilePic.url || null
          }}
        /> */}
      </View>
      <Text style={styles.boldText}>User Information</Text>
      <View style={styles.textTitleContainer}>
        <Text style={styles.textTitle}>Username:</Text>
        <Text style={styles.textLabel}>{username || null}</Text>
        <Text>       </Text>
      </View>
      <View style={styles.textTitleContainer}>
        <Text style={styles.textTitle}>Email:</Text>
        <Text style={styles.textLabel}>{email || null}</Text>
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
            <Button onPress={() => submitAge(userAge)} title="Save" />
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
          {/* <TextInput style={styles.input} placeholder="Gender" /> */}
          <RNPickerSelect
            style={styles.dropdown}
            onValueChange={(value) => setUserGender(value)}
            items={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
              { label: 'Others', value: 'Others' },
            ]}
          />
          <View style={styles.buttons}>
            <Button onPress={() => submitGender(userGender)} title="Save" />
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
          <RNPickerSelect
            style={styles.dropdown}
            onValueChange={(value) => setUserMunicip(value)}
            items={allMunicip.length && allMunicip}
          />
          <View>
            <Button onPress={() => submitMunicipality(userMunicip)} title="Save" />
            <Text></Text>
            <Button onPress={() => setShowMunicipality(false)} title="Cancel" />
          </View>
        </View>
      </Modal>

      <View style={styles.userTempContainer}>
        <View style={styles.titleRefresh}>
          <Text style={styles.boldText}>User Temperature</Text>
          <Button loading={localFetching} title="Refresh" onPress={() => getUserTemps(auth.user.id)} />
        </View>
        {!currentUserTemps.length ? <View>
          <Text style={styles.boldText}>The user haven't check temperature yet.</Text>
        </View>
          : currentUserTemps.map(data => {
            return (
              <View style={styles.listCard} key={data.id}>
                <Text>Temperature: <Text style={styles.boldText}>{data.currentTemperature}</Text></Text>
                <Text>Date Scanned: <Text style={styles.boldText}>{dayjs(data.createdAt).format("MMMM DD YYYY, h:mm A")}</Text></Text>
              </View>
            )
          })}
      </View>
    </ScrollView>
  )
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    overflow: "scroll",
    height: '100%',
    width: '100%'
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
  dropdown: {
    color: "black"
  },
  photo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  userTempContainer: {
    paddingTop: 20,
    paddingBottom: 20
  },
  listCard: {
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16
  },
  titleRefresh: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
})

