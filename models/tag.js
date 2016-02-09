/**
 * 文章类别模型
 */
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Tag', {
        // 主键
        id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},

        // 标题
        name : {type : Sequelize.STRING, unique : true, allowNull : false}
    });
};