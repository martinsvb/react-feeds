import { SET_MESSAGE } from '../../../redux/actions';

let initMessageState = {
  type: null,
  text: null,
};

export const messageReducer = function(state = initMessageState, action) {

  switch(action.type) {

    case SET_MESSAGE:
      return action.message;

  }

  return state;
};
