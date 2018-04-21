#!/usr/bin/env node

const U = require('../app/lib/utils');
const config = require('../app/configs');

const startAt = Date.now();

const redis = config.redis || {};
U.cached.init(redis.port, redis.host, redis.opts);
U.model = U.openRestWithMysql(U.rest, `${__dirname}/../app`);

/* eslint prefer-destructuring: 0 */
const ImOnline = U.model('imonline');

const getTencentOnline = async () => {
  const url = 'https://mma.qq.com/cgi-bin/im/online';
  const { data } = await U.axios.get(url);
  return data;
};

/* eslint no-unused-vars: 0 */
/* eslint camelcase: 0 */
const online_resp = ({ c, h }) => [c, h];

// 计算开奖结果
const getResult = (current) => {
  const nums = current.toString().split('');
  const sum = U._.chain(nums).map(num => +num).reduce((s, n) => s + n).value();
  const decimalDigit = sum % 10;
  const thousands = current % 10000;
  const result = (decimalDigit * 10000) + thousands;
  return result.toString().padStart(5, '0');
};

// 获取imonline实例
const getImOnline = (data) => {
  /* eslint no-eval: 0 */
  const [current, history] = eval(data);

  const quarter = U.moment().quarter();

  const month = U.moment().month() + 1;

  const weekday = U.moment().weekday();

  const date = U.moment();

  const hour = date.hour();

  const minute = date.minute();

  const result = getResult(current);

  const imonline = {
    date: date.format(),
    current,
    history,
    quarter,
    month,
    weekday,
    hour,
    minute,
    result,
  };

  return imonline;
};

const exit = (error) => {
  console.log(
    'tencent_im_online finished at: %s, consume: %d ms',
    new Date(),
    Date.now() - startAt
  );
  if (error) {
    console.error(error);
    U.fs.writeFileSync(`${__filename}.failds.json`, JSON.stringify(error, null, 2));
  }
  setTimeout(() => {
    process.exit(error ? 1 : 0);
  }, 10);
};

const main = (callback) => {
  (async () => {
    const data = await getTencentOnline();

    const imonline = getImOnline(data);

    try {
      await ImOnline.create(imonline);
    } catch (error) {
      return callback(error);
    }

    return callback();
  })();
};

main(exit);
