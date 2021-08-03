/**
 * 工具函数
 */

// 封装组件
// 封装登录成和注册成功提示组件


const utils = {}
/* 
*@createToast 
*@name  string   类名
*@msg  string  提示信息
*/
utils.createToast = function (name, msg) {
    let body = document.querySelector("body");
    // 创建一个div标签，用来放提示框
    let toast = document.createElement("div");
    // 为toast盒子创建一个类名
    toast.className = "toast";
    // 定义里面的内容
    let html = `
    <i class="iconfont ${name}"></i>
    <p>${msg}</p>
    `
    // 将内容传给toast
    toast.innerHTML = html;

    // 将内容上传到body
    body.appendChild(toast);

    // 一秒之后，提示消失
    setTimeout(function () {
        toast.remove()
    }, 1000)
}



/* 
*@createFooter 
*@page  string   传入的页面
*/
utils.createFooter = function (page) {
    let footer = document.createElement("footer");
    footer.className = "dpflex";
    footer.id = "common-foot";
    let html = ` 
    <a href="./home.html">
        <div class="${page === "home" ? "item active" : "item"}" >
            <i class="commonicon iconfont icon-shouye"></i>
            <p>首页</p>
        </div >
    </a >
    <a href="./sports.html">
        <div class="${page === "sports" ? "item active" : "item"}"">
            <i class="commonicon iconfont icon-xindiantu"></i>
            <p>运动</p>
        </div>
    </a>
    <a href="./my.html">
        <div class="${page === "my" ? "item active" : "item"}"">
            <i class="commonicon iconfont icon-04"></i>
            <p>我的</p>
        </div>
    </a>
    `
    footer.innerHTML = html;
    document.body.appendChild(footer)
}


/* 
*@strGetObj 
*@str  string   传入的字符串
* return obj
*/
utils.strGetObj = function (str) {
    // 设置空对象
    let obj = {};
    // 截取第一个问号
    let getStr = str.substring(1);
    // 以&分割成数组
    let arr = getStr.split("&")
    // 遍历循环
    arr.forEach(function (item, index) {
        let newStr = item.split("=")
        console.log(newStr);
        // 拼接每一个对象
        obj[newStr[0]] = newStr[1];
    })
    return obj
}



// 挂载

window.utils = utils;