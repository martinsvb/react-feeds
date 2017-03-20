import { ADD_MESSAGE, DEL_MESSAGE } from '../../../redux/actions';

export const addMessage = (message = []) => {
  return {
    type: ADD_MESSAGE,
    message
  };
};

export const delMessage = (index = null) => {
  return {
    type: DEL_MESSAGE,
    index
  };
};
