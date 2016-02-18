/**
 * 评论模型
 */

"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    var Comment = sequelize.define("Comment", {
        // 主键
        id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},

        // 顺序
        order : {type : Sequelize.INTEGER, allowNull : false},

        // 评论人名
        name : {type : Sequelize.STRING, allowNull : false},

        // 评论邮箱
        email : {type : Sequelize.STRING, allowNull : false},

        // 文本内容
        content : {type : Sequelize.STRING, allowNull : false},

        // 写评论时间
        birthDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW , allowNull : false},
    },{
        classMethods: {
            associate: function(models) {
                Comment.belongsTo(models.Article);
            }
        }
    });


    return Comment;
};