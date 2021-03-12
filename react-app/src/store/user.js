const SET_USER = 'user/setUser';
const REMOVE_USER = 'user/removeUser';

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  }
}

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  }
}

export const getUser = (id) => async (dispatch) => {
  const res = await fetch(`/api/user/${id}`);

  if(res.ok) {
    const data = await res.json()
    dispatch(setUser(data));
  }
};

const initialState = null;

const userReducer = ( state = initialState, action ) => {
  let newState;
  switch(action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState = null;
      return newState;
    default:
      return state;
  }
}

export default userReducer;
