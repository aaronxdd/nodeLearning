const getList = (keywords, author) => {
  return [
    {
      id: 1,
      title: '博客1',
      content: '这是博客1的内容',
      author: '张三',
      createTime: 1574662498286
    },
    {
      id: 2,
      title: '博客2',
      content: '这是博客2的内容',
      author: '李四',
      createTime: 1574662575054
    },
    {
      id: 3,
      title: '博客3',
      content: '这是博客3的内容',
      author: '王五',
      createTime: 1574662583599
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '博客1',
    content: '这是博客1的内容',
    author: '张三',
    createTime: 1574662498286
  }
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