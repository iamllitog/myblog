/**
 * Created by litong on 16-2-24.
 * 工具方法
 */
const gm = require('gm').subClass({imageMagick:true});
module.exports = {
    /**
     * 截取图片
     * @param path  图片路径
     * @param x
     * @param y
     * @param w     宽
     * @param h     高
     * @returns {Promise}
     */
    cropImg : function (path,x,y,w,h){
        return new Promise((resolve,reject) => {
            gm(path).crop(w,h,x,y).write(path,(err) => {
                if(err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
};
