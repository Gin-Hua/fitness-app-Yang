require("../css/courseDesc.less");

document.ready(function () {
    // 获取标签
    let imgDom = document.querySelector(".videoBox>img");
    let imgTitle = document.querySelector(".desc-title>.title");
    let calVal = document.querySelector(".cal-num");
    let minVal = document.querySelector(".min-num");
    let peopleVal = document.querySelector(".people-num");
    let descVal = document.querySelector(".desc-text");
    let userName = document.querySelector(".userName>.name");
    let userDesc = document.querySelector(".userName>.desc");
    let userImg = document.querySelector(".userImg>img");
    let backBtn = document.querySelector(".back")
    let playBtn = document.querySelector(".icon-bofang");
    let startBtn = document.querySelector(".start-btn")

    let baseUrl = "http://139.9.177.51:8099";
    let user = JSON.parse(localStorage.getItem("user"))
    // console.log(user);
    // 先拿到id值
    let obj = utils.strGetObj(location.search);

    // 点击播放按钮进行播放
    playBtn.addEventListener("click", function () {
        console.log(1111111111111111);
        location.href = "./player.html"
    })

    // 点击返回按钮进行返回
    backBtn.addEventListener("click", function () {
        location.href = "./sports.html"
    })

    // 发送课程训练详情请求，渲染页面
    $http.get('/sports/courseDetail', { id: obj.id }, function (res) {
        let info = res.data;
        console.log(res);
        console.log(info);
        imgDom.src = baseUrl + info.imgurl;
        imgTitle.textContent = info.name;
        calVal.textContent = info.calorie;
        minVal.textContent = info.time;
        peopleVal.textContent = `${info.peoplenum}人练过`
        descVal.textContent = info.desc;

        console.log(111111111111111111111111111111111);
        console.log(res.data.fragments);
        // 将课程列表存入本地存储
        localStorage.setItem("courseList", JSON.stringify(res.data.fragments))
    });

    // 获取本地userId, 发生请求, 渲染页面姓名和介绍
    $http.get("/users/accountinfo", { userId: user.userId }, function (res) {
        console.log(res);
        userName.textContent = res.data.nickname;
        userDesc.textContent = res.data.sign;
        userImg.textContent = res.data.imgurl;
    })
    startBtn.addEventListener("click", function () {
        location.href = "./player.html"
    })

})