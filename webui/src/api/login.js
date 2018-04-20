import fetch from '../utils/fetch';

const login = (data) => {
  const config = {
    url: '/session',
    method: 'post',
    data,
  };
  return fetch(config);
};

export default { login };
