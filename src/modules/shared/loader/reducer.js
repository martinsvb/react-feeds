import { SHOW_LOADER } from '../../../redux/actions';

export const loaderReducer = function(state = false, action) {

  switch(action.type) {

    case SHOW_LOADER:
      return action.loading;

  }

  return state;
};
