'use strict'
const express = require('express')
const app = express()

const wsExpress = require('express-ws')(app)
app.ws('/socket', function (ws, req, next) {
  // ws.on('mess            age', function (evt) {
  setInterval(() => ws.send(Math.random()), 1000)
  // })
})

module.exports = app
