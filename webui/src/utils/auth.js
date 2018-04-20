import moment from 'moment';

const tokenKey = 'token';
const refreshTokenKey = 'refreshToken';
const expiredAtKey = 'token';

const store = localStorage;

export const getToken = () => store.getItem(tokenKey);

const isTokenExpired = () => {
  const expiredAt = moment(store.getItem('expiredAt'));
  const now = moment();
  return expiredAt.diff(now, 'seconds') <= 0;
};

export const isTokenValid = () => {
  const token = getToken();
  if (!token) {
    return false;
  }
  const expired = isTokenExpired();

  if (expired) {
    return false;
  }

  return true;
};

export const setToken = ({ token, refreshToken, expiredAt }) => {
  store.setItem(tokenKey, token);
  store.setItem(refreshTokenKey, refreshToken);
  store.setItem(expiredAtKey, expiredAt);
};

export const removeToken = () => {
  store.removeItem(tokenKey);
  store.removeItem(refreshTokenKey);
  store.removeItem(expiredAtKey);
};
