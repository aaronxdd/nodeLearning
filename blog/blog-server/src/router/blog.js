const {
  getList, 
  getDetail, 
  newBlog, 
  updateBlog,
  deletcBlog
} = require('../controller/blog')
const { SuccessModel, ErroeModel } = require('../model/resModel')

const loginCheck = (req) => {
  if(req.session && req.session.username) {
    return true
  }
  return false
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const path = req.url.split('?')[0]
  const id = req.query.id

  //获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    let keywords = req.query.keywords || ''
    let author = req.query.author || ''
    // const data = getList(keywords, author)
    // return new SuccessModel(data)

    if (req.query.isadmin) {
      const loginCheckResult = loginCheck(req)
      if (!loginCheckResult) {
        return new ErroeModel('未登录')
      }
      author = req.session.username
    }

    return getList(keywords, author).then(listData => {
      return new SuccessModel(listData)
    })
  }

  //获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    if (id) {
      return getDetail(id).then(blogData => {
        return new SuccessModel(blogData[0])
      })
    } else {
      console.log('请输入正确id')
    }
  }

  //新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const loginCheckResult = loginCheck(req)
    if (!loginCheckResult){
      return new ErroeModel('未登录')
    }
    req.body.author = req.session.username
    return newBlog(req.body).then(newData => {
      return new SuccessModel(newData.insertId)
    })
  }

  //更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req)
    if (!loginCheckResult){
      return new ErroeModel('未登录')
    }
    return updateBlog(id, req.body).then(data => {
      if (data.affectedRows > 0) {
        return new SuccessModel('更新成功')
      } else {
        return new ErroeModel('更新失败')
      }
    })
  }

  //删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req)
    if (!loginCheckResult){
      return new ErroeModel('未登录')
    }
    let author = req.session.username
    return deletcBlog(id, author).then(data => {
      if (data.affectedRows > 0) {
        return new SuccessModel('删除成功')
      } else {
        return new ErroeModel('删除失败')
      }
    })
  }
}

module.exports = handleBlogRouter