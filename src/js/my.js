require("../css/my.less")

document.ready(function () {
    // 调用公用底部组件，渲染页面
    utils.createFooter("my")

    const BaseUrl = 'http://139.9.177.51:8099';

    // 获取标签
    let userImgDom = document.querySelector(".user-img>img")
    let userNameDom = document.querySelector(".user-name")
    let userMsgDom = document.querySelector(".user-msg")

    let sportTimeDom = document.querySelector(".sport-time")
    let sportCalDom = document.querySelector(".sport-cal")

    let inpImg = document.querySelector(".inpImg")

    // 获取本地数据
    let user = JSON.parse(localStorage.getItem("user"))
    console.log(user);

    // 调用get请求，渲染个人信息的数据
    $http.get("/users/accountinfo", { userId: user.userId }, function (res) {
        // 请求成功，渲染页面
        if (res.status == 0) {
            // console.log(res);
            let data = res.data
            console.log(data);
            // 渲染名字
            userNameDom.textContent = data.nickname
            // 判断个性签名是否存在，存在就渲染，不存在就是默认值
            if (data.sign) {
                userMsgDom.textContent = data.sign;
            }
            // 图片
            if (data.imgurl) {
                console.log(123);
                console.log(data.imgUrl);
                userImgDom.src = data.imgurl
            }
        }
    })

    // 调用get请求，渲染个人运动的数据
    $http.get("/users/mysportsBadge", { userId: user.userId }, function (res) {
        // 请求成功，渲染页面
        if (res.status == 0) {
            console.log(res);
            let data = res.data.sports
            console.log(data);
            // 渲染事件
            sportTimeDom.textContent = data.times;
            sportCalDom.textContent = data.calorie;
        }
    })

    // 监听input框中值的改变，上传用户头像
    inpImg.addEventListener("change", function () {
        // 发送请求
        $updateFile('/users/upload', "imgurl", this.files[0], function (res) {
            console.log(res.data);
            // 拼接成网络上的地址
            let imgUrl = BaseUrl + res.data;
            // 改变图片的地址
            userImgDom.src = imgUrl;
            console.log(imgUrl);


            // 将图片地址上传到后台数据库
            $http.post("/users/userEdit", { imgurl: imgUrl, userId: user.userId }, function (res) {
                console.log(res);
                console.log("ok");
            })
        })
    })


    // 图片优化
    // 点击图片间接点击input 
    userImgDom.addEventListener("click", function () {
        // click就是模仿用户点击
        inpImg.click();
    })
})
