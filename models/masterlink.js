/**
 * 连接名模型
 */
const Sequelize = require('sequelize');

module.exports = (sequelize,MasterModel) => {
    return sequelize.define('MasterLink', {
        // 主键
        id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},

        // 标题
        name : {type : Sequelize.STRING, unique : true, allowNull : false},

        // 连接
        link : {type : Sequelize.STRING, unique : true, allowNull : false},

        //主人外键
        master_id: {
            type: Sequelize.INTEGER,
            allowNull : false,
            references: {
                model: MasterModel,
                key: 'id'
            }
        }

    });
};