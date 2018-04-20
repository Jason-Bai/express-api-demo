import moment from 'moment';

const userKey = 'user';
const tokenKey = 'token';
const refreshTokenKey = 'refreshToken';
const expiredAtKey = 'expiredAt';

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

export const isUserValid = () => {
  const user = store.getItem('user');
  if (!user) {
    return false;
  }

  try {
    JSON.parse(user);
  } catch (e) {
    return false;
  }

  return true;
};

export const isAuthed = () => isTokenValid() && isUserValid();

export const setToken = ({ token, refreshToken, expiredAt }) => {
  store.setItem(tokenKey, token);
  store.setItem(refreshTokenKey, refreshToken);
  store.setItem(expiredAtKey, expiredAt);
};

export const setUser = (user) => {
  store.setItem(userKey, JSON.stringify(user));
}

export const getUser = () => {
  const user = JSON.parse(store.getItem(userKey));
  return user;
}

export const removeToken = () => {
  store.removeItem(tokenKey);
  store.removeItem(refreshTokenKey);
  store.removeItem(expiredAtKey);
};
