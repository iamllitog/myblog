/**
 * Created by litong on 15-12-30.
 */
'use strict';

const router = require('koa-router');
const models  = require('../models');
const crypto = require('crypto');
const _ = require('lodash');

const adminRoute = router();
const apiRoute = router();

//管理员界面路由
adminRoute.get('/',function *(){
    if(this.session.isMaster)
        yield this.render('admin');
    else
        this.redirect('/admin/login');
});

//管理员登录界面路由
adminRoute.get('/login',function *(){
    yield this.render('adminLogin',{info : ''});
});
//管理员登录路由
adminRoute.post('/login',function *(){
    try{
        let params = this.request.body;
        let username = params.username;
        let password = params.password;

        if(typeof username === 'undefined' || username === null || username.trim() === ''){
            throw new Error('缺少用户名');
        }

        if(typeof password === 'undefined' || password === null || password.trim() === ''){
            throw new Error('缺少密码');
        }

        var master = yield models.Master.find({
            where : {
                username : username,
                password : crypto.createHash('md5').update(password).digest('hex')
            }
        });
        if(!master){
            throw new Error('没有此用户，请重试');
        }
        this.session.isMaster = true;
        this.redirect('/admin');
    }catch(e){
        yield this.render('adminLogin',{info : e});
    }

});

//api路由

//响应信息模板
const resData = {
    error : false,
    data : {},
    msg : 'success'
};

//api过滤器
apiRoute.all('*',function *(next){
    console.log('api过滤了');
    if(this.session.isMaster){
        this.status = 200;
        yield next;
    }
    else{
        this.status = 403;
        resData.error =true;
        resData.data =null;
        resData.msg ='请先登录';
        this.body = resData;
    }


});

//得到tag
apiRoute.get('/tag',function *(){
    try{
        var tags = yield models.Tag.findAll();
        resData.data = tags;
    }catch(e){
        this.status = 500;
        resData.error = true;
        resData.msg = e.message;
    }
    this.body = resData;
});

//添加tag
apiRoute.post('/tag',function *(){
    try{
        let name = this.request.body.name;
        if(_.isEmpty(name)){
            throw new Error('缺少参数name');
        }
        yield models.Tag.create({name:name});
    }catch(e){
        this.status = 500;
        resData.error = true;
        resData.msg = e.message;
    }
    this.body = resData;
});

//更新tag
apiRoute.put('/tag/:id',function *(){
    try{
        let id = this.params.id;
        let name = this.request.body.name;
        if(_.isEmpty(name)){
            throw new Error('缺少参数name');
        }
        if(_.isEmpty(id)){
            throw new Error('缺少参数id');
        }
        yield models.Tag.update({name:name},{
            where : {
                id : id
            }
        });
    }catch(e){
        this.status = 500;
        resData.error = true;
        resData.msg = e.message;
    }
    this.body = resData;
});

//删除tag
apiRoute.del('/tag/:id',function *(){
    try{
        let id = this.params.id;
        if(_.isEmpty(id)){
            throw new Error('缺少参数id');
        }
        yield models.Tag.destroy({
            where : {
                id : id
            }
        });
    }catch(e){
        this.status = 500;
        resData.error = true;
        resData.msg = e.message;
    }
    this.body = resData;
});

adminRoute.use('/api',apiRoute.routes());

module.exports = adminRoute;