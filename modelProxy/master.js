/**
 * 文章类别模型
 */
"use strict";
const models  = require('../models');
const crypto = require('crypto');

module.exports = {
    name : 'Master',

    /**
     * 是否有此用户
     * @param username  用户名
     * @param password  密码
     * @returns {boolean}
     */
    hasMaster : function *(username,password){
        let master = yield models.Master.find({
            where : {
                username : username,
                password : crypto.createHash('md5').update(password).digest('hex')
            }
        });

        if(master){
            return true;
        }
        return false;
    }

};