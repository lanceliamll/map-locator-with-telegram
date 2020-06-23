import React, { useEffect } from "react";
import { Text, Button, View, StyleSheet, ScrollView, Alert } from "react-native";
import { Icon } from 'react-native-elements'


const Precaution = ({ navigation }) => {

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Icon name='menu' onPress={() => navigation.openDrawer()} />,
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

        <Text style={styles.precTitle}>Condition Information</Text>

        <View style={styles.subContainer}>
          <Text style={styles.infoTitle}>Mild COVID-19:</Text>
          <Text style={styles.bullet}>{'\u2B24'} You’ll have flu-like symptoms, which can include cough, mild fever, headache, muscle pain and tiredness. You won’t be short of breath in general. You shouldn’t have a high fever. Keep yourself hydrated and rest.
Your appetite should be fairly normal and you should be able to eat and drink, shower and generally take care of yourself.Symptoms typically seem to last about 7 to 10 days. Most coronavirus cases (81%) are mild and stay mild from start to finish. Most people under 60 have mild symptoms like this.</Text>

          <Text style={styles.infoTitle}>Moderate COVID 19:</Text>
          <Text style={styles.bullet}>{'\u2B24'} You’ll feel tired, but you’ll still be able to shower and take care of yourself, although you’ll be eating less than normal. You might want to stay in bed.</Text>
          <Text style={styles.bullet}>{'\u2B24'} Moderate coronavirus tends to last slightly longer than 7 to 14 days. The cough will last at least two or three days.Moderate symptoms are also common in the under 60 age group.</Text>
          <Text style={styles.bullet}>{'\u2B24'} You’re more breathless and feel your heart beat faster when you move around. The cough is more noticeable. You’ll be coughing many times an hour and it’s probably making you tired. You may have symptoms of a fever like shivering and chills. You might also experience: Headache, diarrhoea, nausea, dry mouth or vomiting, although these symptoms are uncommon.</Text>

          <Text style={styles.infoTitle}>Severe COVID 19:</Text>
          <Text style={styles.bullet}>{'\u2B24'} You’re going to feel very breathless (even when you’re resting), and might find it hard to finish sentences. Along with chest, stomach or back pain when you breathe, these can be signs you’ve developed pneumonia. You will not be eating and drinking normally. Other signs include a high fever.Other signs include a high temperature (over 37.8 degrees centigrade), a rapid heartbeat and looking unwell. </Text>
          <Text style={styles.bullet}>{'\u2B24'} Warning: Your symptoms are serious. If you, or someone you know, has symptoms like this, you should call your local health service for advice. If you’re feeling increasingly breathless, can’t manage basic things like showering and eating, or if you can’t speak in whole sentences without taking extra breaths, call your local health service right away.</Text>


          <Text>Emergency Hotline Numbers:
          Philippines Department of Health</Text>
          <Text style={styles.infoTitle}>Hotlines: 1555 (02)894-26843 or (894-COVID)</Text>

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
    textAlign: "center",
    padding: 5
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
  infoTitle: {
    fontWeight: "bold",
    fontSize: 15,
    paddingBottom: 5
  },
  bullet: {
    paddingTop: 10,
    paddingBottom: 10
  }
})
