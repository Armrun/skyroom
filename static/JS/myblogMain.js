
//主页博客内容请求程序

var log = function() {
    console.log.apply(console, arguments)
}

const e = function(selector) {
    return document.querySelector(selector)
}

const find = function(element, selector) {
    var e = element.querySelector(selector)
    return e
}

const blogTemplate = function(blog) {
    var id = blog.id
    var title = blog.title
    var author = blog.author
    var content = blog.content
    var d = new Date(blog.created_time * 1000)
    var y = d.getFullYear()
    var m = d.getMonth() + 1
    var d = d.getDate()
    var h = new Date(blog.created_time * 1000).getHours()
    var min = new Date(blog.created_time * 1000).getMinutes()
    var t = `
    <div class="post-preview">
            <a href="javascript:void(0)">
              <h2 class="post-title readmore" data-id="${id}">
                # ${title}
              </h2>
              <h3 class="post-subtitle hidden">
                ${content}
              </h3>
              <span class=" hidden">${author}</span>
            </a>
            <p class="post-meta"><time>${y}年${m}月${d}日 ${addZero(h)}:${addZero(min)}</time></p>
            <hr>
          </div>
    `
    return t
}

const insertBlogAll = function(blogs) {
    for (var i = blogs.length-1; i >= 0; i--) {
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
            // console.log('ajax返回函数')
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
			// console.log('主页响应 :', response)
			var blogs = JSON.parse(response)
            // console.log('格式化blogall', blogs)
			insertBlogAll(blogs)
		}
	}
	ajax(request)
}

const blogNew = function(form) {
    // console.log('传输的表单', JSON.stringify(form))
    var request = {
        method: 'post',
        url: '/api/blog/add',
        contentType: 'application/json',
        data: JSON.stringify(form),
        callback: function(response) {
            var k = []
            // console.log('主页响应,博文添加 :', response)
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

const readMoreinsert = function(allmore) {
    var t = `
    <header class="masthead" style="background-image: url('img/blog-bg.jpg')" data-id=${allmore.id}>
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <span class="subheading">${allmore.title}</span>
            </div>
          </div>
        </div>
      </div> 
    </header>

    <!-- Bloglist Begin -->
    <div class="bloglist">
      <div class="container">
            <div class="row">
              <div class="col-lg-8 col-md-10 mx-auto" id="id-div-blogMain">
                <div class="post-preview">
                    <h3 id="id-h2-blogmore">
                      ${allmore.content}
                    </h3>
                    <div id="id-div-inscribe">
                        <span>发表日期：${allmore.time}</span><br/>
                        <span>作者：${allmore.author}</span><br/>
                        <span>邮箱：arm91quan@163.com</span><br/>
                        <span>@ Skyroom-终身成长者的天空</span>
                    </div>
                </div>
                <hr>
              </div>
            </div>
        </div>
    </div>
    `
    return t
}

const addZero = function(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

const commentTemplent = function(response) {
    // <p class="post-meta">Posted by ${author} on <time>${time}</time></p>
    var d = new Date(response.created_time * 1000)
    var y = d.getFullYear()
    var m = d.getMonth() + 1
    var d = d.getDate()
    var h = new Date(response.created_time * 1000).getHours()
    var min = new Date(response.created_time * 1000).getMinutes()
    var t = `
        <div>
            <h5 class="comment-list">
              ${response.content}
            </h5>
          <p class="comment-list" id="comment-time">Commented by ${response.author} on <time>${y}年${m}月${d}日 ${addZero(h)}:${addZero(min)}</time></p>
        </div>
        <hr>
    `
    return t
}

const insertComment = function(response) {
    var c = document.querySelector('#id-div-commentcontainer')
    // log('test评论插入函数')
    for (var i = 0; i < response.length; i++) {
        var t = commentTemplent(response[i])
        c.insertAdjacentHTML('beforeend', t)
    }
}

const getComment = function(id) {
    data = {
        blogId: id
    }
    // console.log('click看所有评论的父id', id)
    request = {
        method: 'post',
        url: '/api/comment/all',
        contentType: 'application/json',
        data: JSON.stringify(data),
        callback: function(response) {
            var response = JSON.parse(response)
            // console.log('评论响应 :', response)
            insertComment(response)
            }
        }
    // console.log('评论的id的 data类型', request.data)
    ajax(request)
}

// 绑定查看文章更多链接

const bindReadmoreEvent = function() {
    var commentControl = document.querySelector('#id-div-commentcontrol')
    var readmoreClick = document.querySelector('#id-div-bloglist')
    readmoreClick.addEventListener('click', function(event){
        var e = event.target
        if (e.classList.contains('readmore')) {
            // log('*********cakangenduo id:', e.dataset.id)
            var readMore = document.querySelector('#id-div-blogmore')
            var readmoreAll = document.querySelector('.blogmore')
            readmoreClick.classList.add('hidden')
            readmoreAll.classList.remove('hidden')
            commentControl.classList.remove('hidden')
            var p = e.closest('.post-preview')
            // 提取数据
            var title = p.querySelector('h2').innerHTML
            var id = p.querySelector('h2').dataset.id
            var content = p.querySelector('h3').innerHTML
            var time = p.querySelector('p').innerHTML
            var author = p.querySelector('span').innerHTML

            var allmore = {
                title,
                content,
                time,
                author,
                id,
            }
            var t = readMoreinsert(allmore)
            readMore.insertAdjacentHTML('beforeend', t)
            // log('最近的魔板', allmore)
            getComment(e.dataset.id)
        }
    })
}

const commentControler = function() {
    var commentControl = document.querySelector('#id-div-commentcontrol')
    commentControl.addEventListener('click', function(event){
        var e = event.target
        if (e.classList.contains('blogmoreKiller')) {
            // log('######杀死评论', e)
            commentControl.classList.add('hidden')
            var bloglist = document.querySelector('#id-div-bloglist')
            var readmoreAll = document.querySelector('#id-div-blogmore')
            var comment = document.querySelector('#id-div-commentcontainer') 
            bloglist.classList.remove('hidden')
            readmoreAll.innerHTML = ''
            comment.innerHTML = ''
        } else if (e.classList.contains('comment-add')) {
            var p = event.target.closest('.blogmore')
            var blogThing = find(p, '.masthead')
            log('what is blogthing', blogThing)
            id = blogThing.dataset.id
            // log('~~~~~~作者~~~~~~', p.querySelector('#comment-author'))
            // log('点击了添加评论按钮, 评论的所属id是:', id)
            // var p = event.target.parentElement
            var form = {
                author: p.querySelector('.comment-author').value,
                content: p.querySelector('.comment-content').value,
                blogId: id
            }

            // console.log('将要评论提交的表单', form)
            // 评论提交的 AJAX 的数据
            if (form.author && form.content) {
                request = {
                    method: 'post',
                    url: '/api/comment/add',
                    contentType: 'application/json',
                    data: JSON.stringify(form),
                    callback: function(response) {
                        // 此 API 可返回刚刚添加的一条评论的数据
                        var r = []
                        r.push(JSON.parse(response))
                        // console.log('评论添加一条 :', response)
                        insertComment(r)
                    }
                }
                ajax(request)
                p.querySelector('.comment-author').value = ''
                p.querySelector('.comment-content').value = ''
                //查看所有评论的点击事件函数 
            } else {
                alert('请输入您的大名和评论~')
            }       
        } 
    })
}

var __main = function() {
    loadBlog() 
    bindReadmoreEvent()
    commentControler()  
}

__main()

