import { SET_TRANS } from '../../../redux/actions';

export const transReducer = (state = {}, action) => {

  switch (action.type) {

    case SET_TRANS:
      return action.trans;
  }

  return state;
};
