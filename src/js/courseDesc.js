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

    let baseUrl = "http://139.9.177.51:8099";
    let user = JSON.parse(localStorage.getItem("user"))
    console.log(user);
    // 先拿到id值
    let obj = utils.strGetObj(location.search);

    // 发送课程训练详情请求，渲染页面
    $http.get('/sports/courseDetail', { id: obj.id }, function (res) {
        console.log(res);
        let data = res.data;
        console.log(data);
        imgDom.src = baseUrl + data.imgurl;
        imgTitle.textContent = data.name;
        calVal.textContent = data.calorie;
        minVal.textContent = data.time;
        peopleVal.textContent = `${data.peoplenum}人练过`
        descVal.textContent = data.desc;
    });

    // 获取本地userId, 发生请求, 渲染页面姓名和介绍
    $http.get("/users/accountinfo", { userId: user.userId }, function (res) {
        console.log(res);
        userName.textContent = res.data.nickname;
        userDesc.textContent = res.data.sign;
        userImg.textContent = res.data.imgurl;
    })

})