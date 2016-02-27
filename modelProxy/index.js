"use strict";

const fs        = require("fs");
const path      = require("path");
const modelProxy= {};

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach((file) => {
        let model = require(path.join(__dirname, file));
        modelProxy[model.name] = model;
    });

console.log(modelProxy);

module.exports = modelProxy;