function test() {
  console.log('hello world!')
}

test();

// 后端： 读写数据库   API
// 写出好的代码
// 提高开发效率

// koa
// 洋葱圈模型 精简 KOA 二次开发 太难用了 
// 定制化能力强 



// 异步编程
async function func2() {
  try{
    await func3()
  } catch (error) {
    console.log(error)
  }
}

// Promise async await
// KOA 库  Promise axios Promise Sequelize

// 全局异常处理 
function func3() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      const r = Math.random()
      if(r<0.5) {
        reject('error')
      }
    },500)
  })
}

func2();
