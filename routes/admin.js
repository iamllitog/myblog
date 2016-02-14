/**
 * Created by litong on 15-12-30.
 */
'use strict';

const router = require('koa-router');
const models  = require('../models');

const adminRoute = router();
const apiRoute = router();

//管理员路由
adminRoute.get('/',function *(){
    var tags = yield models.Tag.findAll();
    console.log(tags);
    yield this.render('admin');
});

//api路由
apiRoute.get('/tag',function *(){
    var tags = yield models.Tag.findAll();
    console.log(tags);

});

adminRoute.use('/api',apiRoute.routes());

module.exports = adminRoute;