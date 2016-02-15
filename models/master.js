/**
 * 主人模型
 */
"use strict";
const Sequelize = require("sequelize");
const crypto = require('crypto');
const defaultAdmin = require("../config").administratorDefault;

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

    //1.生成表格
    Master.sync().then(() => {
        return Master.count();
    }).then((count) => {
        //2.判断有无管理员
        if(count === 0){
            //无：添加默认管理员
            defaultAdmin.password = crypto.createHash('md5').update(defaultAdmin.password).digest('hex');
            Master.create(defaultAdmin);
        }
    });

    return Master;
};