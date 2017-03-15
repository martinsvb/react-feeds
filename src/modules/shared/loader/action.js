import { SHOW_LOADER } from '../../../redux/actions';

export const showLoader = (loading = false) => {
  return {
    type: SHOW_LOADER,
    loading
  };
};
