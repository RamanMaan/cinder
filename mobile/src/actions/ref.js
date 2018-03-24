import types from '../actions';
import { serverURL } from '../../env';

export function refErrored(bool) {
  return {
    type: types.REF_ERROR,
    error: bool,
  };
}

export function refLoading(bool) {
  return {
    type: types.REF_LOADING,
    loading: bool,
  };
}

export function refFetchSuccess(data) {
  return {
    type: types.REF_FETCHED,
    ref: data,
  };
}

export function refFetchData(type) {
  return (dispatch) => {
    dispatch(refLoading(true));

    return fetch(`${serverURL}/api/ref/${type}`)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        dispatch(refLoading(false));
        return res.json();
      })
      .then(data => dispatch(refFetchSuccess(data)))
      .catch(() => dispatch(refErrored(true)));
  };
}
