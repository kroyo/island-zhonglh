const bcrypt = require('bcryptjs')
const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../../core/db')


class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new global.errs.AuthFailed('账号不存在')
    }
    // user.password === plainPassword
    const correct = bcrypt.compareSync(
      plainPassword, user.password)
    if (!correct) {
      throw new global.errs.AuthFailed('密码不正确')
    }
    return user
  }

  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }

  static async registerByOpenid(openid) {
    return await User.create({
      openid
    })
  }
}

User.init({
  // 主键   关系数据库
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // 主键
    autoIncrement: true // 自动增长
  },
  nickname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: { 
    // 扩展 设计模式-观察者模式
    type: DataTypes.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10);
      const psw = bcrypt.hashSync(val, salt);
      // Model的setDataValue方法
      this.setDataValue('password', psw);
    }
  },
  openid: { // 微信小程序openid
    type: DataTypes.STRING(64),
    unique: true
  }
},{ 
  sequelize,
  modelName: 'user' 
  // tableName: 'user' 
})

module.exports = {
  User
}

// 数据迁移 SQL 更新 风险