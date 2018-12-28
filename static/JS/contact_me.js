
// 发表博客页面

var e = function(selector) {
    return document.querySelector(selector)
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
            if(newBlog != -1) {
                alert('博文发表成功！')
            } else {
                alert('请输入正确的口令')
            }
        }
    }
    ajax(request)
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
            keyword: e('#id-input-incantation').value
        }
        // 用这个数据调用 blogNew 来创建一篇新博客
        blogNew(form)       
    })   
}

var __main = function() {
    bindEvents()
}

__main()