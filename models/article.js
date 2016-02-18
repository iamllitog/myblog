/**
 * 文章模型
 */
"use strict";
const Sequelize = require("sequelize");
module.exports = (sequelize,DataTypes) => {
    var Article = sequelize.define("Article", {
        // 主键
        id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},

        // 标题
        title : {type : Sequelize.STRING, unique : true, allowNull : false},

        // 文本内容
        content : {type : Sequelize.TEXT, allowNull : false},

        // 写这篇博客时间
        birthDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW , allowNull : false},

        // 编辑这篇博客时间
        editDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW , allowNull : false},
    },{
        classMethods: {
            associate: (models) => {
                Article.hasMany(models.Comment);
            }
        }
    });

    return Article;
};