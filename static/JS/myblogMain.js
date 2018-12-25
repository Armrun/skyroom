
//主页博客内容请求程序

var blogTemplate = function(blog) {
    var id = blog.id
    var title = blog.title
    var author = blog.author
    var content = blog.content
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    // <div class="blog-cell">
    //     <div class="">
    //         <a class="blog-title" href="#" data-id="${id}">
    //             ${title}
    //         </a>
    //     </div>
    //     <div class="">
    //         <span>${author}</span> @ <time>${time}</time>
    //     </div>
    //     <div class="blog-comments" data-id="${id}">
    //         <div class='new-comment'>
    //             <input class='comment-blog-id' type=hidden value="${id}">
    //             <input class='comment-author' value="">
    //             <input class='comment-content' value="">
    //             <button class='comment-add'>添加评论</button>
    //             <button class='comment-all'>查看所有评论</button>
    //         </div>
    //     </div>
    // </div>
    var t = `
    <div class="post-preview">
            <a href="javascript:void(0)">
              <h2 class="post-title readmore" data-id="${id}">
                ${title}
              </h2>
              <h3 class="post-subtitle">
                ${content}
              </h3>
            </a>
            <p class="post-meta">Posted by ${author} on <time>${time}</time></p>
            <hr>
          </div>
    `
    return t
}

var log = function() {
    console.log.apply(console, arguments)
}

const insertBlogAll = function(blogs) {
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        var t = blogTemplate(b)
        // 把数据写入 .gua-blogs 中
	    var div = document.querySelector('#id-div-blogMain')
	    div.insertAdjacentHTML('beforeend', t)
    }
   // bindCommentEvents()    
}

const ajax = function(request) {
    var r = new XMLHttpRequest()

    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }

    r.onreadystatechange = function(event) {
        if(r.readyState === 4) {
            console.log('ajax返回函数')
            request.callback(r.response)
        }
    }
    if (request.method === 'get') {
        r.send()
    } else {
        // console.log('ajax中的form', request.data)
        r.send(request.data)
    }
}

const loadBlog = function() {
	var request = {
		method: 'get',
		url: '/api/blog/all',
		contentType: 'application/json',
		data: '',
		callback: function(response) {
			console.log('主页响应 :', response)
			var blogs = JSON.parse(response)
            console.log('格式化blogall', blogs)
			insertBlogAll(blogs)
		}
	}
	ajax(request)
}

var blogNew = function(form) {
    // console.log('传输的表单', JSON.stringify(form))
    var request = {
        method: 'post',
        url: '/api/blog/add',
        contentType: 'application/json',
        data: JSON.stringify(form),
        callback: function(response) {
            var k = []
            console.log('主页响应,博文添加 :', response)
            var newBlog = JSON.parse(response)
            // console.log('格式化newblog', k)
            // console.log('格式化newblog', newBlog)
            if(newBlog != -1) {
                k.push(newBlog)
                insertBlogAll(k)
            }
        }
    }
    ajax(request)
}


var e = function(selector) {
    return document.querySelector(selector)
}
var bindEvents = function() {
    // 绑定发表新博客事件
    var button = e('#id-button-submit')
    button.addEventListener('click', function(event){
        console.log('click new')
        // 得到用户填写的数据
        var form = {
            title: e('#id-input-title').value,
            author: e('#id-input-author').value,
            content: e('#id-input-content').value,
            keyword: e('#id-input-keyword').value
        }
        // 用这个数据调用 blogNew 来创建一篇新博客
        blogNew(form)

        
    })
     
}

var bindCommentEvents = function() {
    // 绑定获取评论事件
    var buttonAdd = document.querySelector('#id-div-blogMain')
        buttonAdd.addEventListener('click', function(event){
            // cosole.log('click看所有评论')
            //添加评论的点击事件函数
        if (event.target.classList.contains('comment-add')) {
            var blogId = event.target.closest('.blog-comments').dataset.id
            console.log('点击了添加评论按钮, 评论的所属id是:', blogId)
            var p = event.target.parentElement
            var form = {
                author: p.querySelector('.comment-author').value,
                content: p.querySelector('.comment-content').value,
                blogId: blogId
            }
            console.log('将要评论提交的表单', form)
            // 评论提交的 AJAX 的数据
            request = {
                method: 'post',
                url: '/api/comment/add',
                contentType: 'application/json',
                data: JSON.stringify(form),
                callback: function(response) {
                    console.log('评论添加一条 :', response)
                    // 此 API 可返回刚刚添加的一条评论的数据
                   
                    }
            }
            ajax(request)
            //查看所有评论的点击事件函数 
        } else if (event.target.classList.contains('comment-all')) {
            var blogId = event.target.closest('.blog-comments').dataset.id
            data = {
                blogId: blogId
            }
            console.log('click看所有评论的父id', blogId)
            request = {
                method: 'post',
                url: '/api/comment/all',
                contentType: 'application/json',
                data: JSON.stringify(data),
                callback: function(response) {
                    console.log('评论响应 :', response)
                    // var blogs = JSON.parse(response)
                    // insertBlogAll(blogs)
                    // bindCommentEvents()
                    }
                }
            console.log('评论的id的 data类型', request.data)
            ajax(request)
        }
    })

}

var main = function() {
    loadBlog()
    bindEvents()
    bindCommentEvents()
    
}
    // 绑定查看文章更多链接
    var readmore = document.querySelector('#id-div-blogMain')
    readmore.addEventListener('click', function(event){
        var e = event.target
        if (e.classList.contains('readmore')) {
            log('*********cakangenduo id:', e.dataset.id)


        }
    })
    // <div class="post-preview">
    //         <a href="javascript:void(0)">
    //           <h2 class="post-title readmore" data-id="${id}">
    //             ${title}
    //           </h2>
    //           <h3 class="post-subtitle">
    //             ${content}
    //           </h3>
    //         </a>
    //         <p class="post-meta">Posted by ${author} on <time>${time}</time></p>
    //         <hr>
    //       </div>


main()

