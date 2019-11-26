const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

//创建连接数据库对象
const con = mysql.createConnection(MYSQL_CONF)

//开始连接
con.connect()

//统一执行sql的函数
const exec = (sql) => {
  const promise = new Promise((resolve, reject) => {
    console.log('sql---', sql)
    con.query(sql, (error, result) => {
      if (error){
        reject(error)
      } else {
        resolve(result)
      }
    })
  })

  return promise
}

module.exports = {
  exec
}