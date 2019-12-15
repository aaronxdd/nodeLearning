const { exec } = require('../db/mysql')
const { escape } = require('mysql')
const xss = require('xss')
const {getMD5} = require('../../utils/md5')

const login = (username, password) => {
  username = getMD5(username)
  password = getMD5(password)
  username = xss(escape(username))
  password = xss(escape(password))
  let sql = 'select username, realname from users where username = ${username} and password = ${password}'
  return exec(sql)
}

module.exports = {
  login
}