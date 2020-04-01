const initialState = {
   username: '',
   profile: ''
}

const USER_INFO = 'USER_INFO';
const RESET_USER_INFO = "RESET_USER_INFO"

export function resetUser () {
   return {
      type: RESET_USER_INFO,
      payload: initialState
   }
}

export function userInfo(userObj) {
   return {
      type: USER_INFO,
      payload: userObj
   }
}

export default function reducer(state = initialState, action) {
   const {type, payload} = action;
   switch(type){
      case RESET_USER_INFO:
         return {...state, user: payload}
      case USER_INFO:
         return {...state, user: payload};
      default:
         return state;
   }
}