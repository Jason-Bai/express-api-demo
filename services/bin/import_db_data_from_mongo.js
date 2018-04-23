#!/usr/bin/env node

const mongoose = require('mongoose');
const U = require('../app/lib/utils');
const config = require('../app/configs');


// 初始化
const redis = config.redis || {};
U.cached.init(redis.port, redis.host, redis.opts);
U.model = U.openRestWithMysql(U.rest, `${__dirname}/../app`);

const asyncMapLimit = U.util.promisify(U.async.mapLimit);

const startAt = Date.now();

// mongo configs
const MONGO_HOST = '';
const MONGO_PORT = '';
const MONGO_NAME = '';
const MONGO_USER = '';
const MONGO_PASS = '';

const PAGE_SIZE = 10;

const ImOnline = U.model('imonline');

const Schema = mongoose.Schema;

const TencentSchema = new Schema({
  no: {
    type: String,
    index: true,
    unique: true,
  }, // 编号，年月日时分
  term: Number,
  nums: Array,
  current: Number,
  history: Number,
  type: {
    type: Number,
    default: 8,
    index: true,
  }, // 8 tencent minutes
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'djyl_number',
  versionKey: false,
  id: false,
  toJSON: {
    getters: true,
    virtuals: true,
  },
  toObject: {
    getter: true,
    virtuals: true,
  },
});

const Tencent = mongoose.model('TencentSchema', TencentSchema);

const connect = (cb) => {
  const options = {
    user: MONGO_USER,
    pass: MONGO_PASS,
  };

  mongoose.Promise = Promise;

  mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`, options);

  const db = mongoose.connection;

  db.on('error', cb);

  db.once('open', cb);
};

// 转化数据
const translate = (tencent) => {
  const { no: number, current, history, nums, createdAt } = tencent;
  const result = nums.join('');

  const date = U.moment(createdAt);

  const quarter = date.quarter();

  const month = date.month() + 1;

  const weekday = date.weekday();

  const hour = date.hours();

  const minute = date.minutes();

  const imonline = {
    date: date.format(),
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

  return imonline;
};

// 分页获取数据
const getImOnlinesByPage = async (page = 1) => {
  const skip = (page - 1) * PAGE_SIZE;
  const tencents = await Tencent.find({}).skip(skip).limit(PAGE_SIZE);
  const imonlines = U._.map(tencents, translate);
  return imonlines;
};

const exit = (error) => {
  console.log(
    '\nimport_db_data_from_mongo finished at: %s, consume: %d ms',
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

const batchCreate = async (imonlines) => {
  const batches = U._.map(imonlines, async (imonline) => await ImOnline.create(imonline));
  const batchPromises = Promise.all(batches);
  return batchPromises;
};

// 导入一批数据
const importImonlines = async (page) => {
  const imonlines = await getImOnlinesByPage(page);

  try {
    await batchCreate(imonlines);
    process.stdout.write('.');
    return true;
  } catch (err) {
    process.stdout.write('F');
    return false;
  }
};

const main = (callback) => {
  connect(async (error) => {
    if (error) {
      console.error('connection error: ', error);
      return;
    }

    const count = await Tencent.find({}).count();

    const pages = U._.range(1, Math.ceil(count / PAGE_SIZE) + 1);

    console.log('Count: ', count, ', Pages: ', pages.length);

    try {
      await asyncMapLimit(pages, 1, importImonlines);
    } catch (err) {
      callback(err);
      return;
    }

    callback();
  });
};

main(exit);
