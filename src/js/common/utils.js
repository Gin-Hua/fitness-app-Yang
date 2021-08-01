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


// 挂载

window.utils = utils;