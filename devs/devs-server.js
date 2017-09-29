require('./check-versions')()
var yg = require('./yg')

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

console.log(config)

var opn = require('opn')
var express = require('express')
var app = express()
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.conf')
yg(webpackConfig)

