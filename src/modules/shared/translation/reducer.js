import { SET_LANG } from '../../../redux/actions';

export const langReducer = function(state = '', action) {

  switch(action.type) {

    case SET_LANG:
      return action.lang;

  }

  return state;
};
