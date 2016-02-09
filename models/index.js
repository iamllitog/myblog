/**
 * Created by litong on 16-2-9.
 */
const dbOption = require('../config').dataOption;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbOption.dbName, dbOption.userName, dbOption.password, dbOption.mySql);

exports.tag = tagModel = require('./tag')(sequelize);
exports.article = articleModel = require('./article')(sequelize,tagModel);
exports.comment = require('./article')(sequelize,articleModel);
exports.master = masterModel = require('./master')(sequelize);
exports.masterLink = require('./masterlink')(sequelize,masterModel);