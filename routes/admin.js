/**
 * Created by litong on 15-12-30.
 */
'use strict';

const router = require('koa-router');

const adminRoute = router();

//管理员路由
adminRoute.get('/',function *(){
    yield this.render('admin');
});

module.exports = adminRoute;