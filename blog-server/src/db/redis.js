const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

let redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', function (err) {
  console.log('Error ' + err);
});

const set = (key, val) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

const get = (key) => {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
      } else {
        try {
          resolve(JSON.parse(val))
        }catch {
          resolve(val)
        }
      }
    })
  })
  return promise
}


module.exports = {
  set,
  get
}