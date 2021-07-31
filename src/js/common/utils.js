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


// 挂载

window.utils = utils;