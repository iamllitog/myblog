/**
 * Created by litong on 15-12-28.
 */
'use strict';

const http = require('http');

const app = require('../app');
const config = require('../config');
const models = require('../models');

models.initDB().then(() => {
    http.createServer(app.callback()).listen(config.port);
});
