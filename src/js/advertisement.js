require("../css/advertisement.less")
document.ready(function () {
    // 获取标签
    let timer = document.querySelector(".timer>span")
    let jumpBtn = document.querySelector(".btn");


    // 倒计时
    setInterval(function () {
        let num = Number(timer.textContent);
        num--;
        if (num === 0) {
            location.href = "./login.html";
        }
        else {
            timer.textContent = num;
        }

    }, 1000)

    // 点击跳转
    jumpBtn.addEventListener("click", function (event) {
        location.href = "./login.html";
    })
})