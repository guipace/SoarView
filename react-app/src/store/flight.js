const SET_FLIGHT = 'flight/setFlight';
const REMOVE_FLIGHT = 'flight/removeFlight';

export const setFlight = (flight) => {
  return {
    type: SET_FLIGHT,
    payload: flight,
  }
}

export const removeFlight = () => {
  return {
    type: REMOVE_FLIGHT,
  }
}

export const getFlight = (id) => async (dispatch) => {
  const res = await fetch(`api/flight/${id}`);

  if (res.ok) {
    const flight = await res.json();
    dispatch(setFlight(flight));
  }
};

const initialState = null;

const flightReducer = ( state = initialState, action ) => {
  let newState;
  switch(action.type) {
    case SET_FLIGHT:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case REMOVE_FLIGHT:
      newState = Object.assign({}, state);
      newState = null;
      return newState;
    default:
      return state;
  }
}

export default flightReducer;
