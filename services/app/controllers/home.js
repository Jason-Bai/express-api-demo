const index = (req, res) => {
  const json = {
    title: 'Sequelize: Express Example',
  };
  res.status(200).json(json);
};

module.exports = {
  index,
};
