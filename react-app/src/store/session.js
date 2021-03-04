const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser'

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {

    let newState;
    switch (action.type){
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload
            return newState
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state
    }
}

export default sessionReducer
