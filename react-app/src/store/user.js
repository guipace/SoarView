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

export const editUser = (updatedData) => async (dispatch) => {
  const { id, email, first_name, last_name, country, image_file, password } = updatedData;

  const form = new FormData();
  form.append('email', email);
  form.append('first_name', first_name);
  form.append('last_name', last_name);
  form.append('country', country);
  if (image_file) {
    form.append('image_file', image_file);
  }
  if (password) {
    form.append('password', password);
  }

  const res = await fetch(`/api/user/${id}`, {
    method: "POST",
    body: form,
  })

  if(res.ok) {
    const data = await res.json()

    if (!data.errors) {
      dispatch(setUser(data));
    }

    return data;
  }
}

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
