const { exec } = require('../db/mysql')

const getList = (keywords, author) => {
  let sql = 'select * from blogs where 1=1 '
  if (keywords){
    sql += `and title like '%${keywords}%' `
  }
  if (author) {
    sql += `and author = '${author}' `
  }
  sql += 'order by createtime DESC'

  return exec(sql)
}

const getDetail = (id) => {
  let sql = `select * from blogs where id = '${id}'`
  return exec(sql)
}

const newBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

const updateBlog = (id, blogData = {}) => {
  if (id === '0') {
    return false
  }
  return true
}

const deletcBlog = (id) => {
  if (id === '0') {
    return false
  } 
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deletcBlog
}