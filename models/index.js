"use strict";

const fs        = require("fs");
const path      = require("path");
const Sequelize = require("sequelize");
const dbOption  = require('../config').dataOption;
const sequelize = new Sequelize(dbOption.dbName, dbOption.userName, dbOption.password, dbOption.mySql);
const db        = {};

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach((file) => {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//初始化数据库
db.initDB = () => {
    return db.sequelize.sync().then(() => {
        return db.Master.count();
    }).then((count) => {
        if(count === 0){
            //无：添加默认管理员
            defaultAdmin.password = crypto.createHash('md5').update(defaultAdmin.password).digest('hex');
            return db.Master.create(defaultAdmin);
        }
        return true;
    }).then(() => {
        return db.Tag.find({
            where : {
                name : 'other'
            }
        });
    }).then((tag) => {
        if(!tag)
            db.Tag.create({name : 'other'});
        return true;
    });
};


module.exports = db;