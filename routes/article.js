/**
 * Created by litong on 15-12-30.
 */
'use strict';

const router = require('koa-router');

const articleRoute = router();

//文章路由
articleRoute.get('/',function *(){
    yield this.render('index');
});
articleRoute.get('/:label',function *(){
    yield this.render('index');
});
articleRoute.get('/:label/:id',function *(){
    yield this.render('article');
});

module.exports = articleRoute;