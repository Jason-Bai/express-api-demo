const U = require('../lib/utils');

/**
 * 统计过去weekday, hour, minute 数字中奖情况
 * @params imonlines 实例集合
 * @return
 *  [0, 1, 2, 3, 2, 4, 5, 6, 8, 1]
 */
const weekdayHourMinute = (imonlines) => {
  const results = U._.map(imonlines, 'result');
  const stats = U._.range(0, 10, 0);
  U._.each(results, (result) => {
    U._.each(stats, (v, i) => {
      if (result.includes(i.toString())) {
        stats[i]++;
      }
    });
  });
  return stats;
};

module.exports = { weekdayHourMinute };
