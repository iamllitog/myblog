/**
 * 文章模型代理
 */
"use strict";
const models  = require('../models');

module.exports = {
    name : 'Article',

    /**
     * 移动一个tag中的文章到other tag中
     * @param oldTagId  老tagid
     * @returns {*}
     */
    moveTagArticleToOtherTagByTagId : function *(oldTagId){
        return yield models.Article.update({TagId:oldTagId},{
            where : {
                name : 'other'
            }
        });
    },

}
;