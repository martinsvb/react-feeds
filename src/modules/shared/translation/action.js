import { SET_LANG } from '../../../redux/actions';

export const setLang = (lang = '') => {
  return {
    type: SET_LANG,
    lang
  };
};
