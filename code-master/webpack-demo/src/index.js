console.log('this is index.js')

import { fn, name } from './fn'

console.log(fn())
console.log(name)

// const sum = (a, b) => {
//   return a + b;
// }
// const res = sum(10, 20);
// console.log(res)

// // class
// class People {
//   constructor(name) {
//       this.name = name
//   }
//   sayHi() {
//       console.log(`${this.name} say hi`)
//   }
// }
// const zhangsan = new People('张三')
// console.log(zhangsan.sayHi())