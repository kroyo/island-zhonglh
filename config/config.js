module.exports = {
  // prod
  environment: 'dev',
  database: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'kroyoshi'
  },
  security: {
    secretKey: 'abcdefg',
    expiresIn: 60*60
  }
}