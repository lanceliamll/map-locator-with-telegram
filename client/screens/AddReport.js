import React, { useState, useEffect, useContext } from "react";
import { Text, TextInput, Button, View, Picker, StyleSheet, CheckBox, Modal, Alert } from "react-native";
import { GlobalContext, GlobalProvider } from "../store/context/GlobalContext";
import { useForm } from "react-hook-form";
import { Icon } from 'react-native-elements'
import axios from "axios";

const AddReport = ({ navigation }) => {
  // store
  const { auth, markers, currentLocation, getCurrentLocation, reportLocation, logout, getAllMarkers } = useContext(GlobalContext);

  const { register, handleSubmit, setValue } = useForm();

  const [reportForm, setReportForm] = useState({
    isCommon: false,
    isUncommon: false,
    isSevere: false
  })

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

  // getLocations to be mapped
  useEffect(() => {

    navigation.setOptions({
      headerLeft: () => <Icon name='menu' onPress={() => navigation.openDrawer()} />,
      headerRight: () => <Icon name='exit-to-app' onPress={logoutToApp} />,
    })

    if (currentLocation === null) {
      getCurrentLocation();
    }
    register('mobileNumber');
    register('address');
  }, []);

  const [severe, setSevere] = useState(false);
  const [common, setCommon] = useState(false);
  const [uncommon, setUncommon] = useState(false);
  const [severeModal, setSevereModal] = useState(false);
  const [commonModal, setCommmonModal] = useState(false);
  const [uncommonModal, setUncommonModal] = useState(false);
  const [communityCases, setCommunityCases] = useState(false);


  const report = formData => {

    // const { coords } = currentLocation;
    const otherData = {
      user: auth.user.id,
      severe,
      common,
      uncommon,
      communityCases
    }

    const locationData = {
      data: [
        {
          data: currentLocation
        }
      ]
    }

    const { mobileNumber } = formData;

    if (mobileNumber === null || mobileNumber === undefined) {
      Alert.alert("Error", "Mobile Number is required and identify the symptoms");
    } else {
      if (currentLocation === null) {
        Alert.alert("Location Error", "Please turn on your GPS and try again.")
        getCurrentLocation();
      } else {
        axios.post("https://api.telegram.org/bot1139102468:AAG53n8z57t1t4vnrkDWQJgoM7o03OW5c5o/sendMessage", {
          "chat_id": "-1001252205511",
          "text": `Email: ${auth.user.email} \n Mobile Number: ${formData.mobileNumber} \n Severe: ${severe} \n Common: ${common} \n Uncommon: ${uncommon} \n Location: http://google.com/maps?q=${currentLocation.coords.latitude},${currentLocation.coords.longitude}
      `
        }).then(res => {
          console.log(res);
        }).catch(err => console.log(err))

        const form = Object.assign({}, formData, otherData, locationData);
        reportLocation(form);
        Alert.alert('Success', "Reported Successfully");
        getAllMarkers();
        navigation.goBack();
      }
    }

  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={severeModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalView}>
          <View>
            <Text style={styles.close} onPress={() => setSevereModal(false)}>Close</Text>
          </View>
          <View>
            <Text style={styles.title}> Serious/Severe symptoms:</Text>
            <Text style={styles.content}>{'\u2B24'} difficulty breathing or shortness of breath</Text>
            <Text style={styles.content} >{'\u2B24'} chest pain or pressure</Text>
            <Text style={styles.content}>{'\u2B24'} loss of speech or movement</Text>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={commonModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalView}>
          <View>
            <Text style={styles.close} onPress={() => setCommmonModal(false)}>Close</Text>
          </View>
          <View>
            <Text style={styles.title}> Most common symptoms:</Text>
            <Text style={styles.content}>{'\u2B24'} Fever</Text>
            <Text style={styles.content} >{'\u2B24'} Dry Cough</Text>
            <Text style={styles.content}>{'\u2B24'} Tiredness</Text>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={uncommonModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalView}>
          <View>
            <Text style={styles.close} onPress={() => setUncommonModal(false)}>Close</Text>
          </View>
          <View>
            <Text style={styles.title}> Less common/Uncommon symptoms:</Text>
            <Text style={styles.content}>{'\u2B24'} aches and pains</Text>
            <Text style={styles.content} >{'\u2B24'} sore throat</Text>
            <Text style={styles.content}>{'\u2B24'} conjunctivitis</Text>
            <Text style={styles.content}>{'\u2B24'} headache</Text>
            <Text style={styles.content}>{'\u2B24'} loss of taste or smell</Text>
            <Text style={styles.content}>{'\u2B24'} a rash on skin, or discolouration of fingers or toes</Text>
          </View>
        </View>
      </Modal>

      {/* <TextInput
        onChangeText={text => setValue("mobileNumber", text)}
        style={styles.input}
        placeholder=" Mobile Number"
        keyboardType="numeric"
      /> */}

      <View >
        <View style={styles.checkBoxes}>
          <CheckBox value={severe} onValueChange={() => severe ? setSevere(false) : setSevere(true)} />
          <Text>Severe Symptoms    <Text style={styles.readMore} onPress={() => severeModal ? setSevereModal(false) : setSevereModal(true)}>Read More</Text></Text>
        </View>
        <View style={styles.checkBoxes}>
          <CheckBox value={common} onValueChange={() => common ? setCommon(false) : setCommon(true)} />
          <Text>Common Symptoms    <Text style={styles.readMore} onPress={() => commonModal ? setCommmonModal(false) : setCommmonModal(true)}>Read More</Text></Text>
        </View>
        <View style={styles.checkBoxes}>
          <CheckBox value={uncommon} onValueChange={() => uncommon ? setUncommon(false) : setUncommon(true)} />
          <Text>Uncommon Symptoms   <Text style={styles.readMore} onPress={() => uncommonModal ? setUncommonModal(false) : setUncommonModal(true)}>Read More</Text></Text>
        </View>
      </View>

      <View style={styles.checkBoxes}>
        <CheckBox value={uncommon} onValueChange={() => communityCases ? setCommunityCases(false) : setCommunityCases(true)} />
        <Text>Is there any infected in your community?</Text>
      </View>
      <View style={styles.reportButton}>
        <Button onPress={handleSubmit(report)} title="Report" style={styles.input} />
        <Text>Note: Your location will be automatically submitted with this form.</Text>
      </View>
    </View>
  )
}

export default AddReport;



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
  reportButton: {
    paddingTop: 20
  },
  checkBoxes: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: 5,
    marginBottom: 5
  },
  modalView: {
    marginTop: 150,
    height: 350,
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
  close: {
    textAlign: "right"
  },
  readMore: {
    color: "blue"
  },
  content: {
    fontSize: 14,
    padding: 10
  },
  title: {
    fontSize: 16,
    padding: 10
  }
})
