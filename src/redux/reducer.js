const initialState = {
   username: '',
   peopleId: 0,
   profile: ''
}

const USER_INFO = 'USER_INFO';

export function userInfo(userObj) {
   return {
      type: USER_INFO,
      payload: userObj
   }
}

export default function reducer(state = initialState, action) {
   const {type, payload} = action;
   switch(type){
      case USER_INFO:
         return {...state, user: payload};
      default:
         return state;
   }
}