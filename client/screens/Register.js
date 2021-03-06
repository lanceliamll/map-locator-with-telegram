import React, { useEffect, useState,  useContext } from "react";
import { Text, TextInput, View, StyleSheet, Alert } from "react-native";
import { GlobalContext } from "../store/context/GlobalContext";
import { useForm } from "react-hook-form";
import { Icon, Button } from "react-native-elements"

const Register = ({ navigation }) => {

  const { userRegister, getCurrentLocation, fetching } = useContext(GlobalContext);

  const { register, handleSubmit, setValue } = useForm();
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Icon name='menu' onPress={() => navigation.openDrawer()} />,
    });
    getCurrentLocation();
    register("username");
    register("email");
    register("password");
  }, []);


  const registerUser = (formData) => {
    const { username, email, password } = formData;
    if (username === null ||
      username === undefined ||
      email === null ||
      email === undefined ||
      password === null ||
      password === undefined) {
      Alert.alert("Error", "Please fill out all the mandatory fields");   
    } else if (password !== confirmPassword) {
      Alert.alert("Error", "Password doesnt match");
    }else {
      userRegister(formData);
      Alert.alert("Success", "Registered Successfully");
      navigation.navigate("Login")
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => setValue("username", text)}
        style={styles.input}
        placeholder=" Username"
      />
      <TextInput
        onChangeText={text => setValue("email", text)}
        style={styles.input}
        placeholder=" Email"
      />
      <TextInput
        onChangeText={text => setValue("password", text)}
        style={styles.input}
        placeholder=" Password"
        secureTextEntry={true}
      />
       <TextInput
        onChangeText={text => setConfirmPassword(text)}
        style={styles.input}
        placeholder=" Confirm Password"
        secureTextEntry={true}
      />
      <Button loading={fetching} onPress={handleSubmit(registerUser)} title="Register" style={styles.input} />
    </View>
  )
}

export default Register;


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
