
// 引入 express 并创建一个实例 express

var expressExample = require('express')
var app = expressExample()

// 引入 body-parser HTTP请求体解析中间件, 用于解析JSON
var bodyParser = require('body-parser')
app.use(bodyParser.json())

// 配置静态文件目录
app.use(expressExample.static('static'))

const sendHeml = function(path, response) {
	var fs = require('fs')
	// var options = {
	// 	encoding: 'utf-8'
	// }
	var indexHtml = fs.readFileSync(path, 'utf-8')
	response.send(indexHtml)
}

app.get('/', function(request, response){
	var path = 'template/index.html'
	sendHeml(path, response)
})

// 获取博客的路由监听
const routeBlog = require('./model/blogs')
app.get('/api/blog/all', function(request, response){
	var blogs = routeBlog.data
	var responseBlog = JSON.stringify(blogs)
	response.send(responseBlog)
})

app.post('/api/blog/add', function(request, response){
	// console.log('newblog数据类型', request.body)
	var newblog = -1
	if(request.body['keyword'] == '123') {
		console.log('密码正确')
		newblog = routeBlog.new(request.body)
	}
	r = JSON.stringify(newblog)
	response.send(r)
})

// 评论的路由监听
const routeComment = require('./model/comment')
app.post('/api/comment/all', function(request, response){
	console.log('评论请求数据类型', request.body.blogId) 
	var cId = request.body.blogId
	var commsent = routeComment.data
	// console.log('评论all', comment) 
	var matchComment = []
	for (var i = 0; i < comment.length; i++) {
		// console.log('comment的bolgid', comment[i]['blog_id'], typeof(comment[i]['blog_id']))
		// console.log('****评论匹配成功', comment[i]['blog_id'] == comment)
		if (comment[i]['blogId'] == cId) {
			console.log('****评论匹配成功')
			matchComment.push(comment[i])
		}
 	}
	r = JSON.stringify(matchComment)
	response.send(r)
})

app.post('/api/comment/add', function(request, response){
	console.log('评论添加请求', request.body) 
	var form = request.body
	// var cId = request.body.blogId
	// var comment = routeComment.data
	// console.log('comment的bolgid', comment[i]['blog_id'], typeof(comment[i]['blog_id']))
	// console.log('****评论匹配成功')
	newComment = routeComment.new(form)
	r = JSON.stringify(newComment)
	response.send(r)
})

// listen 函数用于监听端口
var server = app.listen(9191, function (){
	// 获得监听的信息 
	var host = server.address().address
	var port = server.address().port
	console.log("SKyroom正在运行, 访问地址", host)
})
