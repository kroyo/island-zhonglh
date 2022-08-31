require('module-alias/register')

const Koa = require('koa')
const parser = require('koa-bodyparser')
const path = require('path')
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
const static = require('koa-static')

require('./app/models/classic')

const app = new Koa()
app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname,'./static')))

// 初始化管理器
InitManager.initCore(app)

app.listen(3000)