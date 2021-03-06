import React, { useReducer, createContext } from "react";
import GlobalReducer from "../reducer/GlobalReducer";
import axios from "axios";

const initialState = {
  auth: null,
  markers: [],
  savedLocations: [],
  userMarkers: [],
  userTemps: [],
  currentLocation: null,
  fetching: false,
  error: null
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
      const res = await axios.get("https://map-tracker-tele.herokuapp.com/markers", {
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

      const res = await axios.get(`https://map-tracker-tele.herokuapp.com/saved-locations?user.id=${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });

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


    dispatch({
      type: "FETCH",
      payload: true
    });

    const body = JSON.stringify(data);

    try {
      const res = await axios.post("https://map-tracker-tele.herokuapp.com/auth/local", body, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      dispatch({
        type: "LOGIN",
        payload: res.data
      });


      dispatch({
        type: "FETCH",
        payload: false
      });

      return {
        success: true,
      }

    } catch (error) {
      console.error("Login user", error);
      dispatch({
        type: "FETCH",
        payload: false
      });

      return {
        success: false
      }
    }
  }

  const userRegister = async data => {
    const body = JSON.stringify(data);

    dispatch({
      type: "FETCH",
      payload: true
    });

    try {
      await axios.post("https://map-tracker-tele.herokuapp.com/auth/local/register", body, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      dispatch({
        type: "FETCH",
        payload: false
      });

    } catch (error) {
      dispatch({
        type: "FETCH",
        payload: false
      });
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

    dispatch({
      type: "FETCH",
      payload: true
    });

    try {
      const res = await axios.post("https://map-tracker-tele.herokuapp.com/markers", body, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      dispatch({
        type: "REPORT_LOCATION",
        payload: res.data
      });

      dispatch({
        type: "FETCH",
        payload: false
      });

      return {
        success: true
      }

    } catch (error) {
      dispatch({
        type: "FETCH",
        payload: false
      });
      console.error("Login user", error);
    }
  }

  const saveLocation = async (data) => {

    const body = JSON.stringify(data);

    try {
      const res = await axios.post('https://map-tracker-tele.herokuapp.com/saved-locations', body, {
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

  const storeTokenWithUser = async (data) => {
    const token = {
      userToken: data.userToken
    }
    const body = JSON.stringify(token);

    axios.get("https://map-tracker-tele.herokuapp.com/tokens")
      .then(res => {
        res.data.map(d => {
          // if no data post
          if (!res.data.length) {
            axios.post("https://map-tracker-tele.herokuapp.com/tokens", body,
              {
                headers: {
                  "Content-Type": "application/json"

                }
              })
              .then(res => console.log("Success"))
              .catch(err => console.log("Failed POST"))
          } else {
            // else put
            axios.put(`https://map-tracker-tele.herokuapp.com/tokens/${d.id}`, body, {
              headers: {
                "Content-Type": "application/json"

              }
            })
              .then(res => console.log("Success"))
              .catch(err => console.log("Failed PUT", err))
          }
        });
      })
  }

  const saveAge = async (id, age) => {
    const body = JSON.stringify(age);

    try {
      const res = await axios.put(`https://map-tracker-tele.herokuapp.com/users/${id}`, body, {
        headers: {
          "Content-Type": "application/json"

        }
      });
      dispatch({
        type: "SAVE_USER",
        payload: res.data
      });

    } catch (error) {
      console.log("Update user Age error", error)
    }
  };

  const saveGender = async (id, gen) => {
    const body = JSON.stringify(gen);

    try {
      const res = await axios.put(`https://map-tracker-tele.herokuapp.com/users/${id}`, body, {
        headers: {
          "Content-Type": "application/json"

        }
      });
      dispatch({
        type: "SAVE_USER",
        payload: res.data
      });

    } catch (error) {
      console.log("Update user Age error", error)
    }
  }

  const saveMunicipality = async (id, mun) => {
    const body = JSON.stringify(mun);

    try {
      const res = await axios.put(`https://map-tracker-tele.herokuapp.com/users/${id}`, body, {
        headers: {
          "Content-Type": "application/json"

        }
      });
      dispatch({
        type: "SAVE_USER",
        payload: res.data
      });
    } catch (error) {
      console.log("Update user Age error", error)
    }
  }

  const getMarkersByUser = async id => {
    dispatch({
      type: "FETCH",
      payload: true
    });
    try {
      const res = await axios.get(`https://map-tracker-tele.herokuapp.com/markers?user.id=${id}&_sort=id:DESC`, {
        headers: {
          "Content-Type": "application/json"

        }
      });

      dispatch({
        type: "GET_USER_MARKERS",
        payload: res.data
      });

      dispatch({
        type: "FETCH",
        payload: false
      });

    } catch (err) {
      console.log(err);
      dispatch({
        type: "FETCH",
        payload: true
      });
    }
  }

  const getUserTemps = async id => {
    dispatch({
      type: "FETCH",
      payload: true
    });
    try {
      const res = await axios.get(`https://map-tracker-tele.herokuapp.com/usertemps?user.id=${id}&_sort=id:DESC`, {
        headers: {
          "Content-Type": "application/json"

        }
      });

      dispatch({
        type: "GET_USER_TEMPS",
        payload: res.data
      });

      dispatch({
        type: "FETCH",
        payload: false
      });

    } catch (err) {
      console.log(err);
      dispatch({
        type: "FETCH",
        payload: true
      });
    }
  }


  return (
    <GlobalContext.Provider value={{
      auth: state.auth,
      markers: state.markers,
      currentLocation: state.currentLocation,
      fetching: state.fetching,
      savedLocations: state.savedLocations,
      error: state.error,
      userMarkers: state.userMarkers,
      userTemps: state.userTemps,
      login,
      logout,
      userRegister,
      getAllMarkers,
      saveLocation,
      getCurrentLocation,
      getUserSavedLocation,
      reportLocation,
      storeTokenWithUser,
      saveAge,
      saveGender,
      saveMunicipality,
      getMarkersByUser,
      getUserTemps
    }}>
      {children}
    </GlobalContext.Provider>
  )
}