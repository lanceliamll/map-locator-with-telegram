import React, { useEffect, useContext, useState } from "react";
import { Text, ScrollView, View, Alert, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { GlobalContext } from "../store/context/GlobalContext";
import { Icon, Button } from "react-native-elements";
import dayjs from "dayjs";

const UserReports = ({ navigation }) => {

  // store
  const { auth, getMarkersByUser, userMarkers, fetching } = useContext(GlobalContext);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Icon name='menu' onPress={() => navigation.openDrawer()} />,
      headerRight: () => <Icon name='exit-to-app' onPress={logoutToApp} />,
    });
    getMarkersByUser(auth.user.id);
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
       <View style={styles.titleRefresh}>
          <Text style={styles.boldText}>User Reports</Text>
          <Button loading={fetching} title="Refresh" onPress={() => getMarkersByUser(auth.user.id)} />
        </View>
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
              Common Symptom: <Text style={styles.boldText}>{marker.common ? "True" : "False"}</Text>
            </Text>
            <Text>
              Uncommon Symptom: <Text style={styles.boldText}>{marker.uncommon ? "True" : "False"}</Text>
            </Text>
            <Text>
              Registered Mobile Number: <Text style={styles.boldText}>{marker.mobileNumber ? marker.mobileNumber : "N/A"}</Text>
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
    overflow: "scroll",
    padding: 10
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
  },
  titleRefresh: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
