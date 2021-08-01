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
    let msg = document.querySelector(".msg-text");
    let jumpBtn = document.querySelector(".jump-text");

    // 点击跳转登录
    jumpBtn.addEventListener("click", function () {
        console.log(123);
        location.href = "./login.html"
    })

    // 注册监听事件
    register.addEventListener("click", function () {
        msg.textContent = ""
        // 输入框都有值的
        if (tel.value && codeNum.value && pwd.value && againPwd.value) {
            // 验证手机号
            let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
            if (!reg.test(tel.value)) {
                utils.createToast("icon-cuowu", "手机号有误");
                // msg.textContent = "!!!手机号有误";
                return;
            }
            // 验证验证码
            if (codeNum.value.toLowerCase() != code.toLowerCase()) {
                utils.createToast("icon-cuowu", "验证码有误");
                // msg.textContent = "!!!验证码有误";
                return;
            }

            // 确认两次密码是否一样
            if (pwd.value != againPwd.value) {
                utils.createToast("icon-cuowu", "两次密码不一样");
                // msg.textContent = "!!!两次密码不一样";
                return;
            }

            // 注册账号
            // 做ajax请求
            let data = { account: tel.value, password: pwd.value }
            // 注册账号请求
            $http.post('/users/add', data, function (res) {
                console.log(res);
                //如果res.status ===0 注册成功 提醒跳转登录页
                if (res.status == 0) {
                    // 调用utils
                    console.log(utils);
                    utils.createToast('icon-xuanze-', '注册成功');

                    // 请求登录接口
                    $http.post("/users/login", data, function (res1) {
                        if (res1.status == 0) {
                            // 调用utils组件方法
                            // utils.createToast("icon-xuanze-", "登陆成功");
                            // 将数据上传到localStorage
                            // console.log(res.data);
                            localStorage.setItem("user", JSON.stringify(res1.data.user))
                            setTimeout(function () {
                                location.href = './home.html'
                            }, 1000)
                        }
                    })
                } else {
                    utils.createToast("icon-cuowu", "注册失败");
                }
            })









        }















    })



})