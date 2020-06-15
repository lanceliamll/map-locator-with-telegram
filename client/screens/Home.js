import React, { useEffect, useState, useContext } from "react";
import { GlobalContext, GlobalProvider } from "../store/context/GlobalContext";
import { Text, Button, View, StyleSheet, Dimensions, Alert, ActivityIndicator } from "react-native";
import { Icon } from 'react-native-elements'
import MapView, { Marker } from 'react-native-maps';


const Home = ({ navigation }) => {

  // get globalstate
  const { fetching, auth, getAllMarkers, markers, saveLocation, getUserSavedLocation, logout } = useContext(GlobalContext);
  // current location
  const [currentPosition, setCurrentPosition] = useState(null);

  const getCurrentPosition = () => {
    // get current location 
    navigator.geolocation.getCurrentPosition(
      position => {
        // const locationWithId = Object.assign({ data: position }, { user: auth.user.id });
        const location = JSON.stringify(position);
        setCurrentPosition(JSON.parse(location));
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
    );
  };

  const transformMarkersData = data => {
    if (data === undefined || data === null) return [];
    return !data.length ? [] : data.map(d => {
      return !data.length || data === null ? [] : d.data.map(location => {
        return {
          coords: {
            latitude: location.data.coords.latitude,
            longitude: location.data.coords.longitude
          }
        }
      })
    });
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

  useEffect(() => {
    // header
    navigation.setOptions({
      headerLeft: () => <Icon name='menu' onPress={() => navigation.openDrawer()} />,
      headerRight: () => <Icon name='exit-to-app' onPress={logoutToApp} />,
    });

    getAllMarkers();
    getCurrentPosition();
    // getUserSavedLocation(auth.user.id);

    // get every 30 minutes
    setTimeout(() => {
      getAllMarkers();
      getCurrentPosition();
    }, 1800000);

    console.log("is fetching",fetching)

  }, [navigation]);

  if (fetching) return <ActivityIndicator size="large" color="#0000ff" />;
  try {
    return (
      <View>
        {currentPosition !== null ? (
          <MapView
            initialRegion={{
              latitude: currentPosition.coords.latitude,
              longitude: currentPosition.coords.longitude,
              latitudeDelta: 0,
              longitudeDelta: 0,
            }}
            style={styles.mapStyle}
          >

            {/* render markers */}
            {markers.length ? transformMarkersData(markers).map((mark, idx) => {
              return (
                <View key={idx}>
                  {mark.length < 0 ? null : mark.map((m, idx) => {
                    return (
                      <View key={idx}>
                        <Marker
                          coordinate={m.coords}
                        />
                      </View>
                    )
                  })}
                </View>
              )
            }) : null}

          </MapView>
        ) : null}
      </View>
    )
  } catch (error) {
    console.log("ERR", error)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Home;
