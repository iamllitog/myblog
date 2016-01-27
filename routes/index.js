/**
 * Created by litong on 15-12-30.
 */
'use strict';

const router = require('koa-router');

const indexRoute = router();
const articleRoute = require('./article');
const errorHandle = require('./errorHandle');

//首页路由
indexRoute.redirect('/','article');
indexRoute.redirect('/index','article');

indexRoute.use('/article',articleRoute.routes());
/**
 * 设置路由
 * @param app
 */
module.exports = (app) => {
    app.use(indexRoute.routes());
    errorHandle(app);
};