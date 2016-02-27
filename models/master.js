/**
 * 主人模型
 */
"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    var Master = sequelize.define('Master', {
        // 主键
        id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},

        // 昵称
        nikename : {type : Sequelize.STRING, allowNull : false},

        // 用户名
        username : {type : Sequelize.STRING, unique : true, allowNull : false},

        // 密码
        password : {type : Sequelize.STRING, allowNull : false},

        // 文本简介
        description : {type : Sequelize.STRING, allowNull : false}
    },{
        classMethods: {
            associate: function(models) {
                Master.hasMany(models.MasterLink);
            }
        }
    });

    return Master;
};