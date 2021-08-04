require("../css/sports.less");
document.ready(function () {
    // 调用公用底部组件，渲染页面
    utils.createFooter("sports")

    // 获取
    let user = JSON.parse(localStorage.getItem("user"));
    let baseUrl = "http://139.9.177.51:8099"

    // 发送请求，获取最新课程
    $http.get("/sports/courseList", { id: user.userId }, function (res) {
        console.log(res);
        console.log(res.data);
        let courseList = res.data;
        let newImg = res.data.find(function (item, index) {
            return item.latest = 1;
        })
        console.log(newImg.imgurl);
        let newHtml = `
        <a href="./courseDesc.html?id=${newImg.courseId}">
            <div class="newCourse">
                <p class="newCourse-title">最新课程</p>
                <div class="newCourse-explain">
                    <img src="${baseUrl + newImg.imgurl}" class=" explain-img">
                    <div class="explain-title">
                        <p class="title-name">${newImg.name}</p>
                        <p class="title-explain">${newImg.desc}</p>
                    </div>
                </div>
            </div>
        </a>
        `
        document.querySelector(".new").innerHTML = newHtml;
        console.log(courseList);
        let html = ""
        courseList.forEach(function (item, index) {
            html += `
                <a href="./courseDesc.html?id=${item.courseId}">
                    <div class="other-explain mt20">
                        <img src="${baseUrl + item.imgurl}" alt="">
                        <p class="title-name">${item.name}</p>
                        <p class="title-explain">${item.desc}</p>
                    </div>
                </a>
            `
        })
        console.log(html);
        document.querySelector(".other-course").innerHTML = html;
    })

})
