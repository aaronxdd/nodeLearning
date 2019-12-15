const { exec } = require('../db/mysql')
const xss = require('xss')

const getList = (keywords, author) => {
  let sql = 'select * from blogs where 1=1 '
  if (keywords) {
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

const newBlog = (blogData) => {
  if (blogData) {
    let { title, content, author } = blogData
    title = xss(title)
    content = xss(content)
    let createTime = Date.now()
    let sql = `insert into blogs (title, content, createTime, author ) values('${title}', '${content}', ${createTime}, '${author}')`
    return exec(sql)
  }
}

const updateBlog = (id, blogData) => {
  if (blogData) {
    const { title, content } = blogData
    title = xss(title)
    content = xss(content)
    let sql = `update blogs set title = '${title}', content = '${content}' where id = ${id}`
    return exec(sql)
  }
}

const deletcBlog = (id, author) => {
  let sql = `delete from blogs where id = ${id} and author = '${author}'`
  return exec(sql)
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deletcBlog
}