const { login } = require('../controller/user')
const { SuccessModel, ErroeModel } = require('../model/resModel')
const { set } = require('../db/redis')


const handleUserRouter = (req, res) => {
  const method = req.method
  const path = req.url.split('?')[0]

  //登录
  if (method === 'GET' && path === '/api/user/login') {
    // const { username, password } = req.body
    const { username, password } = req.query
    return login(username, password).then(userData => {
      if (userData.length > 0 && userData[0].username) {
        //设置session
        req.session.username = userData[0].username
        req.session.realname = userData[0].realname

        set(req.sessionId, req.session)

        return new SuccessModel('登录成功')
      } else {
        return new ErroeModel('登录失败')
      }
    })
  }

  //登录验证
  if (method === 'GET' && path === '/api/user/login-test') {
    if (req.session && req.session.username) {
      return Promise.resolve(req.session, new SuccessModel('登录验证成功'))
    } else {
      return Promise.resolve(new ErroeModel('登录验证失败'))
    }
  }
}

module.exports = handleUserRouter