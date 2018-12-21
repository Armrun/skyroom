
// 博客文章数据处理函数的对象封装

var blogFilePath = 'db/blogArticle.json'
var fs = require('fs')
const loadBlogs = function() {
    // 确保文件有内容, 这里就不用处理文件不存在或者内容错误的情况了
    var content = fs.readFileSync(blogFilePath, 'utf8')
    var blogs = JSON.parse(content)
    return blogs
}

const ModelBlog = function(form) {
    // a = b || c 意思是如果 b 是 undefined 或者 null 就把 c 赋值给 a
    this.title = form.title || ''
    this.author = form.author || ''
    this.content = form.content || ''
    // 生成一个 unix 时间
    this.created_time = Math.floor(new Date() / 1000)
}

var blog = {
	data: loadBlogs()
}

blog.new = function(form) {
    var m = new ModelBlog(form)
    // console.log('new blog', form, m)
    // 设置新数据的 id
    var d = this.data[this.data.length-1]
    if (d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    // 把 数据 加入 this.data 数组
    this.data.push(m)
    // 把 最新数据 保存到文件中
    this.save()
    // 返回新建的数据
    return m
}

blog.save = function() {
    var s = JSON.stringify(this.data)
    fs.writeFile(blogFilePath, s, (err) => {
      if (err) {
          console.log(err)
      } else {
          console.log('保存成功')
      }
    })
}

module.exports = blog