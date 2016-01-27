/**
 * Created by litong on 15-12-30.
 */
'use strict';

const router = require('koa-router');

const articleRoute = router();

//文章路由
articleRoute.get('/',function *(){
    console.log(this.path);
    yield this.render('index');
});
articleRoute.get('/:id',function *(){
    yield this.render('article');
});

module.exports = articleRoute;