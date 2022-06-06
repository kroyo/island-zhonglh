## `island`(基于`Node.js Koa2`开发的微信小程序服务端)
------

#### 概述
  项目是基于`Node.js Koa2`开发微信小程序服务端，仅供自己学习使用。
  项目的大致流程是`Node.js Koa2`构建开发环境，分析需求，设计构思，规划目录结构，开始编程。

#### 技术栈
  - [x] `Node.js`
  - [x] `Koa2`
  - [x] `Sequelize`
  - [x] `requireDirectory`
  - [x] `Koa-router`
  - [x] `LinValidator`
  - [x] `LinCMS`: https://doc.cms.talelin.com/server/koa/
  - [x] `validator` : https://github.com/validatorjs/validator.js

#### 知识点
  - 深入JS异常处理与异步异常
  - 异步异常链与全局异常处理
  - 深入Koa中间件
  - Sequelize Scope应用
  - 理解Node.js在Web架构中的作用
  - Koa开发API
  - requireDirectory自动路由加载
  - LinValidator校验器
  - Koa开发微信小程序用户系统
  - 权限控制中间件
  - PM2部署Node.js应用
#### 笔记
  [项目里note.md](note.md)

#### 效果

#### 构建

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn build --report
```