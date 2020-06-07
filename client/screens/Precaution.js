import React, { useEffect } from "react";
import { Text, Button, View, StyleSheet, ScrollView } from "react-native";
import { Icon } from 'react-native-elements'


const Precaution = ({ navigation }) => {

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Icon name='menu' onPress={() => navigation.openDrawer() } />,
      headerRight: () => <Icon name='exit-to-app' onPress={logoutToApp} />,
    })
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

  return (
    <View style={styles.precautionContainer}>
      <ScrollView>
        <Text style={styles.precTitle}>Protecting yourself and others from the spread COVID-19</Text>

        {/* Content */}
        <View style={styles.subContainer}>
          <Text style={styles.subTitle}>You can reduce your chances of being infected or spreading COVID-19 by taking some simple precautions:</Text>

          <Text style={styles.bullet}>{'\u2B24'} Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water. Why? Washing your hands with soap and water or using alcohol-based hand rub kills viruses that may be on your hands.</Text>
          <Text style={styles.bullet}>{'\u2B24'} Maintain at least 1 metre (3 feet) distance between yourself and others. Why? When someone coughs, sneezes, or speaks they spray small liquid droplets from their nose or mouth which may contain virus. If you are too close, you can breathe in the droplets, including the COVID-19 virus if the person has the disease.</Text>
          <Text style={styles.bullet}>{'\u2B24'} Avoid going to crowded places. Why? Where people come together in crowds, you are more likely to come into close contact with someone that has COIVD-19 and it is more difficult to maintain physical distance of 1 metre (3 feet).</Text>
          <Text style={styles.bullet}>{'\u2B24'} Avoid touching eyes, nose and mouth. Why? Hands touch many surfaces and can pick up viruses. Once contaminated, hands can transfer the virus to your eyes, nose or mouth. From there, the virus can enter your body and infect you.</Text>
          <Text style={styles.bullet}>{'\u2B24'} Make sure you, and the people around you, follow good respiratory hygiene. This means covering your mouth and nose with your bent elbow or tissue when you cough or sneeze. Then dispose of the used tissue immediately and wash your hands. Why? Droplets spread virus. By following good respiratory hygiene, you protect the people around you from viruses such as cold, flu and COVID-19.</Text>
          <Text style={styles.bullet}>{'\u2B24'} If you have a fever, cough and difficulty breathing, seek medical attention, but call by telephone in advance if possible and follow the directions of your local health authority. Why? National and local authorities will have the most up to date information on the situation in your area. Calling in advance will allow your health care provider to quickly direct you to the right health facility. This will also protect you and help prevent spread of viruses and other infections.
</Text>
          <Text style={styles.bullet}>{'\u2B24'} Keep up to date on the latest information from trusted sources, such as WHO or your local and national health authorities. Why? Local and national authorities are best placed to advise on what people in your area should be doing to protect themselves.</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default Precaution;


const styles = StyleSheet.create({
  precautionContainer: {
    overflow: "scroll",
    width: "100%"
  },
  precTitle: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center"
  },
  subContainer: {
    padding: 15,
    textAlign: "center"
  },
  subTitle: {
    textAlign: "center",
    fontSize: 15,
    paddingBottom: 40
  },
  bullet: {
    paddingTop: 10,
    paddingBottom: 10
  }
})
