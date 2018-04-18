#!/usr/bin/env node

const U = require('../app/lib/utils');
const models = require('../app/models');

/* eslint prefer-destructuring: 0 */
const ImOnline = models.ImOnline;

const timeFormat = 'YYYY-MM-DD HH:mm:ss';

const getTencentOnline = async () => {
  const url = 'https://mma.qq.com/cgi-bin/im/online';
  const { data } = await U.axios.get(url);
  return data;
};

/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
const online_resp = ({ c, h }) => [c, h];

const getResult = (current) => {
  const nums = current.toString().split('');
  const sum = U._.chain(nums).map(num => +num).reduce((s, n) => s + n).value();
  const decimalDigit = sum % 10;
  const thousands = current % 10000;
  const result = (decimalDigit * 10000) + thousands;
  return result.toString().padStart(5, '0');
};

const main = () => {
  (async () => {
    const data = await getTencentOnline();
    /* eslint no-eval: 0 */
    const [current, history] = eval(data);

    const quarter = U.moment().quarter();

    const month = U.moment().month() + 1;

    const weekday = U.moment().weekday();

    const date = U.moment();

    const hour = date.hour();

    const minute = date.minute();

    const number = ((hour * 60) + minute).toString().padStart(4, '0');

    const result = getResult(current);

    const imonline = {
      date: date.format(timeFormat),
      number,
      current,
      history,
      quarter,
      month,
      weekday,
      hour,
      minute,
      result,
    };

    try {
      await ImOnline.create(imonline);
    } catch (err) {
      console.error('Error: ', err);
    }
  })();
};

main();
