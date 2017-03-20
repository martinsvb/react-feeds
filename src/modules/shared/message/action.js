import { SET_MESSAGE } from '../../../redux/actions';

let initMessageState = {
  type: null,
  text: null,
};

export const setMessage = (message = initMessageState) => {
  return {
    type: SET_MESSAGE,
    message
  };
};
