import setFlight from './flight';

const SET_COMMENTS = 'comments/setComments';
const REMOVE_COMMENTS = 'flight/removeComments';

export const setComments = (comments) => {
  return {
    type: SET_COMMENTS,
    payload: comments,
  }
}

export const removeComments = () => {
  return {
    type: REMOVE_COMMENTS,
  }
}

export const getComments = (flightId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${flightId}`);

  if (res.ok) {
    const comments = await res.json();
    dispatch(setComments(comments));
  }
};

// export const deleteFlight = (id) => async (dispatch) => {
//   const res = await fetch(`/api/flight/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: null,
//   });

//   if (res.ok) {
//     return dispatch(removeFlight())
//   };
// };

export const postComment = (formData) => async (dispatch) => {
  const res = await fetch(`/api/comment/`, {
    method: "POST",
    body: formData,
  })

  if (res.ok) {
    const flight = await res.json();
    dispatch(setFlight(flight));
  } else {
    return res.errors
  }
}

const initialState = null;

const commentReducer = ( state = initialState, action ) => {
  let newState;
  switch(action.type) {
    case SET_COMMENTS:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case REMOVE_COMMENTS:
      newState = Object.assign({}, state);
      newState = null;
      return newState;
    default:
      return state;
  }
}

export default commentReducer;
