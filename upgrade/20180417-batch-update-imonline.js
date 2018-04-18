#!/usr/bin/env node

const U = require('../app/lib/utils');
const models = require('../app/models');

const { ImOnline } = models;

const asyncMapLimit = U.util.promisify(U.async.mapLimit);

const startedAt = U.moment().format();

const fields = [];

const exit = (error) => {
  console.log(`\n\nFinished At : ${startedAt}`);
  console.log(`Faields : ${fields.length}`);
  console.log(`Error: ${error}`);
  process.exit(0);
};

const task = async (imline) => {
  const createdAt = U.moment(imline.createdAt);
  const hour = createdAt.hour();
  const minute = createdAt.minute();
  const number = ((hour * 60) + minute).toString().padStart(4, '0');
  const updated = {
    number,
    hour,
    minute,
  };
  const where1 = {
    id: imline.id,
  };
  try {
    await imline.update(updated, { silent: true, where: where1 });
    process.stdout.write('.');
    return true;
  } catch (err) {
    fields.push(imline.id, err);
    return false;
  }
};

// 批量更新开奖期数
const main = () => {
  (async () => {
    const where = {
      isDelete: 'no',
    };

    const imonlines = await ImOnline.findAll({ where });

    await asyncMapLimit(imonlines, 10, task, exit);
  })();
};

main();
