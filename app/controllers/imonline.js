const U = require('../lib/utils');

const list = Model => (
  async (req, res) => {
    const {
      page = 1, pageSize = 10, order = ['id', 'DESC'], attrs,
    } = req.params;

    let attributes;

    if (attrs && U._.isString(attrs)) {
      attributes = U._.intersection(Model.attributes, attrs.split(','));
    } else {
      /* eslint prefer-destructuring: 0 */
      attributes = Model.attributes;
    }

    const offset = (page - 1) * pageSize;
    const limit = Math.min(40, pageSize);

    const options = {
      attributes,
      order,
      offset,
      limit,
    };

    const imonlines = await Model.findAll(options);

    return res.status(201).json(imonlines);
  }
);

module.exports = {
  list,
};
