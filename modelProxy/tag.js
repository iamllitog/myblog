/**
 * 文章类别模型
 */
"use strict";
const models  = require('../models');

module.exports = {
    name : 'Tag',

    /**
     * 得到所有tags
     */
    getAllTags : function *(){
        return yield models.Tag.findAll();
    },

    /**
     * 创建tag
     * @param name  tag名
     * @returns {*}
     */
    createTagByName : function *(name){
        return yield models.Tag.create({name:name});
    },

    /**
     * 更新tag
     * @param id  tag对应id
     * @param name  新tag名
     * @returns {*}
     */
    updateTagById : function *(id,name){
        return yield models.Tag.update({name:name},{
            where : {
                id : id
            }
        });
    },

    /**
     * 删除Tag
     * @param id  tag对应id
     * @returns {*}
     */
    delTagById : function *(id){
        return yield models.Tag.destroy({
            where : {
                id : id
            }
        });
    }
}
;