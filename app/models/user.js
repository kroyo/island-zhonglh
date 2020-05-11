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
}

User.init({
  // 主键   关系数据库
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: { 
    type: DataTypes.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10);
      const psw = bcrypt.hashSync(val, salt);
      this.setDataValue('password', psw);
    }
  },
  openid: {
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