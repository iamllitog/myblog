/**
 * Created by litong on 15-12-30.
 */
'use strict';

const router = require('koa-router');

const indexRoute = router();
const articleRoute = require('./article');
const adminRoute = require('./admin');
const errorHandle = require('./errorHandle');

//首页路由
indexRoute.redirect('/','/article');
indexRoute.redirect('/index','/article');

//文章路由
indexRoute.use('/article',articleRoute.routes());

//管理员路由
indexRoute.use('/admin',adminRoute.routes());
/**
 * 设置路由
 * @param app
 */
module.exports = (app) => {
    app.use(indexRoute.routes());
    errorHandle(app);
};