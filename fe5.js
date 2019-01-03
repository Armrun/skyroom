// 2016/09/25
//
// ============
// 作业 5
// string 的花式操作函数
//
// 用到的知识主要是
// 0, 用下标引用字符串
// 1, 字符串切片
// 2, 循环
// 3, 选择 (也就是 if)
//
// 注意, 提示在文件最末尾
// ============
//
// 请以之前上课中 string 相关的内容作为参考
//
// 请直接在我的代码中更改/添加, 不要新建别的文件


// 定义我们的 log 函数
var log = function() {
    console.log.apply(console, arguments)
}
var ensure = function(condition, message) {
    // 在条件不成立的时候, 输出 message
    if(!condition) {
        log('*** 测试失败:', message)
    }
}

// ======
// 测试
// 本次作业起, 我们开始使用自动测试的方法来验证结果
// ======
//
// 定义我们用于测试的函数
// ensure 接受两个参数
// condition 是 bool, 如果为 false, 则输出 message
// 否则, 不做任何处理
var ensure = function(condition, message) {
    // 在条件不成立的时候, 输出 message
    if(!condition) {
        log('*** 测试失败:', message)
    }
}

// 例子
// 测试的使用
//
// 注意看, 我们使用了上文定义的 ensure 来进行测试
var log = function() {
    console.log.apply(console, arguments)
}
var ensure = function(condition, message) {
    // 在条件不成立的时候, 输出 message
    if(!condition) {
        log('*** 测试失败:', message)
    }
}
var test_sample = function(){
    // ensure 函数接受两个参数
    // 第一个是一个 bool 值, 如果为 True 则不会有任何反应
    // 否则会打印第二个参数
    ensure(1 === 1, '如果测试失败, 这句话会被打印出来')
    ensure(1 > 2, '测试 1 > 2 失败')
}
test_sample()
// 调用上面的 test_sample 可以得到如下输出
// *** 测试失败: 测试 1 > 2 失败


// ======
// 资料
// ======
//
// String 函数可以把数字转成字符串
// 例如 String(1) 就能得到 '1'
// 注意, String 是大写开头的函数, 不要弄错大小写
//


// 作业 1
// 10 分钟做不出就看提示
//

    /*
    n 是 int 类型
    width 是 int 类型

    把 n 的位数变成 width 这么长，并在右对齐，不足部分用 0 补足并返回
    具体请看测试, 注意, 返回的是 string 类型

    返回 string 类型
    */
    var _01fun = function(n, width) {
        var x = ''
        var n_str = String(n)
        var len = width - n_str.length
        for(var i = 0; i < len; i++) {
            x += '0'
        }
        var thing = x + n_str
        return thing
    }


// 测试函数

// 调用测试函数



// 作业 2
// 10 分钟做不出就看提示
//
// 注意, 这是一个新的知识点, 叫 默认参数
// fillchar 这个参数如果你不提供, 它的值默认就是 ' '
// 语法就是这样

    /*
    s 是 string
    width 是 int
    fillchar 是 长度为 1 的字符串, 默认为空格 ' '

    如果 s 长度小于 width, 则在末尾用 fillchar 填充并返回
    否则, 原样返回, 不做额外处理

    返回 string 类型
    */
    var _02fun = function(s, width, fillchar=' ') {
        if(s.length < width) {
            var len = width - s.length
            for(var i = 0; i < len; i++) {
                s += fillchar
            }
            return s
        } else {
            return s
        }
    }



// 测试函数



// 作业 3
// 10 分钟做不出就看提示
//

    /*
    s 是 string
    width 是 int
    fillchar 是 长度为 1 的字符串, 默认为空格 ' '

    如果 s 长度小于 width, 则在开头用 fillchar 填充并返回

    返回 string 类型
    */
    var _03fun = function(s, width, fillchar=' ') {
        if(s.length < width) {
            var x = ''
            var len = width - s.length
            for(var i = 0; i < len; i++) {
                x += fillchar
            }
            return x + s
        } else {
            return s
        }
    } 


// 测试函数





// 作业 4
// 10 分钟做不出就看提示
//

    /*
    s 是 string
    width 是 int
    fillchar 是 长度为 1 的字符串, 默认为空格 ' '

    如果 s 长度小于 width, 则在两边用 fillchar 填充并返回
    如果 s.length 和 width 互为奇偶, 则无法平均分配两边的 fillchar
    这种情况下, 让左边的 fillchar 数量小于右边

    返回 string 类型
    */
    var _04fun = function(s, width, fillchar=' ') {
        if(s.length < width) {
            var l = s.length
            len = width - l
            if((len % 2) == 0) {
                var x = len / 2
                s = _02fun(s, l + x, fillchar)
                s = _03fun(s, s.length + x, fillchar)
            } else {
                var y = (len - 1) / 2
                s = _02fun(s, l + y + 1, fillchar)
                s = _03fun(s, s.length + y, fillchar)
            }
            return s
        }
    return s
    }


// 测试函数


