require("../css/home.less");
console.log("home");
console.log(Swiper);

document.ready(function () {
    if (!localStorage.getItem("user")) {
        location.href = "./login.html"
    }

    // 获取标签
    let rankValDom = document.querySelector(".rank-num")
    let taskValDom = document.querySelector(".taskVal")
    let badgeValDom = document.querySelector(".badge-num")

    let taskBtn = document.querySelector(".task-btn");

    // 调用公用底部组件，渲染页面
    utils.createFooter("home")

    // 使用swiper
    var mySwiper = new Swiper('.swiper-container', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        // autoplay: true,//等同于以下设置
        autoplay: {
            delay: 1000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
        },


        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
    })





    // 获取数据来进行页面渲染

    // 获取本地存储的数据
    // console.log(localStorage.getItem("user"));
    let user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);

    function getDate() {
        $http.get("/headPageInfo", { userId: user.userId }, function (res) {
            // 请求成功
            if (res.status == 0) {
                // 拿到数据,渲染页面
                console.log(res);
                rankValDom.textContent = res.data.rank;
                taskValDom.textContent = res.data.punchIn;
                badgeValDom.textContent = res.data.insigniaNum;
                // 判断是否打卡，打开就替换文本
                console.log(res);
                if (res.data.isPunch == "true") {
                    taskBtn.textContent = "今日已打卡"
                } else {
                    taskBtn.textContent = "今日打卡"
                }
            }
        })
    }
    getDate()

    // 点击打卡事件
    taskBtn.addEventListener("click", function () {
        $http.get('/clockIn', { userId: user.userId }, function (res) {
            if (res.status == 0) {
                getDate()
            }
        })
    })



















})