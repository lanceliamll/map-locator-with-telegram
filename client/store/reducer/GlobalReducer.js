const GlobalReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN":
      return {
        ...state,
        auth: payload,
      }
    case "GET_MARKERS":
      return {
        ...state,
        markers: payload
      }
    case "SAVE_LOCATION":
      return {
        ...state,
        savedLocations: payload,
      }
    case "GET_CURRENT_LOCATION":
      return {
        ...state,
        currentLocation: payload
      }
    case "GET_SAVED_LOCATION":
      return {
        ...state,
        savedLocations: payload
      }
    case "REPORT_LOCATION":
      return {
        ...state,
        markers: [
          ...state.markers,
          payload
        ]
      }
    case "LOGOUT":
      return {
        ...state,
        auth: null
      }
    case "FETCH":
      return {
        ...state,
        fetching: payload
      }
    case "SAVE_USER":
      return {
        ...state,
        auth: {
          ...state.auth,
          user: payload
        }
      }
    default:
      return state;
  }
}

export default GlobalReducer;