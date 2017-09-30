var config = require('../config')
require('./check-versions')()

var yg = require('./yg')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.devs.env.NODE_ENV)
}

console.log(config)

var opn = require('opn')
var express = require('express')
var app = express()
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.conf')
yg(webpackConfig)

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.devs.port

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})


