const env = progress.env.NODE_ENV

let MYSQL_CONF = {}

if(env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '201873',
    port: '3306',
    database: 'myblog'
  }
} else if(env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '201873',
    port: '3306',
    database: 'myblog'
  }
}

modules.exports = {
  MYSQL_CONF
}