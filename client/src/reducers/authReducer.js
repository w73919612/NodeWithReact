import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  console.log(action);
  //When our actions run, we return the updated payload of the user.
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
