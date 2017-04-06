import { SET_TRANS } from '../../../redux/actions';

export const setTrans = (trans = {}) => {
  return {
    type: SET_TRANS,
    trans
  };
};
