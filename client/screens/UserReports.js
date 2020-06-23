import React, { useEffect, useContext, useState } from "react";
import { Text, Button, ScrollView, View, Alert, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { GlobalContext } from "../store/context/GlobalContext";
import { Icon } from "react-native-elements";
import dayjs from "dayjs";

const UserReports = ({ navigation }) => {

  // store
  const { auth, getMarkersByUser, userMarkers, fetching } = useContext(GlobalContext);

  useEffect(() => {
    getMarkersByUser(auth.user.id);
    navigation.setOptions({
      headerLeft: () => <Icon name='menu' onPress={() => navigation.openDrawer()} />,
      headerRight: () => <Icon name='exit-to-app' onPress={logoutToApp} />,
    });
  }, []);


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

  if (fetching) return <ActivityIndicator size="large" color="#0000ff" />;
  return (
    <ScrollView style={styles.listContainer}>
      {!userMarkers.length ? null : userMarkers.map((marker, idx) => {
        const { data } = marker.data[0];
        return (
          <View key={idx} style={styles.listCard}>
            <Text>
              Latitude: <Text style={styles.boldText}>{data.coords.latitude} </Text>
            </Text>
            <Text>
              Longitude: <Text style={styles.boldText}>{data.coords.longitude}</Text>
            </Text>
            <Text>
              Date Reported: <Text style={styles.boldText}>{dayjs(marker.created_at).format("MMMM DD YYYY, h:mm A")}</Text>
            </Text>
            <Text>Has Community Cases: <Text style={styles.boldText}>{marker.communityCases ? "True" : "False"}</Text></Text>
            <Text>
              Severe Symptom: <Text style={styles.boldText}>{marker.severe ? "True" : "False"}</Text>
            </Text>
            <Text>
              Common Symptom: <Text style={styles.boldText}>{marker.severe ? "True" : "False"}</Text>
            </Text>
            <Text>
              Uncommon Symptom: <Text style={styles.boldText}>{marker.severe ? "True" : "False"}</Text>
            </Text>
            <Text>
              Registered Mobile Number: <Text style={styles.boldText}>{marker.mobileNum ? marker.mobileNum : "N/A"}</Text>
            </Text>
          </View>
        )
      })}
    </ScrollView>
  )
}

export default UserReports;


const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    height: "100%",
    overflow: "scroll"
  },
  listCard: {
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16
  }
});
