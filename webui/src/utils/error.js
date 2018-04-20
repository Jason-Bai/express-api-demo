import _ from 'lodash';

export const getError = (error) => {
  const errors = _.get(error, 'response.data', error) || error;

  let err = errors;

  if (_.isArray(errors)) {
    const { 0: err } = errors;
    return err;
  }

  return err;
}
