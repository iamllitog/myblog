/**
 * Created by litong on 15-12-29.
 */
'use strict';
/**
 * 应用配置文件--开发环境
 */
const develop = {
    //监听端口
    port : 8090,
    //cookie密钥
    cookieKeys : ['why i am ','a array?'],
    //静态资源缓存时间
    staticRSOption :
    {
        maxage : 24*60*60*1000
    },
    //redis 配置
    redisOption : {
        host : process.env.REDIS_PORT_6379_TCP_ADDR?process.env.REDIS_PORT_6379_TCP_ADDR: '127.0.0.1',
        port : process.env.REDIS_PORT_6379_TCP_PORT?process.env.REDIS_PORT_6379_TCP_PORT: 6379
    },
    //session 配置
    sessionOption : {
        cookie : {
            maxAge:1000 * 60 * 60   //设置过期时间--1小时
        }
    },
    //数据配置
    dataOption : {
        dbName : 'myBlog',
        userName : 'root',
        password : '',
        mySql : {
            host : '127.0.0.1',
            port : '3306',
            dialect : 'mysql'
        }
    }
};

module.exports = develop;