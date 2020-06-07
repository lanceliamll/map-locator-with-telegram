import React, { useContext, useEffect } from "react";
import { Text, Button, View, TextInput, StyleSheet, Alert } from "react-native";
import { GlobalContext } from "../store/context/GlobalContext";
import { useForm } from "react-hook-form";
import { Icon } from "react-native-elements"


const Login = ({ navigation }) => {
  const { login, auth, getCurrentLocation, getAllMarkers } = useContext(GlobalContext);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Icon name='menu' onPress={() => navigation.openDrawer()} />
    });

    getCurrentLocation();

    register("identifier");
    register("password");
  }, [register]);


  const loginUser = (data) => {
    login(data);
    Alert.alert('Success', "Login Successfully")
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => setValue("identifier", text)}
        style={styles.input}
        placeholder=" Username"
      />
      <TextInput
        onChangeText={text => setValue("password", text)}
        style={styles.input}
        placeholder=" Password"
        secureTextEntry={true} 
      />
      <Button onPress={handleSubmit(loginUser)} title="Login" style={styles.input} />
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
