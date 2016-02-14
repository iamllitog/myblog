/**
 * 主人模型
 */
"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    var Master = sequelize.define('Master', {
        // 主键
        id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},

        // 主人名
        name : {type : Sequelize.STRING, unique : true, allowNull : false},

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