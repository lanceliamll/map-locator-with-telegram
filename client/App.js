import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./shared";
import { GlobalProvider } from "./store/context/GlobalContext";
import Geocoder from 'react-native-geocoding';


const App = () => {

  useEffect(() => {
    Geocoder.init("AIzaSyCzoeTzdAQWbQ_0kAnC0Zbyza-FTSkQI4M", { language: "en" });
  })

  return (
    <GlobalProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </GlobalProvider>
  )
}


export default App;