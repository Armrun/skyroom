
// 博客评论数据处理函数的对象封装

var commentFilePath = 'db/comment.json'
var fs = require('fs')
const loadBlogs = function() {
    // 确保文件有内容, 这里就不用处理文件不存在或者内容错误的情况了
    var content = fs.readFileSync(commentFilePath, 'utf8')
    var comment = JSON.parse(content)
    return comment
}

const ModelComment = function(form) {
    this.author = form.author || 'Anonym'
    this.content = form.content || ''
    this.blogId = form.blogId || ''
    this.created_time = Math.floor(new Date() / 1000)
}

var comment = {
	data: loadBlogs()
}

comment.new = function(form) {
	console.log('comment对象的new方法被执行', form)
    var m = new ModelComment(form)
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

comment.save = function() {
    var s = JSON.stringify(this.data)
    fs.writeFile(commentFilePath, s, (err) => {
      if (err) {
          console.log(err)
      } else {
          console.log('保存成功')
      }
    })
}

module.exports = comment
