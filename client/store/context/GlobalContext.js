import React, { useReducer, createContext } from "react";
import GlobalReducer from "../reducer/GlobalReducer";
import axios from "axios";

const initialState = {
  auth: null,
  markers: [],
  savedLocations: [],
  currentLocation: null,
  fetching: false,
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);


  //get
  const getAllMarkers = async () => {
    dispatch({
      type: "FETCH",
      payload: true
    });
    try {
      const res = await axios.get("http://192.168.100.18:1337/markers", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({
        type: "GET_MARKERS",
        payload: res.data
      });

      dispatch({
        type: "FETCH",
        payload: false
      });

    } catch (error) {
      console.error("Get all markers error", error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(
        position => {
          dispatch({
            type: "GET_CURRENT_LOCATION",
            payload: position
          })
        },
        error => console.log(error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
      );
    } catch (error) {
      console.log("Error getting location", error)
    }
  }

  const getUserSavedLocation = async (id) => {
    try {

      dispatch({
        type: "FETCH",
        payload: true
      });

      const res = await axios.get(`http://192.168.100.18:1337/saved-locations?user.id=${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(res.data);

      dispatch({
        type: "GET_SAVED_LOCATION",
        payload: res.data
      });

      dispatch({
        type: "FETCH",
        payload: false
      });

    } catch (error) {
      console.log("Error saved location", error)
    }
  }

  // post 
  const login = async (data) => {

    const body = JSON.stringify(data);

    try {
      const res = await axios.post("http://192.168.100.18:1337/auth/local", body, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      dispatch({
        type: "LOGIN",
        payload: res.data
      });

    } catch (error) {
      console.error("Login user", error);
    }
  }

  const userRegister = async data => {
    const body = JSON.stringify(data);
    console.log(body);
    try {
      await axios.post("http://192.168.100.18:1337/auth/local/register", body, {
        headers: {
          "Content-Type": "application/json"
        }
      });

    } catch (error) {
      console.error("Register user", error);
    }
  }

  const logout = async () => {
    dispatch({
      type: "LOGOUT"
    })
  }

  const reportLocation = async data => {
    const body = JSON.stringify(data);

    try {
      const res = await axios.post("http://192.168.100.18:1337/markers", body, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      dispatch({
        type: "REPORT_LOCATION",
        payload: res.data
      })

    } catch (error) {
      console.error("Login user", error);
    }
  }

  const saveLocation = async (data) => {

    const body = JSON.stringify(data);

    try {
      const res = await axios.post('http://192.168.100.18:1337/saved-locations', body, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      dispatch({
        type: "SAVE_LOCATION",
        payload: res.data
      })

    } catch (error) {
      console.error("Post to location error", error);
    }
  }


  return (
    <GlobalContext.Provider value={{
      auth: state.auth,
      markers: state.markers,
      currentLocation: state.currentLocation,
      fetching: state.fetching,
      savedLocations: state.savedLocations,
      login,
      logout,
      userRegister,
      getAllMarkers,
      saveLocation,
      getCurrentLocation,
      getUserSavedLocation,
      reportLocation
    }}>
      {children}
    </GlobalContext.Provider>
  )
}