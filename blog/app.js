const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

//用于处理 post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }

      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  //设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  //解析query
  req.query = querystring.parse(req.url.split('?')[1])

  //解析cookie
  req.cookie = {}
  let cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(element => {
    if (!element) {
      return
    }
    let itemArr = element.split('=')
    req.cookie[itemArr[0].trim()] = itemArr[1].trim()
  });

  //处理post data
  getPostData(req).then(postData => {
    req.body = postData

    //处理blog路由
    // const blogData = handleBlogRouter(req, res)
    // if (blogData) {
    //   res.end(JSON.stringify(blogData))
    //   return
    // }
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData))
      })
      return
    }
  
    //处理user路由
    const userData = handleUserRouter(req, res)
    if (userData) {
      userData.then(userData => {
        res.end(JSON.stringify(userData))
      })
      return
    }
  
    // 未命中路由，返回404
    res.writeHead(404, {"Content-type": "text/plain"})
    res.write("404 Not Found\n")
    res.end()
  })
}

module.exports = serverHandle
