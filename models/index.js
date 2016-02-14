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

module.exports = db;