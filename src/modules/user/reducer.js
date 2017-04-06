import { SET_USER } from '../../redux/actions';

export const userReducer = function(state = {}, action) {

  switch(action.type) {

    case SET_USER:
      return action.user;
  }

  return state;
};
