require("../css/register.less");

document.ready(function () {
    // 获取验证码
    let code = "";
    let captcha1 = new CaptchaMini();
    captcha1.draw(document.querySelector('#captcha1'), function (res) {
        code = res;
    });

    // 获取标签
    let tel = document.querySelector("#tel");
    let codeNum = document.querySelector("#codeNum");
    let pwd = document.querySelector("#pwd");
    let againPwd = document.querySelector("#againPwd");
    let register = document.querySelector("button");
    let msg = document.querySelector(".msg-text")

    // 注册监听事件
    register.addEventListener("click", function () {
        msg.textContent = ""
        // 输入框都有值的
        if (tel.value && codeNum.value && pwd.value && againPwd.value) {
            // 验证手机号
            let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
            if (!reg.test(tel.value)) {
                msg.textContent = "!!!手机号有误";
                return;
            }
            // 验证验证码
            if (codeNum.value.toLowerCase() != code.toLowerCase()) {
                msg.textContent = "!!!验证码有误";
                return;
            }

            // 确认两次密码是否一样
            if (pwd.value != againPwd.value) {
                msg.textContent = "!!!两次密码不一样";
                return;
            }

            // 做ajax请求
            let data = {
                account: tel.value,
                password: pwd.value
            }

            $http.post('/users/add', data, function (res) {
                console.log(res);
                //如果res.status ===0 注册成功 提醒跳转登录页
                if (res.status == 0) {
                    msg.textContent = '注册成功,2s后跳转登录页';
                    setTimeout(function () {
                        location.href = './login.html';
                    }, 2000)
                } else {
                    //res.status ===1  注册失败  res.msg 给用户显示
                    msg.textContent = res.msg;
                }
            })









        }















    })



})