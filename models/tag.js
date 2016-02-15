/**
 * 文章类别模型
 */
"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    var Tag = sequelize.define('Tag', {
        // 主键
        id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},

        // 标题
        name : {type : Sequelize.STRING, unique : true, allowNull : false}
    },{
        freezeTableName : true,
        classMethods: {
            associate: (models) => {
                Tag.hasMany(models.Article);
            }
        }
    });
    Tag.sync();
    return Tag;
};