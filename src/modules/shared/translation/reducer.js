import { SET_LANG, SET_TRANS } from '../../../redux/actions';

export const langReducer = (state = '', action) => {

  switch(action.type) {

    case SET_LANG:
      return action.lang;

  }

  return state;
};

export const transReducer = (state = {}, action) => {

  switch (action.type) {

    case SET_TRANS:
      return action.trans;
  }

  return state;
};
