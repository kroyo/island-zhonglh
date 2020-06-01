/**
 * 深拷贝
 * @param {Object}  obj 要拷贝的独享
 */

const obj1 = {
  age: 20,
  name: 'xxx',
  address: {
    city: 'beijing'
  },
  arr: ['a', 'b', 'c']
}

const obj2 = deepClone(obj1);
obj2.address.city = 'shanghai';
console.log(obj1.address.city)
 
function deepClone(obj = {}) {
  if(typeof obj != 'object' || obj == null) {
    // obj是null ， 或者不是对象和数据, 直接返回
    return obj
  }

  // 初始化结果
  let result;
  if(obj instanceof Array) {
    result = []
  }else {
    result = {}
  }

  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      // 保证 key 不是原型的属性
      result[key] = deepClone(obj[key])
    }
  }

  // 返回结果
  return result
}

