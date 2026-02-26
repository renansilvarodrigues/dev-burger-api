const { resolve } = require('node:path');
const express = require('express');

const uploadPath = express.static(resolve(__dirname, '..', '..', 'uploads'));

const fileRouteConfig = express.static(uploadPath);

module.exports = fileRouteConfig;
