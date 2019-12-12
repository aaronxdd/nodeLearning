const { exec } = require('../db/mysql')
const { escape } = require('mysql')

const login = (username, password) => {
  username = escape(username)
  password = escape(password)
  let sql = 'select username, realname from users where username = ${username} and password = ${password}'
  return exec(sql)
}

module.exports = {
  login
}