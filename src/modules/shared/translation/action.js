import { SET_LANG, SET_TRANS } from '../../../redux/actions';

export const setLang = (lang = '') => {
  return {
    type: SET_LANG,
    lang
  };
};

export const setTrans = (trans = {}) => {
  return {
    type: SET_TRANS,
    trans
  };
};
