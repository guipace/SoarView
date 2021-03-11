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

export const deleteComment = (id) => async (dispatch) => {
  const res = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (res.ok) {
    const comments = await res.json();
    return dispatch(setComments(comments))
  };
};

export const postComment = (formData) => async (dispatch) => {
  const res = await fetch(`/api/comments/`, {
    method: "POST",
    body: formData,
  })

  if (res.ok) {
    const comments = await res.json();
    dispatch(setComments(comments));
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
