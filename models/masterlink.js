/**
 * 连接名模型
 */
"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    var MasterLink = sequelize.define('MasterLink', {
        // 主键
        id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},

        // 标题
        name : {type : Sequelize.STRING, unique : true, allowNull : false},

        // 连接
        link : {type : Sequelize.STRING, unique : true, allowNull : false}

    },{
        classMethods: {
            associate: function(models) {
                MasterLink.belongsTo(models.Master);
            }
        }
    });
    MasterLink.sync();
    return MasterLink;
};