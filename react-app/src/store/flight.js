const SET_FLIGHT = 'flight/setFlight';
const SET_RECENT_FLIGHTS = 'flight/setRecentFlights';
const SET_SEARCH_FLIGHTS = 'flight/setSearchFlights';
const REMOVE_FLIGHT = 'flight/removeFlight';
const REMOVE_SEARCH_FLIGHTS = 'flight/removeSearchFlights';

export const setFlight = (flight) => {
  return {
    type: SET_FLIGHT,
    payload: flight,
  }
}

export const setRecentFlights = (flights) => {
  return {
    type: SET_RECENT_FLIGHTS,
    payload: flights,
  }
}

export const setSearchFlights = (flights) => {
  return {
    type: SET_SEARCH_FLIGHTS,
    payload: flights,
  }
}

export const removeFlight = () => {
  return {
    type: REMOVE_FLIGHT,
  }
}

export const removeSearchFlights = () => {
  return {
    type: REMOVE_SEARCH_FLIGHTS,
  }
}

export const getFlight = (id) => async (dispatch) => {
  const res = await fetch(`/api/flight/${id}`);

  if (res.ok) {
    const flight = await res.json();
    dispatch(setFlight(flight));
  }
};

export const getRecentFlights = () => async (dispatch) => {
  const res = await fetch(`/api/flight/recent`);

  if (res.ok) {
    const flights = await res.json();
    dispatch(setRecentFlights(flights));
  }
}

export const editFlight = (updatedData) => async (dispatch) => {
  const id = updatedData.id;

  const res = await fetch(`/api/flight/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData),
  })

  if (res.ok) {
    const flight = await res.json();
    dispatch(setFlight(flight));
  } else {
    return res.errors
  }
}

export const deleteFlight = (id) => async (dispatch) => {
  const res = await fetch(`/api/flight/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: null,
  });

  if (res.ok) {
    return dispatch(removeFlight())
  };
};

export const getSearchFlights = (start_date, end_date) => async (dispatch) => {
  const res = await fetch('/api/flight/search', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({start_date, end_date})
  })

  if(res.ok){
    const flights = await res.json()
    dispatch(setSearchFlights(flights))
  }
}

const initialState = { singleFlight: null, recentFlights: null, searchFlights: null};

const flightReducer = ( state = initialState, action ) => {
  let newState;
  switch(action.type) {
    case SET_FLIGHT:
      newState = Object.assign({}, state);
      newState.singleFlight = action.payload;
      return newState;
    case SET_RECENT_FLIGHTS:
      newState = Object.assign({}, state);
      newState.recentFlights = action.payload;
      return newState;
    case SET_SEARCH_FLIGHTS:
      newState = Object.assign({}, state);
      newState.searchFlights = action.payload;
      return newState;
    case REMOVE_FLIGHT:
      newState = Object.assign({}, state);
      newState.singleFlight = null;
      return newState;
    case REMOVE_SEARCH_FLIGHTS:
      newState = Object.assign({}, state);
      newState.searchFlights = null;
      return newState;
    default:
      return state;
  }
}

export default flightReducer;
