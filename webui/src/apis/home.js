import fetch from 'utils/fetch';

const list = (params) => {
  const config = {
    url: '/imonlines',
    method: 'get',
    params,
  };
  return fetch(config);
};

export default { list };
