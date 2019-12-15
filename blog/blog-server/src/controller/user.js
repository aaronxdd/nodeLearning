const { exec } = require('../db/mysql')
const { escape } = require('mysql')
const xss = require('xss')

const login = (username, password) => {
  username = xss(escape(username))
  password = xss(escape(password))
  let sql = 'select username, realname from users where username = ${username} and password = ${password}'
  return exec(sql)
}

module.exports = {
  login
}