// 作业 5
// 10 分钟做不出就看提示
// 注意, 看上面的资料, 介绍了一个 includes 函数
//

    /*
    s 是 string
    检查 s 中是否只包含空格

    返回 bool, 如果 s 中包含的只有空格则返回 true, 否则返回 false
    */
    var _05fun = function(s) {
        var b = false 
        for(var i = 0; i < s.length; i++) {
            b = s[i].includes(" ")
            if(!s[i].includes(" ")) {
                return b
            }
        }
        return b
    }    


// 测试函数


// 作业 6
// 10 分钟做不出就看提示
//

    /*
    s 是字符串
    检查 s 中是否只包含数字
    返回: bool, 如果 s 中包含的只有数字则返回 true, 否则返回 false
    */
    var _06fun = function(s) {
        for(var i = 0; i < s.length; i++) {
            for(var j = 0; j < 10; j++) {
                    var bj = s[i].includes(String(j))
                    if(bj) {
                        break
                    }
                }
                if(!bj) {
                    return bj
                }
            }
        return true
    }


// 测试函数


// 作业 7
// 10 分钟做不出就看提示
//

    /*
    s 是 string
    返回一个「删除了字符串开始的所有空格」的字符串

    返回 string
    */
    //0666600
    //0123456

    var count_ = function(s) {
        var count = 0
        for(var i = 0; i < s.length; i++) {
            if(s[i] != ' ') {
                break
            } 
            count += 1         
        } 
        return count
    }

    var _07fun = function(s) {
        var x = count_(s)

        // var s_clear = ''
        // for(var i = x; i < s.length; i++) {
        //     s_clear += s[i]
        // }
        // return s_clear

        return s.slice(x)
    }


// 测试函数


// 作业 8
// 10 分钟做不出就看提示
//

    /*
    s 是 string
    返回一个「删除了字符串末尾的所有空格」的字符串

    返回 string
    */
    var count_2 = function(s) {
        var count = 0
        for(var i = (s.length-1); i >= 0; i--) {
            if(s[i] != ' ') {
                break
            } 
            count += 1         
        } 
        return count
    }

    var _08fun = function(s) {
        var x = count_2(s)
        var len = s.length - x + 1

        // var s_clear = ''
        // for(var i = 0; i < (s.length-x); i++) {
        //     s_clear += s[i]
        // }
        // return s_clear

        return s.slice(0, len)
    }

// 测试函数


// 作业 9
// 10 分钟做不出就看提示
//

    /*
    s 是 string
    返回一个「删除了字符串首尾的所有空格」的字符串

    返回 string
    */
    var _09fun = function(s) {
        s = _08fun(s)
        s = _07fun(s)
        // log(`${s}.`)
        return s
    }

// 测试函数


// 作业 10
// 10 分钟做不出就看提示
//

    /*
    3 个参数 s old new 都是字符串
    返回一个「将 s 中的 old 字符串替换为 new 字符串」的字符串
    假设 old 存在并且只出现一次

    返回 string
    */
    
    var is_old = function(s, old, i) {
        var len = old.length
        var x = s.slice(i, i + len)
        if(x == old) {
            return true
        } 
        return false
    }

    var _10fun = function(s, old, new1) {
        var news = ''
        for(var i = 0; i < s.length; i ++) {
            if(s[i] == old[0]) {
                if(is_old(s, old, i)){
                    news += new1
                    i = i + old.length
                }
            }
            news += s[i]
        }
        return news
    }


// 测试函数


/*
--------
提示
--------

zfill
1, 先把 n 转成 string 类型, 这样就可以求出长度
2, 有长度就可以和 width 参数比较, 看看需要补几个 0
3, 然后就可以得到一个包含几个 0 的字符串
4, 拼接两个字符串, 就得到了结果, 返回, 成功


ljust
1, 用 s 的长度和 width 算出需要填充的 fillchar 个数
2, 得到要填充的字符串
3, 拼接, 返回, 成功


rjust
同上


center
1, 算出两边要填充的个数
2, 得到两边的字符串
3, 拼接, 返回
*/
//第十题
// var replace = function (s, old, newstr) {
//     var lenS = s.length
//     var lenOld = old.length
//     var lenNewstr = newstr.length
//     var t = s.includes(old)
//     log(t)
//     if (t) {
//         for (var i = 0; i < s.length; i++) {
//             if (s[i] == old[0]) {
//                 num = i
//                 log("i",i)
//                 log("num1",num)
//                 break;
//             }
//         }
//         log("num2",num)
//         log("lenOld",lenOld)
//         return s.slice(0,num) + newstr + s.slice(num + lenOld)
//     } else {
//     return s
//     }
// }
// var log = function() {
//     console.log.apply(console, arguments)
// }
// var ensure = function(condition, message) {
//     // 在条件不成立的时候, 输出 message
//     if(!condition) {
//         log('*** 测试失败:', message)
//     }
// }
// var test_replace = function() {
//     ensure(replace('hello, world', 'world', 'gua') === 'hello, gua', 'replace 测试 1')
//     ensure(replace('hello', 'world', 'gua') === 'hello', 'replace 测试 2')
//     ensure(replace('hello', 'll', 'gua') === 'heguao', 'replace 测试 3')
// }
// test_replace()
