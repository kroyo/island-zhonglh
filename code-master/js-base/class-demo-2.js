// 父类
class People {
  constructor(name) {
    this.name = name
  }
  eat() {
    console.log(`${this.name} eat something`)
  }
}

// 子类
class Student extends People {
  constructor(name, number) {
    super(name);
    this.number = number;
  }
  sayHi() {
    console.log(`姓名 ${this.name} 学号 ${this.number}`)
  }
}

// 子类
class Teacher extends People {
  constructor(name, major) {
    super(name);
    this.major = major;
  }
  teach() {
    console.log(`${this.name} 教授 ${this.major}`)
  }
}


// 实例
const xialuo = new Student('夏洛', 100)
console.log(xialuo.name)    // 夏洛
console.log(xialuo.number)  // 100
xialuo.sayHi()              // 姓名 夏洛 学号 100
xialuo.eat()                // 夏洛 eat something

// 实例
const wanglaoshi = new Teacher('王老师', '语文')
console.log(wanglaoshi.name)   // 王老师
console.log(wanglaoshi.major)  // 语文
wanglaoshi.teach()             // 王老师 教授 语文
wanglaoshi.eat()               // 王老师 eat something


// class 实际上是函数，可见是语法糖
typeof People  // function
typeof Student // function

console.log( xialuo.__proto__ )
console.log( Student.prototype )
console.log( xialuo.__proto__ === Student.prototype )

