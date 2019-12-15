const crypto = require('crypto');

const SECRET_KEY = 'Aaron_xdd1'

const getMD5 = () => {
  let password = '123'
  const hash = crypto.createHash('md5')
  const str = `password=${password}&SECRET_KEY=${SECRET_KEY}`
  return hash.update(str).digest('hex')
}

getMD5()

module.exports = {
  getMD5
}