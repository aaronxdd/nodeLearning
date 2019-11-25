const {
  getList, 
  getDetail, 
  newBlog, 
  updateBlog,
  deletcBlog
} = require('../controller/blog')
const { SuccessModel, ErroeModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const path = req.url.split('?')[0]
  const id = req.query.id

  //获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const keywords = req.query.keywords || ''
    const author = req.query.author || ''
    const data = getList(keywords, author)
    return new SuccessModel(data)
  }

  //获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    if (id) {
      const data = getDetail(id)
      return new SuccessModel(data)
    }
  }

  //新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const data = newBlog(req.body)
    return new SuccessModel(data)
  }

  //更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    if (result) {
      return new SuccessModel('更新成功')
    } else {
      return new ErroeModel('更新失败')
    }
  }

  //删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    const result = deletcBlog(id)
    if (result) {
      return new SuccessModel('删除成功')
    } else {
      return new ErroeModel('删除失败')
    }
  }
}

module.exports = handleBlogRouter