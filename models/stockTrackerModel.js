const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const stockTracker = sequelize.define('stockTracker', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  candyNames: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descriptions: {
    type: Sequelize.STRING,
    allowNull: false
  },
  prices: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantitys: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

module.exports = stockTracker;
