const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // error 堆栈调用信息
    // error 简化 清晰明了的信息  给前端
    // HTTP Status Code 2xx, 4xx, 5xx
    ctx.body = '服务器有点问题，你等一下。';
    // message
    // error_code 详细， 开发者自己定义  10001 20003

    // 已知型错误  param  int ‘abc’ Lin ， 已知 
    // 处理错误， 明确
    // try  catch  处理错误 明确

    // 未知型错误  程序潜在的错误 
  }
}

module.exports = catchError