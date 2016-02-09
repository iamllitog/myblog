/**
 * 评论模型
 */
const Sequelize = require('sequelize');

module.exports = (sequelize,ArticleModel) => {
    return sequelize.define('Comment', {
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

        //文章外键
        article_id: {
            type: Sequelize.INTEGER,
            allowNull : false,
            references: {
                model: ArticleModel,
                key: 'id'
            }
        }
    });
};