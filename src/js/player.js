require("../css/player.less");
document.ready(function () {
    console.log(11);
    // 获取 DOM 
    let videoDom = document.querySelector('video');
    let numDom = document.querySelector(".num");
    let numAllDom = document.querySelector(".numAll");
    let titleDom = document.querySelector(".title")

    let lastBtn = document.querySelector("#last-one");
    let stopBtn = document.querySelector("#stop");
    let startBtn = document.querySelector("#start");

    let nextBtn = document.querySelector("#next-one")
    let progressBtn = document.querySelector(".progress-bar")

    let backBtn = document.querySelector("#backBtn")

    let videoIndex = 0;
    let videoList = JSON.parse(localStorage.getItem("courseList"))
    console.log(videoList);
    let baseUrl = "http://139.9.177.51:8099"

    function play(index) {
        // 修改video的src 
        videoDom.src = baseUrl + videoList[index].videoUrl;
        // 修改章节进度
        numDom.textContent = index + 1
        numAllDom.textContent = videoList.length;
        // 修改章节名字
        titleDom.textContent = videoList[index].title

    }
    play(videoIndex)

    // 注册监听事件，判断视频结束后，自动进行下一个视频
    videoDom.addEventListener("ended", function () {
        videoIndex++;
        if (videoIndex < videoList.length) {
            play(videoIndex);
        }
        // if (videoIndex >= videoList.length) {
        //     return
        // }
        // play(videoIndex);
    })

    // 点击上一个视频按钮
    lastBtn.addEventListener("click", function () {
        let temp = numDom.textContent - 2;
        if (temp >= 0) {
            play(temp);
        }
    })

    // 点击下一个视频按钮
    nextBtn.addEventListener("click", function () {
        let index = Number(numDom.textContent);
        if (index < videoList.length) {
            play(index)
        }
    })


    console.log(startBtn);
    startBtn.addEventListener("click", function () {
        console.log(1111);
        videoDom.play()
        startBtn.style.display = "none";
        stopBtn.style.display = "block";
    })
    stopBtn.addEventListener("click", function () {
        console.log(1111);
        startBtn.style.display = "block";
        stopBtn.style.display = "none";
        videoDom.pause()
    })
    console.log(backBtn);

    backBtn.addEventListener("click", function () {
        console.log(1111111111111);
        location.href = "./sports.html"
    })














    // 设置时间进度条
    // setInterval(function () {
    //     // 获取当前视频的总时长
    //     let allTime = videoDom.duration
    //     // 当前视频的时长
    //     let time = videoDom.currentTime;
    //     console.log(allTime);
    //     console.log(time);
    //     // 当前视频进度条的宽度
    //     length = parseInt(time / allTime * 100)
    //     progressBtn.style.width = length + "%"
    // }, 10)















    // 利用设置的全局变量  videoIndex   去设置 
    // 点击上一个视频按钮
    // lastBtn.addEventListener("click", function () {
    //     if (videoIndex - 1 >= 0) {
    //         videoIndex--
    //         play(videoIndex);
    //     }
    // })

    // 点击下一个视频按钮
    // nextBtn.addEventListener("click", function () {
    //     if (videoIndex + 1 < videoList.length) {
    //         videoIndex++
    //         play(videoIndex)
    //     }
    // })










})