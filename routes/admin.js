/**
 * Created by litong on 15-12-30.
 */
'use strict';

const router = require('koa-router');
const modelProxy  = require('../modelProxy');
const _ = require('lodash');
const crypto =  require('crypto');
const fs = require('fs');
const path = require('path');
const del = require('del');
const gm = require('gm');
const config = require('../config');
const util = require('./util');

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


        let hasMaster = yield modelProxy.Master.hasMaster(username,password);

        if(!hasMaster){
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
class ResData {
    constructor (error,data,msg){
        this.error = error;
        this.data = data;
        this.msg = msg;
    }

    toJson () {
        return {
            error : this.error,
            data : this.data,
            msg : this.msg
        };
    }
}

//api过滤器
apiRoute.all('*',function *(next){
    console.log('api过滤了');
    if(this.session.isMaster){
        this.status = 200;
        yield next;
    }
    else{
        this.status = 403;
        this.body = new ResData(true,null,'请先登录').toJson();
    }

});

//得到tag
apiRoute.get('/tag',function *(){
    let resData = new ResData(false,null,'success');
    try{
        let tags = yield modelProxy.Tag.getAllTags();
        resData.data = tags;
    }catch(e){
        this.status = 500;
        resData.error = true;
        resData.msg = e.message;
    }
    this.body = resData.toJson();
});

//添加tag
apiRoute.post('/tag',function *(){
    let resData = new ResData(false,null,'success');
    try{
        let name = this.request.body.name;
        if(_.isEmpty(name)){
            throw new Error('缺少参数name');
        }
        yield modelProxy.Tag.createTagByName(name);
    }catch(e){
        this.status = 500;
        resData.error = true;
        resData.msg = e.message;
    }
    this.body = resData.toJson();
});

//更新tag
apiRoute.put('/tag/:id',function *(){
    let resData = new ResData(false,null,'success');
    try{
        let id = this.params.id;
        let name = this.request.body.name;
        if(_.isEmpty(name)){
            throw new Error('缺少参数name');
        }
        if(_.isEmpty(id)){
            throw new Error('缺少参数id');
        }
        yield modelProxy.Tag.updateTagById(id,name);
    }catch(e){
        this.status = 500;
        resData.error = true;
        resData.msg = e.message;
    }
    this.body = resData.toJson();
});

//删除tag
apiRoute.del('/tag/:id',function *(){
    let resData = new ResData(false,null,'success');
    try{
        let id = this.params.id;
        if(_.isEmpty(id)){
            throw new Error('缺少参数id');
        }

        //将要删除的类别的
        yield modelProxy.Article.moveTagArticleToOtherTagByTagId(id);
        yield modelProxy.Tag.delTagById(id);
    }catch(e){
        this.status = 500;
        resData.error = true;
        resData.msg = e.message;
    }
    this.body = resData.toJson();
});

//添加Article
apiRoute.post('/article',function *(){
    let resData = new ResData(false,null,'success');
    try{
        let tagId = this.request.body.tagId;
        let name = this.request.body.name;
        if(_.isEmpty(name)){
            throw new Error('缺少参数name');
        }
        yield modelProxy.Tag.createTagByName(name);
    }catch(e){
        this.status = 500;
        resData.error = true;
        resData.msg = e.message;
    }
    this.body = resData.toJson();
});


//上传原始图片
const originKoaBody = require('koa-body')({
    multipart : true,
    formidable:{
        uploadDir: path.join(config.articleResPath, 'tmp'),
        keepExtensions : true
    }
});
apiRoute.post('/originPic',originKoaBody,function *(){
    let resData = new ResData(false,null,'success');
    try{
        let file = this.request.body.files.qqfile;
        if(!file)
            throw new Error('缺少文件');
        if(file.type.indexOf('image') < 0){
            yield del(file.path);
            throw new Error('请上传图片文件');
        }

        resData.data = '/otherRes/tmp/'+file.path.substring(file.path.lastIndexOf('/'));
    }catch(e){
        this.status = 500;
        resData.error = true;
        resData.msg = e.message;
    }
    this.body = resData.toJson();
});
//截取原始图片
apiRoute.put('/originPic',function *(){
    let resData = new ResData(false,null,'success');
    try{
        let body = this.request.body;
        if(_.isEmpty(body.url)){
            throw new Error('缺少参数url');
        }
        if(_.isEmpty(body.x)){
            throw new Error('缺少参数x');
        }
        if(_.isEmpty(body.y)){
            throw new Error('缺少参数y');
        }
        if(_.isEmpty(body.w)){
            throw new Error('缺少参数w');
        }
        if(_.isEmpty(body.h)){
            throw new Error('缺少参数h');
        }

        let myPath = path.join(__dirname,'../frontend/static',body.url);
        yield util.cropImg(myPath,body.x,body.y,body.w,body.h);
    }catch(e){
        this.status = 500;
        resData.error = true;
        resData.msg = e.message;
    }
    this.body = resData.toJson();
});

adminRoute.use('/api',apiRoute.routes());

module.exports = adminRoute;