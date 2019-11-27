const { login } = require('../controller/user')
const { SuccessModel, ErroeModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  const path = req.url.split('?')[0]

  //登录
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body
    return login(username, password).then(userData => {
      if (userData.length > 0 && userData[0].username) {
        return new SuccessModel('登录成功')
      } else {
        return new ErroeModel('登录失败')
      }
    })
  }
}

module.exports = handleUserRouter