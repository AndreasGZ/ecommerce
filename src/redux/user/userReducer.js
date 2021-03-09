import {UserActionTypes} from "./userTypes";

const INITIAL_STATE = {
  currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case UserActionTypes.SET_CURRENT_USER:
    // Neues Objekt wird zurückgegeben -> rendern
      return{
        ...state,
        currentUser: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;
