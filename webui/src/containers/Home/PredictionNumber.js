import React from 'react';
import _ from 'lodash';
import './predictionnumber.css';

// 0-9
const numbers = _.range(0, 10).map((number) => number.toString());

// 获取数字间隔
const getIntervalsOfNumber = (number, data) => {
  if (!data.length) {
    return 0;
  }

  const intervals = [];

  let interval = 0;

  data.forEach((item) => {
    const { result } = item;
    if (!result.includes(number)) {
      interval++;
    } else {
      intervals.push(interval);
      interval = 0;
    }
  });

  return [number, intervals];
};

// 依次顺序
const STATS_NUMBERS = [2, 1, 3, 0];

// 统计顺序2,1,3,0间隔的顺序
const getStatsNumbers = (item) => {
  const [number, intervals] = item;
  const sortedIntervals = intervals.sort((a, b) => a - b);

  const result = {
    number,
  };

  // 可预测
  let predicted = 0;

  _.each(STATS_NUMBERS, (statsNumber) => {
    const firstIndex = sortedIntervals.indexOf(statsNumber);
    const lastIndex = sortedIntervals.lastIndexOf(statsNumber);
    if (lastIndex !== -1 && firstIndex !== -1) {
      result[`num${statsNumber}`] = lastIndex - firstIndex + 1;
      predicted += result[`num${statsNumber}`];
    } else {
      result[`num${statsNumber}`] = 0;
    }
  });

  // 不可预测
  result.outOfMind = intervals.length - predicted;

  return result;
};


// 预测next
const predictNumbers = (statsNumbers) => {
  const sortedConditions = STATS_NUMBERS.map((statsNumber) => `num${statsNumber}`);
  const iteratees = [].concat(['outOfMind'], sortedConditions);
  const orders = ['desc', 'asc', 'asc', 'desc'];
  const results = _.chain(statsNumbers).orderBy(iteratees, orders).reverse().value();

  return results;
};

const predict = (data) => {
  if (!data || !data.length) {
    return [];
  }
  const numbersIntervals = numbers.map((number) => getIntervalsOfNumber(number, data));

  const statsNumbers = numbersIntervals.map((numberIntervals) => getStatsNumbers(numberIntervals));

  const results = predictNumbers(statsNumbers);

  return results;
};


class NumberInterval extends React.Component {
  render() {
    const { dataSource } = this.props;

    const results = predict(dataSource);

    return (
      <div className="prediction-number">
        <div className="stats-numbers">
          <div className="stats-title">统计／结果</div>
          {STATS_NUMBERS.map((statsNumber, key) => (
            <div key={key} className="stats-number">{statsNumber}</div>
          ))}
          <div className="stats-number">{'others'}</div>
        </div>
        <div className="prediction-results">
          {results.map((result) => (
            <div key={result.number} className="prediction-result">
              <div className="number-name">{result.number}</div>
              {STATS_NUMBERS.map((statsNumber, key) => (
                <div className="stats-times" key={key}>{result[`num${statsNumber}`]}</div>
              ))}
              <div className="stats-times">{result.outOfMind}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default NumberInterval;
