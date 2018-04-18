const U = require('../lib/utils');
const helper = require('./helper');

const ImOnline = U.model('imonline');

/**
 * @api {GET} /imonlines QQ在线人数列表
 * @apiName config_modify
 * @apiGroup ImOnline
 * @apiPermission admin | member
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *
 *   Body:
 *   [{
 *     id: 1,
 *     date: '2014-09-03T03:15:16.000Z',
 *     current: 268701629,
 *     result: '11629',
 *     createdAt: '2014-09-03T03:15:16.000Z',
 *     updatedAt: '2014-09-03T03:15:16.000Z'
 *   }]
 * @apiVersion 1.0.0
 */
const list = [
  helper.rest.list(ImOnline),
];

module.exports = { list };
