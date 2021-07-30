require("../css/login.less");

// 登录页面要求
/* 首先获取输入框的值，发送ajax请求，
请求失败，则提示失败，请求成功，则跳转home页面，
并且将该用户信息上传到localStorage */


// 获取标签
let tel = document.querySelector("#user-Tel");
let pwd = document.querySelector("#user-pwd");
let loginBtn = document.querySelector("#login-btn");
let msg = document.querySelector(".msg-text")
let jumpBtn = document.querySelector(".jump-text")



// 点击注册跳转页面
jumpBtn.addEventListener("click", function () {
    console.log(123);
    location.href = "./register.html"
})


// 点击登录
loginBtn.addEventListener("click", function () {
    msg.textContent = "";
    // 在电话和密码都输入的情况下
    if (tel.value && pwd.value) {
        // 验证手机号是否符合规范
        let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
        if (!reg.test(tel.value)) {
            msg.textContent = "!!!手机号有误";
            return;
        }

        // 登录账号
        // 发送ajax请求
        let data = {
            account: tel.value,
            password: pwd.value
        }

        $http.post("/users/login", data, function (res) {
            console.log(res);
            if (res.status == 0) {
                msg.textContent = "登录成功，1s后跳转home页面";
                // 将数据上传到localStorage
                console.log(res.data);
                localStorage.setItem("data", JSON.stringify(res.data))
                setTimeout(function () {
                    location.href = './home.html'
                }, 1000)
            } else {
                msg.textContent = "账号或密码错误，请确认之后重新输入";
            }
        })

    }
})


