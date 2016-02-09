/**
 * 主人模型
 */
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Master', {
        // 主键
        id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},

        // 主人名
        name : {type : Sequelize.STRING, unique : true, allowNull : false},

        // 文本简介
        description : {type : Sequelize.STRING, allowNull : false}
    });
};