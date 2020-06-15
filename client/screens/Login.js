import React, { useContext, useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { GlobalContext } from "../store/context/GlobalContext";
import { useForm } from "react-hook-form";
import { Icon, Button } from "react-native-elements"


const Login = ({ navigation }) => {
  const { login, auth, getCurrentLocation, getAllMarkers, error, fetching } = useContext(GlobalContext);

  const { register, handleSubmit, setValue, setError, clearError, errors } = useForm();
  const [credErrors, setCredErrors] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Icon name='menu' onPress={() => navigation.openDrawer()} />
    });
    getCurrentLocation();
    register("identifier");
    register("password");
  }, [register]);


  const loginUser = (data) => {
    const { identifier, password } = data;
    if(identifier === null || identifier === undefined || password === null || password === undefined) Alert.alert("Error", "Please enter your username/password");
    else {
      login(data)
        .then(res => {
          if(!res.success) {
            Alert.alert("Error", "Invalid Credentials");
          } else {
            Alert.alert("Success", "Login Successfully");
          }
          console.log(res.success)
        })
        .catch(err => console.log(err))
    }

  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text =>setValue("identifier", text)}
        style={styles.input}
        placeholder=" Username"
      />
      <TextInput
        onChangeText={text => setValue("password", text)}
        style={styles.input}
        placeholder=" Password"
        secureTextEntry={true} 
      />
      <Button loading={fetching} onPress={handleSubmit(loginUser)} title="Login" style={styles.input} />
    </View>
  )
}

export default Login;


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
})
