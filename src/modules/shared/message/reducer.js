import { ADD_MESSAGE, DEL_MESSAGE } from '../../../redux/actions';

export const messageReducer = function(state = [], action) {

  switch(action.type) {

    case ADD_MESSAGE:
      return [...state, action.message];
    
    case DEL_MESSAGE:
      state.splice(action.index, 1);
      return [...state];

  }

  return state;
};
