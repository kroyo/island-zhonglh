const Router = require('koa-router')
const requireDirectory = require('require-directory') // 自动加载包

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app;
    InitManager.initLoadRouters();
    InitManager.loadHttpException();
    InitManager.loadConfig();
  }

  // 
  static loadConfig(path = '') {
    // process.cwd() 获取绝对路径
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }

  // 自动导入所有api接口
  static initLoadRouters() {
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })
    // 过滤获取到的api文件中方法，只将router注册到app中
    function whenLoadModule(obj) {
      if(obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  // 设置全局http请求提示
  static loadHttpException() {
    const errors = require('./http-exception');
    global.errs = errors
  }
}

module.exports = InitManager